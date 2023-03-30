import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import ManageNavigator from './components/ManageNavigator';
import { store } from './store/store';

export default function App() {

  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <ManageNavigator />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
