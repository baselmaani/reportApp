import { StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StateProvider } from './src/providers/StateContext';
import { reducer, initialState } from './src/providers/mainReducer';
import Root from './src/navigators/Root';
import LocalStorageContainer from './src/providers/LocalStorageContainer';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-native-paper';

export default function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <LocalStorageContainer>
          <Root />
          <Toast />
        </LocalStorageContainer>
      </StateProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
