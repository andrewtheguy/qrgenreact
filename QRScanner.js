'use strict';

import React, {useEffect, useState} from 'react';

import {
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    Linking,
    SafeAreaView,
    ScrollView,
    View
} from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';

import ScanResult from './ScanResult';


export default function QRScanner({ navigation }) {

    const [scan, setScan] = useState({text:'',scanned: false});
    const [focused,setFocused]  = useState(true);


    const [hasPermission, setHasPermission] = useState(null);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            console.log('blur');
            setFocused(false);
        });

        return unsubscribe;
    }, [navigation]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('focus');
            setFocused(true);
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const onSuccess = ({ type, data }) => {
        console.log(data);
        setScan({text: data, scanned: true});
        // Linking.openURL(e.data).catch(err =>
        //     console.error('An error occured', err)
        // );
    };

    const { text, scanned } = scan;

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>

                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : onSuccess}
                        style={styles.camera}
                    />
                    {scanned && <View>
                        <ScanResult text={text} scanAgain={()=> setScan({text:'',scanned: false})}></ScanResult>
                        <Button title={'Tap to Scan Again'} onPress={() => setScan({text:'',scanned: false})} />
                    </View>}

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },

    camera: {
        width: '100%',
        height:'50%',
    },

    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    resultText: {
        padding: 16
    }
});
