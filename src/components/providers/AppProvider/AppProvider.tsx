import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../../state/store';
import ThemeProvider from '../ThemeProvider/ThemeProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default AppProvider;
