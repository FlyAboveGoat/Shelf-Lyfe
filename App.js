import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SnapshotViewIOS } from 'react-native';
import { Button } from 'react-native-elements';
//import database from '@react-native-firebase/database';
import { YellowBox } from 'react-native';
import _ from 'lodash';

import First from "./App/Screens/First"
import Logining from "./App/Screens/Login";
import Register from "./App/Screens/Register";
import MainScreen from "./App/Screens/Main";
//import {db} from './firebase'

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

  /*if (!firebase.apps.length) {

  }*/
  
  /*db.ref('Sensors').limitToLast(5).on('value', (data) =>{
    //console.log(Object.values(childData.Data)[0])
    //console.log(data.toJSON());
    let hahaha=data.toJSON();
    console.log(Object.values(hahaha.Record)[0]);
    let humi = Object.values(hahaha.Record)[0];
    console.log(humi.Humidity);
  })*/

const Stack = createStackNavigator();

export default function App () {
 
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="First" component={First}/>
        <Stack.Screen name="Login" component={Logining}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Main" component={MainScreen}/>
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


