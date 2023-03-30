import { useState } from "react";
import { View,  StyleSheet, Text } from "react-native";
import { ICONS } from "../constans/icons";
import Slider from '@react-native-community/slider';
import { GlobalStyles } from "../../constants/styles";
import Input from "../ui/Input";
import { Ionicons } from '@expo/vector-icons'

function PlantItemForm({plantData, setData}: any) {
  const [enteredValue, setEnteredValue] = useState(plantData);
  const [value, setValue] = useState(plantData.freq);

  function handleChangeInput(identify: string, enteredValue: string | number) {
    setEnteredValue((currentValue: any) => {
      const data = {
        ...currentValue,
        [identify]: enteredValue,
        freq: value,
      }
      setData({...data})
      return data
    });
  }

  function valueIsValid(value: string, regex: string) {
    const regexValue = new RegExp(regex)
    return regexValue.test(value)
  }

  function setBorderColor(value: string, regex: string) {
    return valueIsValid(value, regex) && value.length !== 0 ? 'green' : 'red'
  }

  function handleIrrigationPicker(index: number): string {
    return enteredValue.water<index ? ICONS.WATER_OUTLINE : ICONS.WATER;
  }

  function handleInsolationPicker(index: number): string {
    return enteredValue.sun<index ? ICONS.SUNNY_OUTLINE : ICONS.SUNNY;
  }

  return(
    <>
      <View style={styles.fieldContainer}>
        <Input label='Name' inputProps={{
          style: [
            styles.input, 
            {flex: 6},
            {borderColor: setBorderColor(enteredValue.name, '^[a-zA-Z\\s]*$')}
          ], 
          onChangeText: handleChangeInput.bind(null, 'name'),
          value: enteredValue.name,
          maxLength: 30,
          placeholder: 'name your plant :) [only letters]',
          autoCapitalize: 'words',
        }}/>
      </View>
      <View style={styles.fieldContainer}>
        <View style={styles.containerWithSlider}>
          <View style={[styles.containerWithoutSlider, {paddingBottom:30}]}>
            <View style={[styles.containerStyle, styles.containerColumn]}>
              <Text style={styles.label}>Irrigation</Text>
              <View>
                <View style={styles.btnGroup} >
                    <Ionicons key={1+'water'} name={handleIrrigationPicker(1) as any} size={30} color={enteredValue.water>=1 ? GlobalStyles.colors.water : GlobalStyles.colors.outlineGreyColor} onPress={() => handleChangeInput('water', 1)}/>
                    <Ionicons key={2+'water'} name={handleIrrigationPicker(2) as any} size={30} color={enteredValue.water>=2 ? GlobalStyles.colors.water : GlobalStyles.colors.outlineGreyColor} onPress={() => handleChangeInput('water', 2)}/>
                    <Ionicons key={3+'water'} name={handleIrrigationPicker(3) as any} size={30} color={enteredValue.water>=3 ? GlobalStyles.colors.water : GlobalStyles.colors.outlineGreyColor} onPress={() => handleChangeInput('water', 3)}/>
                </View>
              </View>
            </View>
            <View style={[styles.containerStyle, styles.containerColumn]}>
              <Text style={[styles.label, {paddingBottom:10}]}>Insolation</Text>
              <View>
                <View style={styles.btnGroup} >
                    <Ionicons key={1+'sun'} name={handleInsolationPicker(1) as any} size={30} color={enteredValue.sun>=1 ? GlobalStyles.colors.sunny : GlobalStyles.colors.outlineGreyColor} onPress={() => handleChangeInput('sun', 1)}/>
                    <Ionicons key={2+'sun'} name={handleInsolationPicker(2) as any} size={30} color={enteredValue.sun>=2 ? GlobalStyles.colors.sunny : GlobalStyles.colors.outlineGreyColor} onPress={() => handleChangeInput('sun', 2)}/>
                    <Ionicons key={3+'sun'} name={handleInsolationPicker(3) as any} size={30} color={enteredValue.sun>=3 ? GlobalStyles.colors.sunny : GlobalStyles.colors.outlineGreyColor} onPress={() => handleChangeInput('sun', 3)}/>
                </View>
              </View>
            </View>
          </View>
          <Text>Watering frequency: {value} {value>1 ? 'days' : 'day'}</Text>
          <Slider
            style={{width: 300, height: 10}}
            minimumValue={1}
            maximumValue={14}
            step={1}
            minimumTrackTintColor={GlobalStyles.colors.primaryGreen}
            maximumTrackTintColor={GlobalStyles.colors.primaryGreen}
            onValueChange={setValue}
            value={enteredValue.freq}
          />
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <Input label='Price' inputProps={{
            style: [
              styles.input, 
              {marginRight: 10, flex: 3},
              {borderColor: setBorderColor(enteredValue.price, '^[1-9]\\d*([\\,\\.]\\d{2})?$')}
            ],
            keyboardType: 'decimal-pad',
            placeholder: '0.00',
            maxLength: 10,
            onChangeText: handleChangeInput.bind(null, 'price'),
            value: enteredValue.price
          }}/>
         <Input label='Date' inputProps={{
            style: [
              styles.input, 
              {marginLeft: 10, flex: 3}, 
              {borderColor: setBorderColor(enteredValue.date, '^(?:(?:31(-)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(-)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(-)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(-)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$')}
            ],
            placeholder: 'DD-MM-YYYY',
            maxLength: 10,
            onChangeText: handleChangeInput.bind(null, 'date'),
            value: enteredValue.date
         }}/>
      </View>
    </>
  )
}

export default PlantItemForm;

const styles = StyleSheet.create({
  containerWithSlider: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerWithoutSlider: {
    flex: 1,
    flexDirection: 'row',
  },
  fieldContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 15,
    marginTop: 20,
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  containerColumn: {
    flexDirection: 'column'
  },
  label: {
    flex: 1,
    justifyContent: 'center',
  },
  labelSecond: {
    minWidth: 20
  },
  input: {
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 18,
    lineHeight: 23,
    flex: 4,
    height: 30,
    borderRadius: 20,
    borderWidth : 0.5
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: "center",
  }
});