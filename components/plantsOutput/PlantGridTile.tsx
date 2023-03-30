import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image } from "react-native";

import { GlobalStyles } from '../../constants/styles';
import { IPlants } from "../../models/plant";
import { useDispatch, useSelector } from "react-redux";
import { renderIconsHelper } from "../../utils/utils";
import { ICONS } from "../constans/icons";
import { removeFav, addFav } from "../../store/fav";
import { RootState } from "../../store/store";

function PlantGridTile(plantItemProps: IPlants) {
  const favorites = useSelector((state: RootState) => state.favorites.ids); 
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFavorites = favorites.includes(plantItemProps.id as never);

  function plantItemPressHandler() {
    navigation.navigate('Plant' as never, { plantData: plantItemProps} as never);
  }

  function onFavPress() {
    if (isFavorites) {
      dispatch(removeFav({id: plantItemProps.id}));
    } else {
      dispatch(addFav({id: plantItemProps.id}));
    }
  }

  return (
    <View style={styles.gridItem}>
      <Ionicons
        onPress={onFavPress} 
        style={styles.favIcon}
        name={isFavorites ? 'heart' : 'heart-outline'}
        size={30} 
        color={GlobalStyles.colors.heartColor}
      />
      <TouchableOpacity style={styles.button} onPress={plantItemPressHandler}>
        <View style={styles.innerContainer}>
          <Image source={{uri: plantItemProps.imgUrl}} style={styles.image} />
          <View style={styles.title}>
            <Text style={styles.text}>{plantItemProps.name}</Text>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.irrigation}>{renderIconsHelper(ICONS.WATER, GlobalStyles.colors.water, plantItemProps.water, 20)}</View>
            <View style={styles.insolation}>{renderIconsHelper(ICONS.SUNNY, GlobalStyles.colors.sunny, plantItemProps.sun, 20)}</View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default PlantGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flexDirection: 'column',
    margin: 16,
    height: 200,
    width: 160,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: GlobalStyles.colors.primaryBackgroudColor,
    shadowColor: 'gray',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0},
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flex: 1
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    color: 'white'
  },
  image: {
    width: '100%',
    height: '85%',
    borderRadius: 8
  },
  title: {
    textAlign: 'center',
    position: 'absolute',
    bottom: '20%',
    backgroundColor: GlobalStyles.colors.primaryGreen,
    padding: 5,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 0},
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4
  },
  irrigation: {
    flex: 1,
    flexDirection: 'row',
  },
  insolation: {
    flexDirection: 'row',
  },
  favIcon: {
    position: 'absolute',
    zIndex:  10,
    top: 5,
    right: 5
  }
});