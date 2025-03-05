import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from React Router

const ScrollToTop = () => {
  const location = useLocation(); // Get the current location object

  useEffect(() => {
    // Scroll to top every time the route changes
    window.scrollTo(0, 0);
  }, [location]); // Trigger the effect whenever the location changes

  return null; 
};

export default ScrollToTop;
