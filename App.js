import React, { useState } from 'react';
import { Text, View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function GenerateScreen() {
    const [text, setText] = useState('');
    return (
        <ScrollView style={{paddingTop: 40, paddingLeft:10, paddingRight: 10}}>
            <TextInput
                style={styles.input}
                maxLength={7089 /* max numeric characters for qr code */}
                placeholder="Enter text"
                multiline={true}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={text => setText(text)}
                defaultValue={text}
            />
            <Button
                onPress={() => setText('')}
                title="Clear"
                disabled={text.length <= 0}
                accessibilityLabel="Clear"
            />
            {text.length > 0 && <QRCode
                size={320}
                value={text}
            />}
        </ScrollView>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}


const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Generate" component={GenerateScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        //marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 1
    },
});

export default App;
