import React, { useEffect , useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { listaHorarios } from '../api';
const ListHorarios = ({ route  , navigation}) => {
  const {datos} = route.params
  console.log("antes")
  console.log(datos.data._id)
  console.log("despues")

  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    const obtenerHorarios = async () => {
      try {
        const response = await listaHorarios(datos.data._id);
        // Suponiendo que la respuesta de la API es un arreglo de objetos similar a 'data'
        console.log("mostrando response")
        console.log(response.data)
        setHorarios(response.data);
      } catch (error) {
        console.error('Error al obtener los horarios:', error);
      }
    };

    obtenerHorarios();
  }, []);
  
  const vistaqr = (item)=>{
    console.log("este es el id de horario => ")
    console.log(item)
    console.log("este es el id de persona = >")
    console.log(datos.data._id)
    navigation.navigate('Scanned' , {idPersona:datos.data._id})
  }


  // Función para renderizar cada elemento de la lista
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{item._id}</Text>
        <Text style={styles.itemText}>{item.id_grupo.name}</Text>
        <Text style={styles.itemText}>{item.id_curso.name}</Text>
        <Text style={styles.itemText}>{item.atributo3}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={() => vistaqr(item._id)}>Botón</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={horarios}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default ListHorarios;