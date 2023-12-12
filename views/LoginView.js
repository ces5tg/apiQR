import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import userService from '../services/userService';

const LoginView = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const token = await userService.login(username, password);
      if (token) {
        navigation.navigate('Scanned');
      } else {
        console.error('No se pudo obtener el token después del inicio de sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../imagenes/icons8-qr.gif')} 
          style={styles.animation}
        />
      </View>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          onChangeText={setUsername}
          value={username}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={handleNavigateToRegister}>
        <Text style={styles.registerText}>¿Aún no tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2B2D42",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  imageContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 20,
  },
  animation: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8D99AE",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  input: {
    backgroundColor: "#EDF2F4",
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#EF233C",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    color: "#8D99AE",
    fontSize: 16,
  },
});

export default LoginView;
