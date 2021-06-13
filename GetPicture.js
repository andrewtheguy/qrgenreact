import React, { useState, useEffect } from 'react';
import {Button, Image, View, Platform, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {BarCodeScanner} from 'expo-barcode-scanner';


export default function GetPicture() {
    const [image, setImage] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            //aspect: [4, 3],
            //quality: 1,
            base64: false,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            setData(null);
            console.log(result);
            BarCodeScanner.scanFromURLAsync(result.uri).then(result=> {
                console.log(result);
                if(result[0]) {
                    setData(result[0].data);
                }
            }).catch((err => {
                console.error(err);
                Alert.alert("error parsing qr");
            }))
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            {data && <Text>{data}</Text>}
        </View>
    );
}
