import React from 'react';
import { View, StyleSheet } from 'react-native';
import ItemList from './ItemList';

const App = () => {
    return (
        <View style={styles.container}>
            <ItemList />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default App;