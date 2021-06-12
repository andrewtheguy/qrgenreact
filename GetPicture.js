'use strict';

import React, {useEffect, useState} from 'react';
import CameraRoll from "@react-native-community/cameraroll";

import {
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    Linking,
    SafeAreaView,
    ScrollView, TextInput,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';



export default function GetPicture() {

    const [photos, setPhotos] = useState([]);

    const handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
            .then(r => {
                setPhotos(r.edges);
            })
            .catch((err) => {
                console.error(error);
                Alert.alert("Error Loading Images")
                //Error Loading Images
            });
    };

    return (
        <ScrollView style={{paddingTop: 40, paddingLeft:10, paddingRight: 10}}>
            <Text selectable={true}>{JSON.stringify(photos)}</Text>
            <Button
                onPress={handleButtonPress}
                title="Get Pictures"
                accessibilityLabel="Get Pictures"
            />
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
