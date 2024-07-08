/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Contacts from 'react-native-contacts';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import ContactDetailsScreen from './src/screens/ContactDetailsScreen/ContactDetailsScreen';
import ContactsListScreen from './src/screens/ContactsListScreen/ContactsListScreen';
import CreateContactScreen from './src/screens/CreateContactScreen/CreateContactScreen';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ContactsList">
        <Stack.Screen name="ContactsList" component={ContactsListScreen} />
        <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} />
        <Stack.Screen name="CreateContact" component={CreateContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
