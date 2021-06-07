import React, { useState } from 'react';
import { Text, TextInput, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const App = () => {
    const [text, setText] = useState('');
    return (
        <ScrollView style={{paddingTop: 40, paddingLeft:10, paddingRight: 10}}>
            <TextInput
                style={{height: 40,
                    borderColor: 'gray',
                    borderWidth: 1}}
                placeholder="Type here to translate!"
                onChangeText={text => setText(text)}
                defaultValue={text}
            />
            {text.length > 0 && <QRCode
                size={320}
                value={text}
            />}
        </ScrollView>
    );
}

export default App;
