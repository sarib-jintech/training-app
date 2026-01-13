import { createContext, useState } from 'react';

type theme = {
  primary: String;
  secondary: String;
};
export const ThemeContext = createContext<theme>({
  primary: '',
  secondary: '',
});

export const ThemeProvider = ({ children }: { children: any }) => {
  return (
    <ThemeContext.Provider value={{ primary: '#ff4f24', secondary: '#094780' }}>
      {children}
    </ThemeContext.Provider>
  );
};
