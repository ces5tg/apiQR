// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from './views/LoginView';
import Scanned from './views/ScannedView';
import RegisterView  from './views/RegisterView'; 
import ListHorarios from './views/ListHorarios';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Login View"
          component={LoginView}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="Scanned"
          component={Scanned}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListHorarios"
          component={ListHorarios}
          options={{ headerShown: false }}
        />
        
        
        <Stack.Screen
          name="Register"
          component={RegisterView}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
