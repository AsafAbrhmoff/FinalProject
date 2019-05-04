import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

export default class Dialoga extends Component {
  state = {
    visible: true
  };

  hideDialog = () => { this.setState({ visible: false }); }

  render() {
    return (
        <View>
      <Provider>
        <Portal>
          <Dialog
             visible={this.state.visible}
             onDismiss={this.hideDialog}
          >
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
      </View>
    );
  }
}
