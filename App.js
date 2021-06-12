import React, { useState } from 'react';
import { Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const App = () => {
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

const styles = StyleSheet.create({
    input: {
        height: 50,
        //marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 1
    },
});

export default App;
