import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import { GlobalStyles } from '../../constants/styles';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function CustomAddButton() {
  const navigation = useNavigation();

  function handleButtonOnPress() {
    navigation.navigate('Plant' as never);
  };

  return (
    <>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleButtonOnPress}>
        <Ionicons style={styles.iconStyle}
            name='add-outline'
            size={40} 
            color={GlobalStyles.colors.primaryBackgroudColor}
          />
      </TouchableOpacity>
    </>
  )
}

export default CustomAddButton;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: GlobalStyles.colors.primaryGreen,
    borderRadius: 35,
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0},
    shadowRadius: 8,
  },
  iconStyle: {
    paddingLeft: 2,
    textAlign: 'center'
  }
});

function addPlant(): any {
  throw new Error('Function not implemented.');
}
