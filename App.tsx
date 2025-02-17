import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/store';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'RN Community Repos',
              headerStyle: {
                backgroundColor: '#24292e',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen 
            name="Details" 
            component={DetailsScreen}
            options={{
              title: 'Repository Details',
              headerStyle: {
                backgroundColor: '#24292e',
              },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}