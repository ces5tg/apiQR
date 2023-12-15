// StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from './LoginView';
import ScannedView from './ScannedView';
import RegisterView from './RegisterView';
import ListHorarios from './ListHorarios';

const Stack=createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="LoginView">
      <Stack.Screen
        name="LoginView"
        component={ LoginView }
      />
      <Stack.Screen
        name="ListHorarios"
        component={ ListHorarios }
      />
      <Stack.Screen
        name="Scanned"
        component={ ScannedView }
      />

      <Stack.Screen
        name="Register"
        component={ RegisterView }
      />
    </Stack.Navigator>
  );
}
