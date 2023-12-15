import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { listaHorarios } from '../api';

const ListHorarios = ({ route, navigation }) => {
  const { datos } = route.params;
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    const obtenerHorarios = async () => {
      try {
        const response = await listaHorarios(datos.data._id);
        setHorarios(response.data);
      } catch (error) {
        console.error('Error al obtener los horarios:', error);
      }
    };

    obtenerHorarios();
  }, []);

  const vistaqr = (item) => {
    navigation.navigate('Scanned', { idPersona: datos.data._id });
  };

  const formatHora = (fechaMongoDB) => {
    const fecha = new Date(fechaMongoDB);
    const horas = fecha.getHours().toString().padStart(2, '0');  // Asegura que siempre tenga dos dígitos
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  };
  const renderHorarioItem = ({ item }) => (
    <TouchableOpacity onPress={() => vistaqr(item)} style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>ID: {item.id_horario.aula.name}</Text>
        <Text style={styles.itemText}>Grupo: {item.id_grupo.name}</Text>
        <Text style={styles.itemText}>Curso: {item.id_curso.name}</Text>
        <Text style={styles.itemText}>hora inicio: {formatHora(item.id_horario.hora_inicio)}</Text>
        <Text style={styles.itemText}>hora fin: {formatHora(item.id_horario.hora_fin)}</Text>

      </View>
      <TouchableOpacity style={styles.button} onPress={() => vistaqr(item)}>
        <Text style={styles.buttonText}>Ver QR</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Horarios</Text>
      <FlatList
        data={horarios}
        keyExtractor={(item) => item._id}
        renderItem={renderHorarioItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    elevation: 4,
    marginBottom: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ListHorarios;