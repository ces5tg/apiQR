import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, Animated, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { validarCodigo, validarHorario } from '../api';

export default function App({ route}) {
  const {idPersona} = route.params
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('Aún no se ha escaneado nada');
  const [flashlightOn, setFlashlightOn] = useState(false);
  const scanLineAnimation = useRef(new Animated.Value(0)).current;
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const [id_aula, setId_aula] = useState("")
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const validar = async(url) =>{
    const response = await validarCodigo(url)
    return response
  }
  const handleBarCodeScanned = async({ data }) => {
    setScanned(true);
    setScannedData(data);
    console.log("antes de validar el codigo==============================================================================")
    const valor = await validarCodigo(data)
    console.log(valor.data._id)
    setId_aula(valor.data._id)
    console.log("despues de validar el codigo oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo")

  };
  const validarInformacion = async ()=>{
    console.log(id_aula +" -------- "+idPersona)
    const response = validarHorario(id_aula , idPersona)
    console.log("termino yyyyyyyyyyyy")
  }

  useEffect(() => {
    if (scanned) {
      animateScanLine();
    }
  }, [scanned]);

  const animateScanLine = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnimation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const toggleFlashlight = async () => {
    if (cameraRef.current) {
      const { status } = await Camera.getPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const torch = !flashlightOn;
      setFlashlightOn(torch);
      await Camera.setFlashModeAsync(torch ? 'on' : 'off');
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Escáner de Códigos</Text>
        <Text style={styles.permissionText}>Solicitando permiso para acceder a la cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Escáner de Códigos</Text>
        <Text style={styles.permissionText}>Sin acceso a la cámara</Text>
        <Button title="Permitir acceso a la cámara" onPress={() => setHasPermission(null)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.scanTitle}>Escanea QR</Text>
      <View style={styles.barcodeContainer}>
        <Camera
          ref={cameraRef}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          type={Camera.Constants.Type.back}
          flashMode={flashlightOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
        />
        <View style={styles.scanLineContainer}>
          <Animated.View
            style={[
              styles.scanLine,
              {
                transform: [
                  {
                    translateY: scanLineAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 300],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
      <Text style={styles.mainText}>{scannedData}</Text>
      {scanned && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.scanAgainButton}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>Escanear de nuevo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.scanAgainButton}
            onPress={() => validarInformacion()}
          >
            <Text style={styles.buttonText}>Validar</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.bottomOptions}>
        <View style={styles.spacer} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.iconButton, flashlightOn ? styles.activeButton : null]}
            onPress={toggleFlashlight}
          >
            <Ionicons name={flashlightOn ? 'flash-off' : 'flashlight'} size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Login View')}>
            <Ionicons name="log-out" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  permissionText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  barcodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 20,
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scanTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scanLineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#00FF00',
  },
  mainText: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  scanAgainButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconButton: {
    backgroundColor: '#333',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeButton: {
    backgroundColor: '#FFD700',
  },
});
