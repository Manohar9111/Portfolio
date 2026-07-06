import React from 'react';
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={`border border-gray-300 px-3 py-2 rounded-md bg-white text-black ${className || ''}`} {...props} />
  )
);
Textarea.displayName = "Textarea";
