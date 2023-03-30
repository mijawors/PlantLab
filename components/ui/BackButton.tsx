import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

function BackButton() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  return <>
    <TouchableOpacity     
      style={styles.buttonStyle}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <View>
        <Ionicons 
          name="chevron-back-outline" 
          size={30} 
        />
      </View>
    </TouchableOpacity>
  </>
}

export default BackButton;

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});