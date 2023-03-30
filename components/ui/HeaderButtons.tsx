import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../../constants/styles';
import { useDispatch } from 'react-redux';
import { deletePlant } from '../../store/plants';
import { removePlant } from '../../utils/serverRequest';

function HeaderButtons({plantId, onFavPress, favIcon, confirmButton}: any) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function deleteHandler() {
    try {
      await removePlant(plantId);
      dispatch(deletePlant(plantId));
    } catch (error) {
      alert('something went wrong')
    }
    navigation.goBack();
  }
  
  return <>
    <View style={styles.buttonStyle}>
      <View style={styles.iconGroup}>
        <Ionicons
          onPress={onFavPress} 
          style={styles.icon}
          name={favIcon}
          size={30}
          color={GlobalStyles.colors.heartColor}
        />
        { !!plantId &&
          <Ionicons 
            onPress={deleteHandler} 
            style={styles.icon}
            name="trash-bin-outline" 
            size={30}
            color='red' 
          />
        }
        <TouchableOpacity style={styles.confirmButton} onPress={confirmButton}>
          <Text style={{color: 'white'}}>{!!plantId ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </>
}

export default HeaderButtons;

const styles = StyleSheet.create({
  confirmButton: {
    backgroundColor: GlobalStyles.colors.primaryGreen,
    borderRadius: 25,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGroup: {
    flexDirection: 'row-reverse'
  },
  icon: {
    paddingLeft: 20
  }
});