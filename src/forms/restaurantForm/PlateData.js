import React, { Component } from 'react';
import { View, Image, Picker } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { connect } from 'react-redux';
import { addPlate } from '../../actions';

class PlateData extends Component {
  state = {
    quantity: 1,
    totalPrice: 0
  };

  componentWillMount() {
    this.setState({ totalPrice: this.props.item.currPlate.price });
  }

  onAddPress() {
    const { onDecline, item } = this.props;    
    this.props.addPlate({ 
        plate: item.currPlate.name,
        amount: this.state.quantity,
        price: this.state.totalPrice
    });
    console.log(this.props);
    onDecline();
  }

  render() {
    const { visible, onDecline, item } = this.props;
    const { containerStyle, contentStyle, pickerStyle, selectStyle, imageStyle } = styles;
    return (
        <View>
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={onDecline}
                >
                    <View style={containerStyle}>
                        <Dialog.Content style={contentStyle}>
                            <Image 
                                source={{ uri: 'https://assets3.thrillist.com/v1/image/2797371/size/tl-horizontal_main_2x.jpg' }} 
                                style={imageStyle} 
                            />
                            <Dialog.Title>{item.currPlate.name}</Dialog.Title>
                            <Paragraph>{item.currPlate.description}</Paragraph>
                            <View style={{ top: 7 }}>
                                <View style={selectStyle}>
                                    <Paragraph>Quantity:</Paragraph>
                                    <Picker
                                        selectedValue={this.state.quantity}
                                        style={pickerStyle}
                                        onValueChange={(itemValue) =>
                                        this.setState({ quantity: itemValue, 
                                        totalPrice: itemValue * item.currPlate.price }
                                        )}
                                    >
                                        <Picker.Item label="1" value="1" />
                                        <Picker.Item label="2" value="2" />
                                        <Picker.Item label="3" value="3" />
                                        <Picker.Item label="4" value="4" />
                                        <Picker.Item label="5" value="5" />
                                        <Picker.Item label="6" value="6" />
                                        <Picker.Item label="7" value="7" />
                                        <Picker.Item label="8" value="8" />
                                        <Picker.Item label="9" value="9" />
                                        <Picker.Item label="10" value="10" />
                                    </Picker>
                                </View>
                                <Paragraph>Total: {this.state.totalPrice}</Paragraph>
                            </View>
                        </Dialog.Content>
                    </View>
                    <Dialog.Actions>
                        <Button onPress={onDecline}>Cancel</Button>
                        <Button onPress={this.onAddPress.bind(this)}>Add</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
  }
}

const styles = {
    contentStyle: {
        alignItems: 'center',
        top: 5 
    },
    containerStyle: {
        alignItems: 'center'
    },
    imageStyle: {
        height: 100, 
        width: 250, 
        resizeMode: 'stretch'
    },
    selectStyle: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    },
    pickerStyle: {
        height: 25, 
        width: 65
    }
};

const mapStateToProps = ({ reservasion }) => {
    const { order } = reservasion;
    return { order };
};

export default connect(mapStateToProps, { addPlate })(PlateData);
