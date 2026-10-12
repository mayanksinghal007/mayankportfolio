import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const Toast = () => {
  const { toast } = useSite();

  if (!toast) return null;

  return (
    <div className="site-toast">
      {toast.type === 'error' ? (
        <AlertCircle size={20} color="#FF3D0A" />
      ) : toast.type === 'info' ? (
        <Info size={20} color="#FFB92E" />
      ) : (
        <CheckCircle2 size={20} color="#25D366" />
      )}
      <span>{toast.message}</span>
    </div>
  );
};
