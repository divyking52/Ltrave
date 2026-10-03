import React from 'react';

export default function BrandName({ 
  size = 'md', 
  theme = 'dark', // 'dark' for charcoal text on light bg, 'light' for cream text on dark bg
  showSubtitle = false,
  className = '' 
}) {
  const sizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-2xl sm:text-[26px]',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl lg:text-6xl',
  };

  const textColor = theme === 'light' ? 'text-cream' : 'text-charcoal';
  const subtitleColor = theme === 'light' ? 'text-cream/65' : 'text-charcoal/60';
  const apostropheColor = theme === 'light' ? 'text-blush-300' : 'text-[#E28A7A]';

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <span className={`font-brand font-medium tracking-tight ${sizeClasses[size] || sizeClasses.md} ${textColor} leading-none select-none`}>
        L<span className={`${apostropheColor} font-serif font-bold mx-[0.5px]`}>’</span>Trave
      </span>
      {showSubtitle && (
        <span className={`text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.28em] font-sans font-semibold ${subtitleColor} mt-1 select-none`}>
          Go Somewhere Beautiful
        </span>
      )}
    </div>
  );
}
