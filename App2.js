import 'react-native-gesture-handler';

import React from 'react';
import {Image} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import InfoScreen from './src/components/pages/InfoScreen';
import HomeScreen from './src/components/pages/HomeScreen';
import LegalScreen from './src/components/pages/LegalScreen';
import SettingsScreen from './src/components/pages/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? require('./src/assets/home.png')
                : require('./src/assets/home.png');
            }
            if (route.name === 'Info') {
              iconName = focused
                ? require('./src/assets/map.png')
                : require('./src/assets/user.png');
            }
            return (
              <Image
                source={iconName}
                style={{width: 20, height: 20}}
                resizeMode="contain"
              />
            );
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Info" component={InfoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: {backgroundColor: '#42f44b'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: 'Setting Page'}}
      />
      <Stack.Screen
        name="Info"
        component={InfoScreen}
        options={{title: 'Info Page'}}
      />
      <Stack.Screen
        name="Legal"
        component={LegalScreen}
        options={{title: 'Legal Page'}}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: '#42f44b'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home Page'}}
      />
      <Stack.Screen
        name="Info"
        component={InfoScreen}
        options={{title: 'Info Page'}}
      />
    </Stack.Navigator>
  );
}
