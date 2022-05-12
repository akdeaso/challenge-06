import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Scan from '../screens/Scan';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Scan" component={Scan} />
  </Tab.Navigator>;
};

const MainRouter = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default MainRouter;

const styles = StyleSheet.create({});
