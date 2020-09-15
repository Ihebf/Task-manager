import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DoneTasksScreen from './screens/DoneTasksScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "HomeScreen">
      <Stack.Screen
      name      = "HomeScreen"
      component = {HomeScreen}
      options   = {{
        title      : 'Tasks',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor : 'black',
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}/>
      <Stack.Screen
        name      = "DoneTasksScreen"
        component = {DoneTasksScreen}
        options   = {{
          title      : 'Done Tasks',
          headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor : 'black',
        headerTitleStyle: {
          fontWeight: "bold",
        },
        }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}