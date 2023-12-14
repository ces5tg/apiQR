import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginView } from "./views/LoginView";
import { RegisterView } from "./views/RegisterView";
import Scanned from './views/Scanned';
import { HomeView } from "./views/HomeView"





const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Login View"
        component={LoginView}
        options={{ headerShown: false  }}
      />
      <Stack.Screen
        name="Home"
        component={HomeView}  // Use HomeView as the component for the "Home" screen
        options={{ headerShown: false  }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterView}
        options={{ headerShown: false  }}
      />
    
        <Stack.Screen
          name="Scanned"
          component={Scanned}
          options={{ headerShown: false  }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
