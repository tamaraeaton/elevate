import * as React from 'react';
import {Image} from 'react-native';
//Nav-Options----------------------------------
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//Import Screens------------------------------------
import HomeScreen from '../pages/HomeScreen';
import LegalScreen from '../pages/LegalScreen';
import InfoScreen from '../pages/InfoScreen';

//Set Stacks-----------------------------------

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
          headerTitleStyle: {flex: 1},
        }}
      />
    </StackHome.Navigator>
  );
}

const StackMap = createStackNavigator();
function LegalStack() {
  return (
    <StackMap.Navigator initialRouteName="Legal">
      <StackMap.Screen name="Legal" component={LegalScreen} />
    </StackMap.Navigator>
  );
}

const StackInfo = createStackNavigator();
function InfoStack() {
  return (
    <StackInfo.Navigator initialRouteName="Info">
      <StackInfo.Screen name="Info" component={InfoScreen} />
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
                : require('../../assets/map.png');
            }
            if (route.name === 'Legal') {
              iconName = focused
                ? require('../../assets/placeholder.png')
                : require('../../assets/placeholder.png');
            }
            if (route.name === 'Info') {
              iconName = focused
                ? require('../../assets/user.png')
                : require('../../assets/user.png');
            }
            // You can return any component that you like here!
            return (
              <Image
                source={iconName}
                style={{width: 20, height: 20}}
                resizeMode="contain"
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'green',
        }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Legal" component={LegalStack} />
        <Tab.Screen name="Info" component={InfoStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Nav;
