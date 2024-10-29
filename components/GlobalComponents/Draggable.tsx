"use client"
import { useState, useRef, useEffect } from 'react';

export const DraggableComponent = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const handleMouseDown = (e) => {
    // Prevent default dragging behavior
    e.preventDefault();
    
    const rect = elementRef.current.getBoundingClientRect();
    
    // Save the initial position where the drag started
    setOrigin({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Start dragging
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    // Calculate new position based on mouse movement relative to initial click position
    setTranslate({
      x: e.clientX - origin.x,
      y: e.clientY - origin.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={elementRef}
      className={`
        absolute cursor-grab touch-none
        ${isDragging ? 'cursor-grabbing' : ''}
      `}
      style={{
        transform: `translate(${translate.x}px, ${translate.y}px)`,
        // Add will-change to optimize performance
        willChange: isDragging ? 'transform' : 'auto'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        handleMouseDown({ 
          preventDefault: () => e.preventDefault(),
          clientX: touch.clientX,
          clientY: touch.clientY
        });
      }}
    >
      {children}
    </div>
  );
};