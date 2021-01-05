/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';

import asset from '../asset';

import ListMonthScreen from './MonthScreen';
import Header from '../shared/Header';
import ContainerDayScreen from './ContainerDayScreen';

import DetailDate from './DetailDate';

import { createStackNavigator, HeaderTitle, TransitionPresets } from '@react-navigation/stack';



// date-time now
// interval update time


const Stack = createStackNavigator();


class MainScreen extends React.Component{

  render(){
    return (
      <ImageBackground source={asset.weather.lightsky} imageStyle={{opacity:0.2}} style={styles.container}>
        <Header 
          navigation={this.props.navigation}
        />
        <View style={styles.drawALine} />
        <Stack.Navigator
          >
            <Stack.Screen name="ContainerDayScreen" component={ContainerDayScreen} 
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen name="ListMonthScreen" component={ListMonthScreen} 
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen name="DetailDate" component={DetailDate} 
              options={{
                gestureEnabled:true,
                gestureDirection:'horizontal',
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerShown: false,
              }}
            />
          </Stack.Navigator>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  drawALine:{
    width:'100%',
    height:2,
    backgroundColor:'silver',
  },
});

export default MainScreen;
