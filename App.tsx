import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/types";
import HomeScreen from "@screens/HomeScreen/HomeScreen";
import LoadingScreen from "@screens/LoadingScreen/LoadingScreen";
import ResultsScreen from "@screens/ResultsScreen/ResultsScreen";
import BookingScreen from "@screens/BookingScreen/BookingScreen";
import ReservationScreen from "@screens/ReservationScreen/ReservationScreen";
import TripScreen from "@screens/TripScreen/TripScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

console.log("[App] Starting AI Travel Agent prototype");

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen name="Reservation" component={ReservationScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="Trip" component={TripScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
