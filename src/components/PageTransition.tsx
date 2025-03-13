
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Apply initial animation classes
    if (pageRef.current) {
      pageRef.current.classList.add('opacity-0');
      
      // Trigger animation after a small delay
      setTimeout(() => {
        if (pageRef.current) {
          pageRef.current.classList.remove('opacity-0');
          pageRef.current.classList.add('animate-fade-in');
        }
      }, 50);
    }
    
    // Make sure the page starts at the top
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div 
      ref={pageRef} 
      className="transition-opacity duration-500"
    >
      {children}
    </div>
  );
};

export default PageTransition;
