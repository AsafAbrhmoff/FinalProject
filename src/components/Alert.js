import React, { Component } from 'react';
import { View } from 'react-native';
import { Portal, Dialog, Button, Paragraph } from 'react-native-paper';

class Alert extends Component {
    render() {
        const { visible, onDecline, text } = this.props;
        return (
            <View>
                <Portal>
                    <Dialog
                        visible={visible}
                        onDismiss={onDecline}
                    >
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>{text}</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={onDecline}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    }
}

export default Alert;
