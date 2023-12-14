import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";

export function RegisterView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Aquí deberías enviar los datos al backend para manejar el registro
    // Por ejemplo, puedes usar fetch o axios para hacer una solicitud HTTP.

    // Ejemplo con fetch:
    fetch("http://192.168.1.6:3000/api/movil/registrarse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del backend
        console.log("Registro exitoso:", data);
        // Puedes redirigir al usuario o hacer otras acciones aquí
      })
      .catch((error) => {
        console.error("Error en el registro:", error);
        console.log(email)
        console.log(password)
      });
  };

  return (
    <View style={styles.container}>
            <View style={styles.imageContainer}>
        <Image
          source={require('../imagenes/icons8-qr.gif')} 
          style={styles.animation}
        />
      </View>
      <Text style={styles.title}>Registro</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
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
