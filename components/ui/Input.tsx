import { View, StyleSheet, Text, TextInput, TextInputProps } from "react-native";

function Input({label, inputProps}: {label: string, inputProps: TextInputProps}) {
    return (
        <View style={styles.containerStyle}>
          <Text style={styles.label}>{label}</Text>
          <TextInput {...inputProps} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  label: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10
  },
});