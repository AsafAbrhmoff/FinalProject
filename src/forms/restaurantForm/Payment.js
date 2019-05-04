import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button, Appbar, ActivityIndicator, Provider } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { CreditCardInput } from 'react-native-credit-card-input';
import { connect } from 'react-redux';
import _ from 'lodash';
import { updateOrder, addToOrdersList, addComments } from '../../actions/ReservasionActions';
import Alert from '../../components/Alert';

class Payment extends Component {
    state = {
        data: null,
        showIndicator: false,
        errorMessage: '',
        showAlert: false,
        amount: 0
    }

    componentWillMount() {
        const { order } = this.props;
        let total = 0;
        _.forEach(order, element => {
            total += element.price;
        });
        this.setState({ amount: total });
    }

    onChange = (result) => {
        this.setState({ data: result });
    };

    onDeclineAlert() {
        this.setState({ showAlert: false });
    }

    onPress() {
        const data = this.state.data;
        if (data === null) {
            this.setState({
                showAlert: true,
                errorMessage: 'Please insert details'
            });
            return;  
        }
        if (data.values.number.length !== 19) {
            this.setState({
                showAlert: true,
                errorMessage: 'Check number card'
            });
            return; 
        } else if (data.status.cvc !== 'valid') {
            this.setState({
                showAlert: true,
                errorMessage: 'Check cvc number'
            });
            return;
        } else if (data.status.expiry !== 'valid') {
            this.setState({
                showAlert: true,
                errorMessage: 'Check expiry date'
            });
            return;
        } else if (data.status.name !== 'valid') {
            this.setState({
                showAlert: true,
                errorMessage: 'Check name'
            });
            return;
        }
        this.setState({ showIndicator: true });
        setTimeout(() => { 
            this.setState({ showIndicator: false });
            this.props.addComments(this.props.comments);
            const { currentUser } = firebase.auth();
            const { order } = this.props;
            firebase.database().ref(`/orders/${currentUser.uid}`)
            .push({ order })
            .catch(error => console.log(error));
            this.props.addToOrdersList(this.props.order);
            const temp = [];
            this.props.updateOrder(temp);
            Actions.restaurantDetails({ 
                title: this.props.restaurant.name, 
                restaurant: this.props.restaurant
            });
        }, 5000);
    }

    goBack() {
        Actions.reservasion({ 
            restaurant: this.props.restaurant
        });
    }

    renderAppBar = () => {
        return (
            <Appbar.Header style={{ backgroundColor: '#08B2FF' }}>
                <Appbar.BackAction onPress={this.goBack.bind(this)} />
                <Appbar.Content title="Payment" />
            </Appbar.Header>
        );
    }

    render() {
        const { buttonStyle, inputLabel } = styles;
        return (
            <Provider>
                <ScrollView>
                    {this.renderAppBar()}
                    <CreditCardInput onChange={this.onChange} requiresName />
                    <Text style={inputLabel}>AMOUNT: {this.state.amount}</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <Button 
                            mode="contained" 
                            onPress={this.onPress.bind(this)}
                            style={buttonStyle}
                        >
                            Pay
                        </Button>
                    </View>
                    <ActivityIndicator 
                        animating={this.state.showIndicator} 
                        size="large" 
                        style={{ top: 10, bottom: 10 }}
                    />
                    <Alert 
                        visible={this.state.showAlert}
                        onDecline={this.onDeclineAlert.bind(this)} 
                        text={this.state.errorMessage}
                    />
                </ScrollView>
            </Provider>
        );
    }
}

const styles = {
    buttonStyle: {
        marginTop: 25,
        width: 300,
        backgroundColor: '#08B2FF'
    },
    inputLabel: {
        marginTop: 20,
        fontWeight: 'bold',
        color: 'black',
        left: 20
    },
};


const mapStateToProps = ({ reservasion }) => {
    const { order } = reservasion;
    return { order };
};

export default connect(mapStateToProps, { updateOrder, addToOrdersList, addComments })(Payment);
