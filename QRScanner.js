'use strict';

import React, {Component, useState} from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
    SafeAreaView,
    ScrollView
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export default function QRScanner() {

    const [scan, setScan] = useState({text:'',scanned: false});


    const onSuccess = e => {
        console.log(e.data);
        setScan({text: e.data, scanned: true});
        // Linking.openURL(e.data).catch(err =>
        //     console.error('An error occured', err)
        // );
    };

    const { text, scanned } = scan;

    return (
        <ScrollView>
            {scanned ?
                <SafeAreaView><Text style={styles.resultText} selectable={true}>{text}</Text></SafeAreaView>
                : <QRCodeScanner
                    onRead={onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    topContent={
                        <Text style={styles.centerText}>
                            Go to{' '}
                            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                            your computer and scan the QR code.
                        </Text>
                    }
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text style={styles.buttonText}>OK. Got it!</Text>
                        </TouchableOpacity>
                    }
                />
            }
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    },
    resultText: {
        padding: 16
    }
});
