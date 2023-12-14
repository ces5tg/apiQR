import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export function LoginView() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNavigateToScanned = () => {
    navigation.navigate("Scanned");
  };

  const handleNavigateToRegister = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async () => {
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "http://192.168.1.6:3000/api/movil/inicioSesion",
        data
      );
      console.log(response.data);
      if (response.data) {
        await AsyncStorage.setItem("token", response.data.token);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Error en la llamada al API:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../imagenes/icons8-qr.gif')} 
          style={styles.animation}
        />
      </View>
      <Text style={styles.title}>Registrarse o Iniciar Sesión</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FFD700" }]}
        onPress={handleNavigateToScanned}
      >
        <Text style={styles.buttonText}>Ir a la vista escaneada</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#2B2D42",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8D99AE",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
    width: "100%",
  },
  input: {
    backgroundColor: "#EDF2F4",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#EF233C",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
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
});

export default LoginView;
