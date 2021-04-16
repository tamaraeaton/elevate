import * as React from 'react';
import {Image} from 'react-native';
//Nav-Options----------------------------------
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//Import Screens------------------------------------
import HomeScreen from '../Screens/Home/HomeScreen';
import HomeScreen2 from '../Screens/Home/HomeScreen2';
import MapScreen from '../Screens/Map/MapScreen';
import InfoScreen from '../Screens/Info/InfoScreen';
// import { HomeStack, InfoStack, MapStack } from './index'
//Set Stacks-----------------------------------
const image = require('../../assets/elevate-logo.png')

const Tab = createBottomTabNavigator();
const StackHome = createStackNavigator();
function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ 
        headerShown: false,
        headerTitleStyle: { flex: 1 },
       }}
      />
      <StackHome.Screen name="Home2" component={HomeScreen2} />
    </StackHome.Navigator>
  );
}

const StackMap = createStackNavigator();
function MapStack() {
  return (
    <StackMap.Navigator initialRouteName="Maps">
      <StackMap.Screen name="Maps" component={MapScreen} />
    </StackMap.Navigator>
  );
}

const StackInfo = createStackNavigator();
function InfoStack() {
  return (
    <StackInfo.Navigator initialRouteName="Info">
      <StackInfo.Screen name="Info" component={InfoScreen}/>
    </StackInfo.Navigator>
  );
}

function Nav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            //Add new Bottom-tabs here-------------------------
            if (route.name === 'Home') {
              iconName = focused
                ? require('../../assets/home.png')
                : require('../../assets/house.png');
            }
            if (route.name === 'Map') {
              iconName = focused
                ? require('../../assets/placeholder.png')
                : require('../../assets/map.png');
            }
            if (route.name === 'Info') {
              iconName = focused
                ? require('../../assets/user.png')
                : require('../../assets/user.png');
            }
            // You can return any component that you like here!
            return <Image 
                source={iconName} 
                style={{ width: 20, height:20 }}
                resizeMode="contain" />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'green',
        }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Map" component={MapStack} />
        <Tab.Screen name="Info" component={InfoStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Nav;
