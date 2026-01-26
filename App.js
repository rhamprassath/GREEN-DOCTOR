import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageScreen from './screens/LanguageScreen';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import HistoryScreen from './screens/HistoryScreen';
import ScannerScreen from './screens/ScannerScreen';
import AboutScreen from './screens/AboutScreen';
import SchemesScreen from './screens/SchemesScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import { COLORS } from './constants/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Language"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background }
        }}
      >
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Schemes" component={SchemesScreen} />
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
