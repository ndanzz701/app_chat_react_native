import React, { Component } from 'react';
 import { createAppContainer, createStackNavigator } from 'react-navigation';
import Login from './View/Login'
import Home from './View/Home'
import Test from './View/Test'
const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {header: null}
  },
  Home: {
    screen: Home,
    navigationOptions: {header: null}
  },
});

const ShowScreen = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <ShowScreen/>;
  }
}