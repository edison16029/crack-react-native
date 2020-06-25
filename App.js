import 'react-native-gesture-handler';
import React from 'react';
import MainComponent from './components/MainComponent';

//Redux
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'

import { PersistGate } from 'redux-persist/lib/integration/react';

const storeObject = configureStore();

const store = storeObject.store;

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={storeObject.persistor}>
                <MainComponent />
            </PersistGate>
        </Provider>
    )
}
