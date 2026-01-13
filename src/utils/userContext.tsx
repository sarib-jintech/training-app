import { createContext, useState } from 'react';

export const UserContext = createContext({
  userEmail: '',
  userAuthToken: '',
  setUserEmail: (email: string, token: string) => {},
});

export const UserProvider = ({ children }: { children: any }) => {
  const [userEmail, setEmail] = useState('');
  const [userAuthToken, setUserAuthToken] = useState('');

  const setUserEmail = (email: string, token: string) => {
    setEmail(email);
    setUserAuthToken(token);
  };

  return (
    <UserContext.Provider value={{ userEmail, userAuthToken, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};
