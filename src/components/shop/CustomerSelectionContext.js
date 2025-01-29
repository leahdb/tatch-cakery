import React, { createContext, useState } from 'react';

// Create context
export const CustomerSelectionContext = createContext();

// Context Provider component
export const CustomerSelectionProvider = ({ children }) => {
    const [customerSelection, setCustomerSelection] = useState({
        size: null,
        sponge: null,
        filling: null,
        decoration: null, 
        notes: "",        
        uploadedImage: null,
      });
      
  // This is where the state is updated, and logging happens
  const setSelectionWithLogging = (newSelection) => {
    console.log("Customer selection updated:", newSelection); // Log every change
    setCustomerSelection(newSelection);
  };

  return (
    <CustomerSelectionContext.Provider value={{ customerSelection, setCustomerSelection: setSelectionWithLogging }}>
      {children}
    </CustomerSelectionContext.Provider>
  );
};
