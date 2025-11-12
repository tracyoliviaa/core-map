import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

export const useApp = () => {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useApp muss innerhalb von AppProvider verwendet werden');
  }
  
  return context;
};