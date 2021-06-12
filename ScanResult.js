import React, {useEffect, useState} from 'react';
import {Button, Linking, SafeAreaView, Text} from 'react-native';

export default function ScanResult(props){
    const [supportedUrl, setSupportedUrl] = useState({urlChecked: '',supported: false});
    const url = props.text;
    useEffect(() =>{
        async function check(){
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);
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
