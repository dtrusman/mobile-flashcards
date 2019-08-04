import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { Constants } from 'expo';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Decks, AddDeck, DeckDetail } from './components';
import { green, purple, white, darkGreen } from './utils/colors';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RoutesConfig = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={25} color={tintColor} />
    }
  },
  AddEntry: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='library-add' size={25} color={tintColor} />
    }
  },
}

const TabNavigationConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    showIcon: true,
    activeTintColor: Platform.OS === "ios" ? purple : white,
    labelStyle: {
      marginTop: 5
    },
    style: {
      height: 55,
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
  Decks: {
    screen: Platform.OS === 'ios' ? IOSTab : AndroidTab,
    navigationOptions: {
      header: null,
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  DeckDetail: {
    screen: DeckDetail
  }
})

const AppContainer = createAppContainer(Tabs)

export default function App() {
  return (
    <Provider store={createStore(reducers)}>
      <View style={{ flex: 1 }}>
        <CustomStatusBar backgroundColor={green} barStyle="light-content" />
        <AppContainer />
      </View>
    </Provider>
  );
}