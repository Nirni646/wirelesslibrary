import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { StyleSheet, Text, View,Image } from 'react-native';
import TransactionScreen from './screens/BookTransaction';
import SearchScreen from './screens/SearchScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <AppContainer/>
    </View>
  );
}
const TabNavigator = createBottomTabNavigator({
  Transaction : TransactionScreen,
  Search : SearchScreen
},
{
  defaultNavigationOptions : ({navigation})=>({
    tabBarIcon : ({ })=>{
      const routeName = navigation.state.routeName
      if (routeName==='Transaction'){
        return (
          <Image source={require('./assets/book.png')} 
          style={{
            width:40,
            height:30,
          }}  />
        )
      }else if (routeName==='Search'){
        return (
          <Image source={require('./assets/searchingbook.png')} 
          style={{
            width:40,
            height:30,
          }}
              />
        )
      }
    }
  })
}
)

const AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

