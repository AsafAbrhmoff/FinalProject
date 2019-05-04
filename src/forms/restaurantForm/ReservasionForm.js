import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { DataTable, IconButton, Appbar, TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { updateOrder } from '../../actions/ReservasionActions';

class ReservasionForm extends Component {
    state = { orderArray: null, text: '' }

    componentWillMount() {
        const { order } = this.props;
        this.setState({ orderArray: order });
        console.log(this.props.restaurant);
    }

    goBack() {
        Actions.menu({ restaurants: this.props.restaurant });
    }

    resetData() {
        const temp = [];
        this.setState({ orderArray: temp });
        this.props.updateOrder(temp);
    }

    cancelOrder() {
        this.resetData();
        Actions.restaurantDetails({ 
            title: this.props.restaurant.name, 
            restaurant: this.props.restaurant
        });
    }

    sendOrder() {
        Actions.payment({ restaurant: this.props.restaurant, comments: this.state.text });
    }

    removePlate(index) {
        const tempOrder = this.state.orderArray;
        tempOrder.splice(index, 1);
        this.setState({ orderArray: tempOrder });
        this.props.updateOrder(this.state.orderArray);
    }

    renderDataTable() {
        return this.state.orderArray.map((item, index) => {
            return (
                <DataTable.Row style={{ backgroundColor: 'white' }}>
                    <IconButton
                        icon="delete"
                        size={30}
                        onPress={() => this.removePlate(index)}
                        style={{ left: -10 }}
                    />
                    <DataTable.Cell style={{ paddingLeft: 15 }}>{item.plate}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.price}</DataTable.Cell>
                </DataTable.Row>
            );
        });
    }

    renderAppBar = () => {
        return (
            <Appbar.Header style={{ backgroundColor: '#08B2FF' }}>
                <Appbar.BackAction onPress={() => this.goBack()} />
                <Appbar.Content title="Reservasion" />
            </Appbar.Header>
        );
    }

    render() {
        return (
            <View>
            <ScrollView>
                {this.renderAppBar()}
                <DataTable>
                    <DataTable.Header style={{ backgroundColor: 'white' }}>
                        <DataTable.Title>Delete</DataTable.Title>
                        <DataTable.Title>Product</DataTable.Title>
                        <DataTable.Title numeric>Quantity</DataTable.Title>
                        <DataTable.Title numeric>Price</DataTable.Title>
                    </DataTable.Header>
                    {this.renderDataTable()}
                </DataTable>
                <View style={{ flex: 1 }}>
                <TextInput
                    label='Comments'
                    value={this.state.text}
                    onChangeText={text => this.setState({ text })}
                    multiline
                    style={{ backgroundColor: 'white', top: 10 }}
                />
                <View style={{ alignItems: 'center' }}>
                <View 
                    style={{ 
                        top: 15,
                        flexDirection: 'row',
                        position: 'relative',
                        bottom: 10     
                    }}
                >
                    <Button onPress={this.cancelOrder.bind(this)}>Cancel</Button>
                    <Button onPress={this.sendOrder.bind(this)}>Send</Button>
                </View>
                </View>
                </View>
            </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = ({ reservasion }) => {
    const { order } = reservasion;
    return { order };
};

export default connect(mapStateToProps, { updateOrder })(ReservasionForm);
