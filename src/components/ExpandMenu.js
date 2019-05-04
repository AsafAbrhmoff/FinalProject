import React, { Component } from 'react';
import { View } from 'react-native';
import { Menu, Divider, Text } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

export default class MyComponent extends Component {
  render() {
      const { closeMenu, visible } = this.props;
    return (
        <View
          style={{
            top: -22,
            left: -1
          }}
        >
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
                <Text />
            }
          >
            <Menu.Item onPress={() => Actions.auth()} title="Log Out" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Item 3" />
          </Menu>
        </View>
    );
  }
}
