import React, { createContext, ReactNode } from 'react';

// Define el tipo del contexto que esperas
interface InternalProviderProps {
  children: ReactNode;
  context: any; // Puedes reemplazar 'any' con un tipo más específico si es necesario
}

const Context = createContext({});

const InternalProvider: React.FC<InternalProviderProps> = ({ children, context }) => {
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default InternalProvider;
export { Context };
