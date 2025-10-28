import { useState, createContext, useContext } from "react";

const DataContext = createContext();

const DataProvider = ({setAppAuth, setAdminAuth, children}) => {
  const [userHeaders, setUserHeaders] = useState('');
  const [userDetails, setUserDetails] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onLogin = (status) => {
    setAppAuth(status);
    setIsAuthenticated(status);
    if(userDetails['role'] === 'admin' || userDetails['role'] === 'moderator')
    {
      setAdminAuth(true)
    }
  };

  const onLogout = () => {
    setAdminAuth(false);
    setAppAuth(false);
    setIsAuthenticated(false);
  };

  const handleDetails = (data) => {
    const updatedDetails = {
      'id': data['id'],
      'email': data['email'],
      'username': data['username'],
      'profile_picture': data['profile_picture'],
      'role': data['role'],
      'deactivated': data['deactivated'],
      'deactivated_at': data['deactivated_at'],
      'moderator_status': data['moderator_status'],
      'mod_approval_date': data['mod_approval_date'],
      'created_at': data['created_at'],
      'updated_at': data['updated_at']
    }
    setUserDetails(updatedDetails);
  }

  const handleHeaders = (header) => {
    const updatedHeader = {
      'authorization' : header['authorization']
    }
    setUserHeaders(updatedHeader);
  }

  const resetHeadersDetails = () => {
    setUserHeaders('');
    setUserDetails('');
  }

  return (
    <DataContext.Provider value={
      {
        handleHeaders,
        handleDetails,
        resetHeadersDetails,
        userHeaders,
        userDetails,
        onLogin,
        onLogout,
        isAuthenticated
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