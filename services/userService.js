import AsyncStorage from '@react-native-async-storage/async-storage';

const userService = {
  apiUrl: 'http://172.22.141.245:3000/api/auth', // Cambiar por la IP de tu computadora OJO con el puerto

  login: async (username, password) => {
    try {
      const response = await fetch(`${userService.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }
    
      if (!data.token) {
        console.error('Respuesta del servidor:', data);
        throw new Error('No se recibió un token después del inicio de sesión');
      }
    
      await AsyncStorage.setItem('authToken', data.token);
      return data.token;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }    
  },
  
  
  

  register: async (username, password) => {
    try {
      console.log('Registrando usuario:', username);
      // Realiza la solicitud al servidor para registrar el usuario y guarda la respuesta
      const response = await fetch(`${userService.apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      // Aquí podrías usar un sistema de notificaciones o mensajes para mostrar que el registro fue exitoso
      return data;
    } catch (error) {
      throw new Error('Error al registrar');
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      throw new Error('Error al cerrar sesión');
    }
  },

  isLoggedIn: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return !!token;
    } catch (error) {
      throw new Error('Error al verificar el estado de inicio de sesión');
    }
  },
};

export default userService;
