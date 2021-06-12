import React, {useEffect, useState} from 'react';
import {Button, Linking, SafeAreaView, StyleSheet, Text} from 'react-native';

export default function ScanResult(props){
    const [supportedUrl, setSupportedUrl] = useState({urlChecked: '',supported: false});
    const url = props.text;
    useEffect(() =>{
        async function check(){
            // Checking if the link is supported for links with custom URL scheme.
            let supported = false;
            try {
                supported = await Linking.canOpenURL(url);
            } catch (e){
                console.warn(e);
            } finally {
                setSupportedUrl({urlChecked: url,supported});
            }
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
