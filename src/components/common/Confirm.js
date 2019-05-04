import React from 'react';
import { View, Modal, Image } from 'react-native';
import { Button, Headline, Paragraph } from 'react-native-paper';
import CardSection from './CardSection';

const Confirm = ({ visible, onAccept, onDecline, item }) => {
    const { containerStyle, cardSectionStyle } = styles;
    console.log(item.currPlate.name);
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
        >
            <View style={containerStyle}>
                <View style={{ backgroundColor: '#fff', alignItems: 'center' }}>
                    <Image 
                    source={{ uri: 'https://assets3.thrillist.com/v1/image/2797371/size/tl-horizontal_main_2x.jpg' }} 
                    style={{ height: 100, width: 150, top: 5 }} 
                    />
                    <Headline>{item.currPlate.name}</Headline>
                    <Paragraph>{item.currPlate.description}</Paragraph>
                </View>
            
                <View style={{ backgroundColor: '#fff', alignItems: 'center' }}>
                <CardSection style={cardSectionStyle}>
                    <Button onPress={onDecline}>Cancel</Button>
                    <Button onPress={onAccept}>Add</Button>
                </CardSection>
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    cardSectionStyle: {
        justifyContent: 'center',
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.50)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
};

export default Confirm;

