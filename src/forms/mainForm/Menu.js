import React, { Component } from 'react';
import { ScrollView, SectionList, Text, View } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import md5 from 'md5';
import _ from 'lodash';
import CardSection from '../../components/common/CardSection';
import Confirm from '../../components/common/Confirm';
import MenuItem from './MenuItem';

class Menu extends Component {
    state = {
        visible: false,
        data: []
    }

    componentWillMount() {
        const email = this.props.restaurants.email;
        this.fetchMenu(email);
    }

    goBack() {
        Actions.restaurantDetails({ 
            title: this.props.restaurants.name, 
            restaurant: this.props.restaurants 
        });
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

    showDialog = () => this.setState({ visible: true });

    hideDialog = () => this.setState({ visible: false });

    renderAppBar = () => {
        return (
            <Appbar.Header style={{ backgroundColor: '#08B2FF' }}>
                <Appbar.BackAction
                    onPress={this.goBack.bind(this)}
                />
                <Appbar.Content
                    title="Menu"
                />
                <Appbar.Action 
                    icon="local-grocery-store" 
                    onPress={
                        () => console.log('s')
                    }
                />
            </Appbar.Header>
        );
    }

    render() {
        return (
            <ScrollView>
                {this.renderAppBar()}
            <SectionList
                sections={this.state.data}
                renderItem={({ item }) =>
                <MenuItem item={item} />
                }
                renderSectionHeader={({ section }) => 
                    <CardSection>
                        <Text style={styles.headerStyle}>{section.title}</Text>
                    </CardSection>
                }
                keyExtractor={(item, index) => item.currPlate.name + index}
            />
            </ScrollView>
        );
    }
}

const styles = {
    plateStyle: {
        fontSize: 20,
        color: 'black'
    },
    headerStyle: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold'
    },
    addIconStyle: {
        position: 'absolute', 
        left: 300, 
        paddingTop: 4, 
        paddingBottom: 15
    }
};

export default Menu;
