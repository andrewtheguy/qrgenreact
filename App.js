import React, { useState, useRef } from 'react';
import {Text, View, Button, TextInput, ScrollView, StyleSheet, Alert} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import 'react-native-gesture-handler';
import QRScanner from './QRScanner';
import GetPicture from './GetPicture';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraRoll from "@react-native-community/cameraroll";
import RNFS from "react-native-fs";

function GenerateScreen() {
    const [text, setText] = useState('');

    const [svg, setSvg] = useState('');

    const saveSvg = () => {
        if(!svg){
            return;
        }
        const path = RNFS.CachesDirectoryPath+"/some-name.png";
        svg.toDataURL((data) => {
            RNFS.writeFile(path, data, 'base64')
                .then((success) => {
                    return CameraRoll.save(path, 'photo')
                })
                .then(() => {
                    RNFS.unlink(path)
                        .then(() => {
                            console.log('FILE DELETED');
                        })
                        // `unlink` will throw an error, if the item to unlink does not exist
                        .catch((err) => {
                            console.error(err.message);
                        });
                    Alert.alert("save successful");
                })
        });
    }

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
            {text.length > 0 && <View><QRCode
                size={320}
                getRef={(c) => {setSvg(c)}}
                value={text}
            />
                <Button
                    onPress={saveSvg}
                    title="Save"
                    disabled={text.length <= 0}
                    accessibilityLabel="Save"
                />
            </View>}
        </ScrollView>
    );
}



const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Generate" component={GenerateScreen} />
                <Tab.Screen name="Scan" component={QRScanner} />
                <Tab.Screen name="Get Pics" component={GetPicture} />
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
