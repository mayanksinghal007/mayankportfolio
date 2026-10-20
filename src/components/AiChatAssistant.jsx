import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, MessageCircle, ArrowRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const AiChatAssistant = () => {
  const { site } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `👋 **Hi! I'm Mayank AI.**  
I'm Mayank Aggarwal's AI marketing assistant. Ask me anything about **Meta Ads strategies**, **AI video production (Runway/Kling)**, **pricing & retainers**, or ask me to generate custom **ad hooks** for your business!`,
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSend = async (userPrompt) => {
    const textToSend = (userPrompt || input).trim();
    if (!textToSend || loading) return;

    const newMessages = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          prompt: textToSend,
        }),
      });

      if (!res.ok) {
        throw new Error('Network error');
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || "I'm ready to assist you. Ask any question about Mayank's services or AI marketing strategies!" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Mayank specializes in **Performance Meta Ads** and **Generative AI Video Production**.  
You can connect with him directly on **WhatsApp: [+91 9217756033](https://wa.me/919217756033)** or email **contact.klikwise@gmail.com** for an instant marketing audit!`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    '💼 What are Mayank\'s retainers & pricing?',
    '🎯 Give me a 3-second ad hook formula',
    '🎬 How do you produce AI video ads?',
    '📲 How can I book an audit call?',
  ];

  return (
    <>
      {/* Floating AI Button (Positioned cleanly right above WhatsApp) */}
      <div
        className="floating-ai-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'fixed',
          bottom: '96px',
          right: '28px',
          zIndex: 990,
        }}
      >
        <div
          className={`floating-whatsapp-tooltip ${isHovered && !isOpen ? 'visible' : ''}`}
          role="tooltip"
          id="ai-tooltip"
        >
          <span>Ask Mayank AI</span>
          <span className="tooltip-sub">Vercel AI Gateway Live</span>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Open Mayank AI Marketing Assistant"
          aria-expanded={isOpen}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1A1A1A 0%, #2A1810 50%, #FF3D0A 100%)',
            border: '2px solid rgba(255, 61, 10, 0.4)',
            boxShadow: '0 8px 24px rgba(255, 61, 10, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease',
            color: '#FFFFFF',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {isOpen ? <X size={24} color="#FFFDF9" /> : <Sparkles size={24} color="#FF7A00" />}
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '10px',
              height: '10px',
              backgroundColor: '#10B981',
              borderRadius: '50%',
              border: '2px solid #111',
            }}
          />
        </button>
      </div>

      {/* Modern AI Chat Drawer / Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '164px',
            right: '28px',
            width: 'min(410px, calc(100vw - 36px))',
            height: 'min(560px, calc(100vh - 190px))',
            backgroundColor: '#141414',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 61, 10, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
            overflow: 'hidden',
            fontFamily: 'var(--font-sans, system-ui, sans-serif)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              background: 'linear-gradient(180deg, rgba(255, 61, 10, 0.12) 0%, rgba(20, 20, 20, 0.95) 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #FF3D0A 0%, #FF8A00 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Bot size={20} color="#FFF" />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#FFFDF9', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Mayank AI
                  <span
                    style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(255, 61, 10, 0.2)',
                      color: '#FF7A00',
                      border: '1px solid rgba(255, 61, 10, 0.3)',
                    }}
                  >
                    AI Gateway
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#888' }}>Ask marketing, AI videos, or hire Mayank</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Chat"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#888',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '6px',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                }}
              >
                {m.role === 'assistant' && (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 61, 10, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '4px',
                    }}
                  >
                    <Bot size={14} color="#FF7A00" />
                  </div>
                )}
                <div
                  style={{
                    backgroundColor: m.role === 'user' ? '#FF3D0A' : 'rgba(255, 255, 255, 0.06)',
                    color: m.role === 'user' ? '#FFFFFF' : '#E5E5E5',
                    padding: '10px 14px',
                    borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    wordBreak: 'break-word',
                    border: m.role === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div dangerouslySetInnerHTML={{
                    __html: m.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n\n/g, '<br/><br/>')
                      .replace(/\n/g, '<br/>')
                      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #FF8A00; text-decoration: underline;">$1</a>')
                  }} />
                </div>
                {m.role === 'user' && (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#333',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '4px',
                    }}
                  >
                    <User size={14} color="#FFF" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-start' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 61, 10, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Bot size={14} color="#FF7A00" />
                </div>
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    padding: '10px 14px',
                    borderRadius: '16px 16px 16px 4px',
                    fontSize: '12px',
                    color: '#888',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Thinking with Vercel AI Gateway</span>
                  <span className="dot-flashing" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts (shown on start) */}
          {messages.length <= 2 && (
            <div
              style={{
                padding: '0 12px 10px',
                display: 'flex',
                gap: '6px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
              }}
            >
              {quickPrompts.map((qp, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(qp.replace(/^[^\s]+\s/, ''))}
                  style={{
                    fontSize: '11px',
                    whiteSpace: 'nowrap',
                    padding: '6px 10px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#CCC',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FF3D0A';
                    e.currentTarget.style.color = '#FFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = '#CCC';
                  }}
                >
                  {qp}
                </button>
              ))}
            </div>
          )}

          {/* WhatsApp Quick CTA Bar */}
          <div
            style={{
              padding: '6px 14px',
              backgroundColor: 'rgba(37, 211, 102, 0.08)',
              borderTop: '1px solid rgba(37, 211, 102, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11px',
            }}
          >
            <span style={{ color: '#25D366', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MessageCircle size={13} /> Need instant quote?
            </span>
            <a
              href={`https://wa.me/${site.whatsapp || '919217756033'}?text=Hi%20Mayank,%20I%20chatted%20with%20your%20website%20AI%20and%20would%20like%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#25D366',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              WhatsApp Mayank <ArrowRight size={11} />
            </a>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: '12px 14px',
              backgroundColor: '#0F0F0F',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              gap: '8px',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Mayank AI anything..."
              style={{
                flex: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '8px 12px',
                fontSize: '13px',
                color: '#FFF',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send Message"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                backgroundColor: input.trim() ? '#FF3D0A' : '#262626',
                border: 'none',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'default',
                transition: 'background 0.2s ease',
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
