import { createContext, useContext, useState, useEffect } from "react";

const DopContext = createContext();

export const DopProvider = ({ children }) => {
  const [dopData, setDopData] = useState([]); // Ensure it's an array

  return (
    <DopContext.Provider value={{ dopData, setDopData }}>
      {children}
    </DopContext.Provider>
  );
};

export const useDop = () => useContext(DopContext);
