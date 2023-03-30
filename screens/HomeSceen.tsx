import { Text, View, StyleSheet  } from 'react-native';
import PlantsOutput from '../components/plantsOutput/PlantsOutput';
import CustomAddButton from '../components/ui/CustomAddButton';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.fab}>
        <CustomAddButton />
      </View>  
      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
        <PlantsOutput />
      </View>
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    zIndex: 1,
    elevation: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
    right: 0,
    bottom: 0,
  }
});