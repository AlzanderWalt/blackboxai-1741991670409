import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/Home/HomeScreen';
import BeatMakerScreen from './src/screens/BeatMaker/BeatMakerScreen';
import MyBeatsScreen from './src/screens/MyBeats/MyBeatsScreen';
import StoreScreen from './src/screens/Store/StoreScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1a1a1a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Amapiano Beat Maker' }}
          />
          <Stack.Screen 
            name="BeatMaker" 
            component={BeatMakerScreen} 
            options={{ title: 'Create Beat' }}
          />
          <Stack.Screen 
            name="MyBeats" 
            component={MyBeatsScreen} 
            options={{ title: 'My Beats' }}
          />
          <Stack.Screen 
            name="Store" 
            component={StoreScreen} 
            options={{ title: 'Beat Store' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
