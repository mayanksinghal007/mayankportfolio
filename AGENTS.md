# Antigravity Workspace Guidelines & Motion Graphics Playbook

## Motion Design & UI/UX Standards
All frontend features, interactive components, and animations in this project follow the **Awwwards-Tier Motion Design System**:

1. **Animation Stack**:
   - **Primary Engine**: GSAP 3 (GreenSock core, ScrollTrigger, Flip, MotionPath, Draggable).
   - **Smooth Scroll**: Lenis paired with GSAP ScrollTrigger for 60fps native feel.
   - **Component Animation**: Framer Motion for enter/exit states and route transitions.
   - **Micro-Interactions**: GSAP `quickTo()` for magnetic cursor and button tracking.
   - **3D / WebGL**: Three.js / OGL for generative particle networks and ambient mesh layers.
   - **Sliders**: Embla Carousel / Swiper for touch momentum snap.
   - **Forms**: React Hook Form + Zod for schema validation.

2. **Performance & Bundle Rules**:
   - Never load overlapping or redundant libraries.
   - Keep production bundle light and 60fps on mid-range devices (Lighthouse Performance $\ge 85$).
   - Respect `prefers-reduced-motion: reduce` unconditionally with fallback static styles.
   - Maintain 100% SSR pre-rendering compatibility (`prerender.js`) with `typeof window !== 'undefined'` guards.

3. **Design & Prototyping Workflow**:
   - Supports Figma Smart Animate, Rive state machines, After Effects + Bodymovin (Lottie JSON), and Principle / ProtoPie interaction specs.

