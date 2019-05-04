import React, { Component } from 'react';
import { List, IconButton } from 'react-native-paper';
import Dialoga from './dialog';

class MyComponent extends Component {
  state = {
    expanded: true
  }

  handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  render() {
    return (
      <List.Section title="Accordions">
        <List.Accordion
          title="Uncontrolled Accordion"
          left={props => <List.Icon {...props} icon="folder" />}
        >
        <List.Section>
          <List.Accordion title="First item">
            <List.Item title="First item" right={() => <IconButton icon="add" onPress={() => <Dialoga />} />} />
            <List.Item title="Second item" right={() => <List.Icon icon="add" />} />
          </List.Accordion>
          </List.Section>
          <List.Item title="Second item" />
        </List.Accordion>

        <List.Accordion
          title="Controlled Accordion"
          left={props => <List.Icon {...props} icon="folder" />}
          expanded={this.state.expanded}
          onPress={this.handlePress}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
    );
  }
}

export default MyComponent;
