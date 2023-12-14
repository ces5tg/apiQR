import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage para almacenar datos localmente

export function HomeView() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Obtén el token de AsyncStorage (puedes ajustar esto según cómo almacenas el token en tu aplicación)
      const token = await AsyncStorage.getItem("token");
      console.log("Token ------>>", token)

      // Realiza la solicitud a tu API para cerrar sesión
      const response = await fetch("http://192.168.1.6:3000/api/movil/cerrarSesion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: "elvix@gmail.com", // Ajusta con el correo electrónico del usuario actual
            tokens: [token],
          },
        }),
      });

      if (response.ok) {
        // Elimina el token almacenado localmente
        await AsyncStorage.removeItem("token");

        // Redirige a la pantalla de inicio de sesión
        navigation.navigate("Login View");
      } else {
        console.error("Error al cerrar sesión:", response.status);
        // Puedes manejar el error de acuerdo a tus necesidades
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Puedes manejar el error de acuerdo a tus necesidades
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a la pantalla de inicio!</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
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
});
