import { useLayoutEffect, useState } from 'react';
import {  View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Modal, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import PictureModal from '../ui/PictureModal';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButtons from '../ui/HeaderButtons';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addFav, removeFav } from '../../store/fav'
import PlantItemForm from './PlantItemForm';
import { RootState } from '../../store/store';
import { addPlant, updatePlant } from '../../store/plants';
import { modifyPlant, plantStorage } from '../../utils/serverRequest';

function PlantItem(nav: {route: any, navigation: NativeStackNavigationProp<ParamListBase>}) {
  const plantProps = nav.route.params?.plantData;
  const favorites = useSelector((state: RootState) => state.favorites.ids); 
  const [visibleModal, setVisibleModal] = useState(false);
  const [picture, setPicture] = useState(!!plantProps?.imgUrl ? plantProps?.imgUrl : 'https://i.ibb.co/Y72Nq0H/default-Plant.png');
  const [plantData, setPlantData] = useState({
    id: !!plantProps ? plantProps.id : '',
    name: !!plantProps ? plantProps.name : '',
    price: !!plantProps ? plantProps.price : '',
    date: !!plantProps ? plantProps.date : '',
    water: !!plantProps ? plantProps.water : 0,
    sun: !!plantProps ? plantProps.sun : 0,
    freq: !!plantProps ? plantProps.freq : 1,
  });
  const dispatch = useDispatch();


  const plantId = nav.route.params?.plantData.id;
  const isFav = favorites.includes(plantId as never);

  function onImageChanged(image: string) {
    setPicture(image);
  }

  function defaultPicture() {
    if (!!picture) return {uri: picture}
    else return require('../../assets/defaultPlant.png');
  }

  function onFavPress() {
    if (isFav) {
      dispatch(removeFav({id: plantId}));
    } else {
      dispatch(addFav({id: plantId}));
    }
  }

  async function collectAllData() {
    setPlantData((currentData) => {
      return {
        ...currentData,
        imgUrl: picture,
      }
    })

    if (!!plantId) {
      try {
        await modifyPlant(plantId, {name: plantData.name, price: plantData.price, date: plantData.date, water: plantData.water, sun: plantData.sun, freq: plantData.freq, imgUrl: picture} as any)
      } catch (error) {
        alert('something went wrong')
      }
      dispatch(updatePlant({...plantData, id: plantId}));
      nav.navigation.navigate('home' as never);
    }
    if (!!plantData.name) {
      try {
        const id = await plantStorage({...plantData, imgUrl: picture} as any);
        dispatch(addPlant({...plantData, imgUrl: picture, id: id}));
      } catch (error) {
        alert('something went wrong')
      }
      nav.navigation.navigate('home' as never);
    } else {
      alert('Fill at least Name :)');
    }
  }

  useLayoutEffect(() => {
    nav.navigation.setOptions({
      headerRight: () => <HeaderButtons
        plantId={plantId}
        onFavPress={onFavPress} 
        favIcon={isFav ? 'heart' : 'heart-outline'}
        confirmButton={collectAllData}
        plantData={plantData}
      />  
    })
  }, [nav.route, onFavPress])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior='position'>
        <ScrollView style={styles.scroll}>
          <View style={styles.form}>
            <TouchableOpacity style={styles.picture} onPress={() => setVisibleModal(true)}>
              <Ionicons name="camera" size={50} color={'black'} style={styles.pictureIcon}/>
              <Image source={defaultPicture()} style={styles.photoContainer}></Image>
            </TouchableOpacity>
            <Modal 
              visible={visibleModal} 
              transparent={true} 
              onRequestClose={() => setVisibleModal(false)}
              animationType="slide"
            >
              <PictureModal handleClose={() => setVisibleModal(false)} imageChanger={onImageChanged}/>
            </Modal>
            <PlantItemForm plantData={plantData} setData={setPlantData} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default PlantItem;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    flexDirection: 'column',
    minWidth: '100%'
  },
  picture: {
    borderRadius: 25
  },
  form: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 50
  },
  photoContainer: {
    width: 300,
    height: 300,
    borderRadius: 25
  },
  pictureIcon: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    flex: 1,
    zIndex: 1,
    opacity: 0.5,
  }
});