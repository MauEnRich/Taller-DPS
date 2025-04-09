import { AsyncStorage } from 'react-native';

// Simula una base de datos local
const mockDatabase = [
  { email: 'test@example.com', password: '12345' },
];

export const loginService = (email, password) => {
  return new Promise((resolve, reject) => {
    const user = mockDatabase.find((u) => u.email === email && u.password === password);
    if (user) {
      resolve(user);
    } else {
      reject(new Error('Usuario o contraseña incorrectos'));
    }
  });
};

export const registerService = (email, password) => {
  return new Promise((resolve, reject) => {
    // Verifica si el email ya existe
    const userExists = mockDatabase.some((u) => u.email === email);
    if (userExists) {
      reject(new Error('El correo electrónico ya está registrado.'));
    } else {
      const newUser = { email, password };
      mockDatabase.push(newUser);
      resolve(newUser);
    }
  });
};
