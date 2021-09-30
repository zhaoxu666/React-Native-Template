import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native';
// 堆栈 导航器
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';

const Stack = createNativeStackNavigator ()

function AppNavigators() {
    return (
        <NavigationContainer>
            <Stack.Navigator  initialRouteName="WelcomePage" screenOptions={{headerShown: false}}>
                <Stack.Screen name="WelcomePage" component={WelcomePage}></Stack.Screen>
                <Stack.Screen name="HomePage" component={HomePage}></Stack.Screen>
                <Stack.Screen name="DetailPage" component={DetailPage}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}



export default AppNavigators