import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types';
import HomeScreen from '@screens/HomeScreen/HomeScreen';
import LoadingScreen from '@screens/LoadingScreen/LoadingScreen';
import ResultsScreen from '@screens/ResultsScreen';
import ReservationScreen from '@screens/ReservationScreen';
import SuccessScreen from '@screens/SuccessScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

console.log('[App] Starting AI Travel Agent prototype');

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home"        component={HomeScreen} />
      <Stack.Screen name="Loading"     component={LoadingScreen} />
      <Stack.Screen name="Results"     component={ResultsScreen} />
      <Stack.Screen name="Reservation" component={ReservationScreen} />
      <Stack.Screen name="Success"     component={SuccessScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
