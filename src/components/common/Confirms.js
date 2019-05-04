import React, { Component } from 'react';
import { View, Modal, Image, Picker } from 'react-native';
import { Button, Headline, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import CardSection from './CardSection';
import { addPlate } from '../../actions';

class Confirm extends Component {
    state = { amountOfProduct: 0 };

    onAddPress(item) {
        const totalPrice = this.state.amountOfProduct * item.currPlate.price;
        this.props.addPlate({ 
            plate: item.currPlate.name,
            amount: this.state.amountOfProduct,
            price: totalPrice
        });
        console.log(this.props);
    }

    render() {
    const { visible, onDecline, item } = this.props;
    const { containerStyle, cardSectionStyle } = styles;
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
                    <Picker
                        selectedValue={this.state.amountOfProduct}
                        style={{ height: 50, width: 100 }}
                        onValueChange={(itemValue) =>
                        this.setState({ amountOfProduct: itemValue })}
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

                <View style={{ backgroundColor: '#fff', alignItems: 'center' }}>
                <CardSection style={cardSectionStyle}>
                    <Button onPress={onDecline}>Cancel</Button>
                    <Button onPress={() => this.onAddPress(item)}>Add</Button>
                </CardSection>
                </View>
            </View>
        </Modal>
    );
}
}

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

const mapStateToProps = ({ reservasion }) => {
    const { order } = reservasion;
    return { order };
};

export default connect(mapStateToProps, { addPlate })(Confirm);
