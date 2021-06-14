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
    ScrollView, TextInput, Image, TouchableHighlight, ListView, FlatList, Alert, View,
} from 'react-native';

export default function GetPicture() {

    const [photos, setPhotos] = useState(null);
    const [selectedPhoto,setSelectedPhoto] = useState(null);

    const handleButtonPress = () => {
        console.log("handleButtonPress")
        CameraRoll.getPhotos({
            first: 5000,
            assetType: 'Photos',
        })
            .then(r => {
                console.log(r);
                setPhotos(r.edges);
            })
            .catch((err) => {
                console.error(err);
                Alert.alert("Error Loading Images")
                //Error Loading Images
            });
    };


    const renderRow = (rowData) => {
        console.log(rowData.item.node);
        //return null;

        const obj = rowData.item.node;
        return (
            <TouchableHighlight
                onPress={() => setSelectedPhoto(obj.image.uri) }>
                <View>
                <Image
                    source={{ uri: obj.image.uri }}
                    style={styles.image} /><Text>{new Date(obj.timestamp*1000).toLocaleString("en-US")}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <SafeAreaView>
                <Button
                    onPress={handleButtonPress}
                    title="Get Pictures"
                    accessibilityLabel="Get Pictures"
                />
            <FlatList
            data={photos}
            renderItem={(rowData) => renderRow(rowData)}
             />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
    resultText: {
        padding: 16,
    },
    image: {
        width: 120,
        height: 130,
        marginLeft: 15,
        marginTop: 15,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#efefef',
    },
});
