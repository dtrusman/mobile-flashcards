import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { Home, AddEntry } from './components';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { green, purple, white, darkGreen } from './utils/colors';
import { Constants } from 'expo';

function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RoutesConfig = {
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: "Add",
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='library-add' size={30} color={tintColor} />
    }
  },
}

const TabNavigationConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 50,
      backgroundColor: Platform.OS === "ios" ? white : green,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
    indicatorStyle: {
      backgroundColor: Platform.OS === "ios" ? white : darkGreen,
    }
  }
}

const IOSTab = createBottomTabNavigator(RoutesConfig, TabNavigationConfig);
const AndroidTab = createMaterialTopTabNavigator(RoutesConfig, TabNavigationConfig);

const Tabs = createStackNavigator({
  Home: {
    screen: Platform.OS === 'ios' ? IOSTab : AndroidTab,
    navigationOptions: {
      header: null,
    },
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

const AppContainer = createAppContainer(Tabs)

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <CustomStatusBar backgroundColor={green} barStyle="light-content" />
      <AppContainer />
    </View>
  );
}