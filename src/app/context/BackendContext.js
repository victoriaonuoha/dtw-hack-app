"use client";

import { createContext, useContext, useState, useEffect } from "react";

const BackendContext = createContext();

export const BackendProvider = ({ children }) => {
  // Load backend data from localStorage on first render
  const [backendData, setBackendData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("backendData");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  // loading state
  const [loading, setLoading] = useState(false);

  // Whenever backendData changes, save it to localStorage
  useEffect(() => {
    if (backendData !== null) {
      localStorage.setItem("backendData", JSON.stringify(backendData));
    }
  }, [backendData]);

  // Function to clear existing data (when a new phone number is entered)
  const clearBackendData = () => {
    setBackendData(null);
    localStorage.removeItem("backendData");
  };

  return (
    <BackendContext.Provider
      value={{
        backendData,
        setBackendData,
        loading,
        setLoading,
        clearBackendData,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};

export const useBackend = () => useContext(BackendContext);
