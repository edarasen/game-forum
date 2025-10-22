import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({children}) => {
  const [userHeaders, setUserHeaders] = useState('');

  const handleHeaders = (header) => {
    const updatedHeader = {
      'authorization' : header['authorization']
    }
    setUserHeaders(updatedHeader);
  }

  return (
    <DataContext.Provider value={
      {
        handleHeaders,
        userHeaders
      }
    }>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  return useContext(DataContext);
}

export default DataProvider;