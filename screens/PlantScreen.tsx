import { ParamListBase, Route } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'react-native';

import PlantItem from '../components/plantsOutput/PlantItem';

function PlantScreen(route: Route<string>, navigation: NativeStackNavigationProp<ParamListBase>) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <PlantItem route={route} navigation={navigation} {...route}/>
    </View>
  )
}

export default PlantScreen;