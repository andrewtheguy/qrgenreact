'use strict';

import React, {useEffect, useState} from 'react';

import {
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    Linking,
    SafeAreaView,
    ScrollView
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

function ScanResult(props){
    const [supportedUrl, setSupportedUrl] = useState({urlChecked: '',supported: false});
    const url = props.text;
    useEffect(() =>{
        async function check(){
            console.log("chafa")
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);
            console.log(supported)
            setSupportedUrl({urlChecked: url,supported})
        }
        check();
    }, [url]);

    return (
        <SafeAreaView><Text style={styles.resultText} selectable={true}>{supportedUrl.urlChecked}</Text>
            <Button disabled={!supportedUrl.supported} onPress={() => { Linking.openURL(supportedUrl.urlChecked);} } title="Open"/>
            <Button onPress={props.scanAgain} title="Scan Again"/>
        </SafeAreaView>
    )
}

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
                <ScanResult text={text} scanAgain={()=> setScan({text:'',scanned: false})}></ScanResult>
                : <QRCodeScanner
                    reactivate={false}
                    onRead={onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    topContent={
                        <Text style={styles.centerText}>
                            <Text style={styles.textBold}>Scan the QR Code</Text>
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
