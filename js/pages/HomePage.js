import React, { Component } from 'react';
// tab 导航器
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import FavoritePage from './FavoritePage'
import MyPage from './MyPage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationUtil from '../navigator/NavigationUtil';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

class HomePage extends Component {
  constructor(props) {
    super(props)
    NavigationUtil.navigation = this.props.navigation
  }
  render() { 
    return (
      <Tab.Navigator
            initialRouteName="popularPage"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'popularPage') {
                    iconName = focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline';
                  } else if (route.name === 'trendingPage') {
                    iconName = focused ? 'ios-list' : 'ios-list';
                  } else if (route.name === 'favoritePage') {
                    iconName = focused ? 'ios-list' : 'ios-list';
                  } else if (route.name === 'myPage') {
                      iconName = focused ? 'person-circle-outline' : 'person-circle-outline'
                  }
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
              })}
        >
            <Tab.Screen name="popularPage" options={{tabBarLabel: '最热'}} component={PopularPage}/>
            <Tab.Screen name="trendingPage" options={{tabBarLabel: '趋势'}} component={TrendingPage}/>
            <Tab.Screen name="favoritePage" options={{tabBarLabel: '收藏'}} component={FavoritePage}/>
            <Tab.Screen name="myPage" options={{tabBarLabel: '我的'}} component={MyPage}/>
        </Tab.Navigator>
    );
  }
}


export default HomePage;