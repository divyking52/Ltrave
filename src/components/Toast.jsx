import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Check, Info, AlertCircle } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce-subtle pointer-events-none">
      <div className="px-5 py-3 rounded-full bg-charcoal text-cream text-xs font-semibold shadow-soft-xl border border-white/20 flex items-center gap-2.5 backdrop-blur-md">
        {toast.type === 'success' && <Check className="w-4 h-4 text-mint-300" />}
        {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-blush-300" />}
        {toast.type === 'info' && <Sparkles className="w-4 h-4 text-paleyellow-300" />}
        {toast.type === 'default' && <Info className="w-4 h-4 text-lavender-300" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
