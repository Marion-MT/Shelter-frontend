import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import ConnexionScreen from './screens/ConnexionScreen';
import CreditScreen from './screens/CreditScreen';
import EndGameScreen from './screens/EndGameScreen';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';
import IntroductionScreen from './screens/IntroductionScreen';
import ParametreScreen from './screens/ParametreScreen';
import SplashScreen from './screens/SplashScreen';
import SuccesScreen from './screens/SuccesScreen';
import RecapGameScreen from './screens/RecapGameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Introduction' component={IntroductionScreen} />
        <Stack.Screen name='Connexion' component={ConnexionScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Parametre' component={ParametreScreen} />
        <Stack.Screen name='Credit' component={CreditScreen} />
        <Stack.Screen name='Succes' component={SuccesScreen} />
        <Stack.Screen name='Game' component={GameScreen} />
        <Stack.Screen name='EndGame' component={EndGameScreen} />
        <Stack.Screen name='RecapGame' component={RecapGameScreen} />
        <Stack.Screen name='Splash' component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
