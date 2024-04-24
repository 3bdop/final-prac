import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import AdminScreen from './components/AdminScreen';
import ResturantScreen from './components/ResturantScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen name="Menu" component={ResturantScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

