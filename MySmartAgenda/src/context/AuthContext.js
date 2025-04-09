// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = (email, password) => {
    return new Promise((resolve, reject) => {
      // Aquí deberías agregar la lógica para guardar al usuario, por ejemplo:
      if (email && password) {
        setUser({ email });
        resolve();  // Si todo está bien, resuelves la promesa.
      } else {
        reject(new Error('Por favor, ingresa un correo y una contraseña válidos.'));
      }
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
