import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer, Route, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeSceen';
import AccountScreen from '../screens/AccountScreen';
import PlantScreen from '../screens/PlantScreen';
import { GlobalStyles } from '../constants/styles';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primaryBackgroudColor, 
          borderTopWidth: 0, 
          elevation: 1
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: GlobalStyles.colors.primaryGreen
      }}
      backBehavior = "initialRoute"
      sceneContainerStyle = {{
        backgroundColor: GlobalStyles.colors.primaryBackgroudColor
      }}  
    >
      <Tab.Screen 
        name="home" 
        component={HomeScreen} 
        options={{ 
          headerShown: false,
          title: 'hhh',
          tabBarIcon: ({color, size}) => 
            <Ionicons name="leaf-outline" size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Account" 
        component={AccountScreen} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({color, size}) => 
          <Ionicons name="person-outline" size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

function ManageNavigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="BottomTabsNavigator"
          component={BottomTabsNavigator}
          options={{
            title: ''
          }}
        />
        <Stack.Screen 
          name="Plant" 
          component={PlantScreen as any}
          options={{ 
            headerShown: true,
            title: '',
            headerBackTitleVisible: false,
            headerTintColor: 'black',
            // headerLeft: () => <BackButton />,
            // headerRight: () => <HeaderButtons />            
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ManageNavigator;


const styles = StyleSheet.create({});