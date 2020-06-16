import 'react-native-gesture-handler';
import React from 'react';
import MainComponent from './components/MainComponent';

//Redux
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'

const store = configureStore();

export default function App() {
    return (
        <Provider store={store}>
            <MainComponent />
        </Provider>
    )
}
