import React, { Component } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { 
    List, 
    Divider, 
    Appbar, 
    IconButton, 
    Provider
} from 'react-native-paper';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import md5 from 'md5';
import _ from 'lodash';
import { connect } from 'react-redux';
import LOGO from '../../image/no_imageyet.jpg';
import PlateData from './PlateData';

class Menu extends Component {
    state = {
        visible: false,
        data: [],
        currentPlate: null
    }

    componentWillMount() {
        const email = this.props.restaurants.email;
        this.fetchMenu(email);
    }

    setCurrentPlate(item) {
        this.setState({ currentPlate: item, visible: true });
    }

    fetchMenu(email) {
        const menu = [];
        let Plates = [];
        let currCategory = null;
        const restaurant = md5(email);
        firebase.database().ref(`reser/${restaurant}`)
            .once('value')
            .then(snapshot => {
                _.forEach(snapshot.val(), (uid) => {
                    _.forEach(uid, (menuData) => {
                        _.forEach(menuData, (Category) => {
                            currCategory = Category.Name;
                            _.forEach(Category.Plates, (Plate) => {
                                    const currPlate = { 
                                        name: Plate.name,
                                        price: Plate.price, 
                                        description: Plate.description 
                                    };
                                    Plates.push({ currPlate });
                            });
                            menu.push({ title: currCategory, data: Plates });
                            Plates = [];
                        });
                    });
                });
                this.setState({ data: menu });
            });
    }

    goBack() {
        Actions.restaurantDetails({ 
            title: this.props.restaurants.name, 
            restaurant: this.props.restaurants 
        });
    }

    hideDialog = () => this.setState({ visible: false, currentPlate: null });

    renderAppBar = () => {
        return (
            <Appbar.Header style={{ backgroundColor: '#08B2FF' }}>
                <Appbar.BackAction onPress={this.goBack.bind(this)} />
                <Appbar.Content title="Menu" />
                <Appbar.Action 
                    icon="local-grocery-store" 
                    onPress={() => {
                        if (this.props.order.length > 0) {
                            Actions.reservasion({ restaurant: this.props.restaurants });
                        }
                    }}
                />
            </Appbar.Header>
        );
    }

    renderMenu() {
        return this.state.data.map((item) => {
            return (
                <View>
                    <List.Accordion
                        title={item.title}
                        style={{ backgroundColor: 'white' }}
                    >
                        {this.renderSub(item.data)}
                    </List.Accordion>
                    <Divider />
                </View>
            );
        });
    }

    renderSub(data) {
        return data.map((item) => {
            const titlePlate = `${item.currPlate.name} - ${item.currPlate.price}$`;
            return (
                <View>
                <Divider />
                <List.Item 
                    title={titlePlate}
                    description={item.currPlate.description}
                    style={{ backgroundColor: 'white' }}
                    right={() => 
                        <IconButton 
                            icon="add-circle-outline" 
                            size={30} 
                            onPress={() => this.setCurrentPlate(item)} 
                        />
                    }
                    left={() => <Image source={LOGO} style={{ height: 50, width: 60 }} />}
                />
                {
                    this.state.currentPlate != null && 
                    <PlateData 
                        visible={this.state.visible} 
                        onDecline={this.hideDialog.bind(this)}
                        item={this.state.currentPlate} 
                    /> 
                }
                </View>
            );
        });
    }

    render() {
        return (
            <Provider>
                <ScrollView>
                    {this.renderAppBar()}
                    <List.Section style={{ top: -7 }}>
                        {this.renderMenu()}
                    </List.Section>
                </ScrollView>
            </Provider>
        );
    }
}

const mapStateToProps = ({ reservasion }) => {
    const { order } = reservasion;
    return { order };
};

export default connect(mapStateToProps, { })(Menu);
