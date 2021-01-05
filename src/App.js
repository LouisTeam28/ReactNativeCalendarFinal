import React from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import MainScreen from './screens/MainScreen';
import ZodiacScreen from './screens/ZodiacScreen';
import CustomDrawerContentComponent from './components/CustomDrawerContentComponent';
import LaughStory from './screens/LaughStory';
import StackUserScreen from './screens/StackUserScreen';
import StoryScreen from './screens/StoryScreen';
import asset from './asset';


const Drawer = createDrawerNavigator();


class App extends React.Component{


  render() {
    return (
      <NavigationContainer >
          <Drawer.Navigator initialRouteName="Home" drawerContentOptions={{
            activeTintColor: '#f2b3e0',
            activeBackgroundColor:'#c9e9f6',
            itemStyle: {marginVertical: 5},
            labelStyle:styles.contentItem,
            inactiveTintColor:'#f542ec',
          }}
          drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
          >
            <Drawer.Screen name="MainScreen" component={MainScreen} 
              options={{ 
                title:'XEM LỊCH',
                drawerIcon: config => <Image source={asset.drawerIcon.xemlich} style={styles.iconDrawerItem} />
              }}
            />
            <Drawer.Screen name="ZodiacScreen" component={ZodiacScreen} 
              options={{
                title:'HOÀNG ĐẠO/CON GIÁP',
                drawerIcon: config => <Image source={asset.drawerIcon.cunghoangdao} style={styles.iconDrawerItem} />
              }}
            />
            <Drawer.Screen name="LaughStory" component={LaughStory} 
              options={{
                title:'XEM TRUYỆN CƯỜI',
                drawerIcon: config => <Image source={asset.drawerIcon.truyencuoi} style={styles.iconDrawerItem} />
              }}
            />
            <Drawer.Screen name="StoryScreen" component={StoryScreen} 
              options={{
                title:'GHI CHÚ CÁ NHÂN',
                drawerIcon: config => <Image source={asset.drawerIcon.ghichu} style={styles.iconDrawerItem} />
              }}
            />
            <Drawer.Screen name="UserInfo" component={StackUserScreen} 
              options={{
                title:'THÔNG TIN NGƯỜI DÙNG',
                drawerIcon: config => <Image source={asset.drawerIcon.thongtinnguoidung} style={styles.iconDrawerItem} />
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black'
  },
  contentItem:{
    fontSize:13,
    fontFamily: "BaseFutara",
  },
  iconDrawerItem:{
    width:20,
    height:20,
    borderRadius:20
  },
});

export default App;
