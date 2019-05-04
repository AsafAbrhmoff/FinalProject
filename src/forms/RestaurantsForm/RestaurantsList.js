import _ from 'lodash';
import React, { Component } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Searchbar, Appbar, Provider } from 'react-native-paper';
import { restaurantsFetch } from '../../actions';
import ListItem from '../RestaurantsForm/ListItem';
import ExpandMenu from '../../components/ExpandMenu';

class RestaurantsList extends Component {
    state = {
        fullData: [],
        refreshing: false,
        query: '',
        data: [],
        isVisible: false,
        expandVisible: false
    }

    componentWillMount() {
        this.fetchRestaurants();
    }

    fetchRestaurants() {
        const restaurants = [];
        firebase.database().ref('restaurants')
            .once('value')
            .then(snapshot => {
                _.forEach(snapshot.val(), (uid) => {
                    _.forEach(uid, (details) => {
                            restaurants.push(details);
                    });
                });
                this.setState({ fullData: restaurants, refreshing: false, data: restaurants });
            });
    }

    handleRefresh = () => {
        this.setState(
            {
                refreshing: true,
                isVisible: false,
            },
            () => { 
                this.fetchRestaurants();
                this.filterBySearch('');
            }
        );
    };

    handleSearch = text => {
        const formatQuery = text.toLowerCase();
        this.filterBySearch(formatQuery);
    };

    filterBySearch(formatQuery) {
        const data = _.filter(this.state.fullData, (uid) => {
            return this.containsQuery(uid, formatQuery);
        });
        this.setState({ query: formatQuery, data });
    }

    containsQuery = (uid, query) => {
        if (uid.name.toLowerCase().includes(query)) {
            return true;
        }

        return false;
    };

    openMenu = () => this.setState({ expandVisible: true });

    closeMenu = () => this.setState({ expandVisible: false });

    renderSeparator = () => {
        return (
            <View  
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%'
                }}
            />
        );
    };

    renderSearchBar = () => {
        if (this.state.isVisible) {
            return ( 
                <Searchbar
                    placeholder="Search"
                    onChangeText={this.handleSearch}
                    value={this.state.query}
                    style={{ visibility: 'hidden', top: -17 }}
                />
            );
        }
    }

    renderAppBar = () => {
        return (
            <Appbar.Header style={{ backgroundColor: '#08B2FF' }}>
                <Appbar.Action 
                    icon="dehaze"
                    onPress={this.openMenu.bind(this)}
                />
                <Appbar.Content title="Restaurants" />
                <Appbar.Action 
                    icon="search" 
                    onPress={
                        () => {
                            if (this.state.isVisible) {
                                this.setState({ isVisible: false });
                                this.filterBySearch('');
                            } else {
                                this.setState({ isVisible: true });
                            }
                        } 
                    }
                />
            </Appbar.Header>
        );
    }

    render() {
        return (
            <Provider>
                <ScrollView>
                    {this.renderAppBar()}
                    <ExpandMenu 
                        visible={this.state.expandVisible} 
                        closeMenu={this.closeMenu.bind(this)} 
                    />
                    {this.renderSearchBar()}
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) =>
                            <ListItem restaurant={{ item }} />
                        }
                        keyExtractor={item => item.email}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                        ItemSeparatorComponent={this.renderSeparator}
                        style={{ top: -17 }}
                    />
                </ScrollView>
            </Provider>
        );
    }
}

const mapStateToProps = state => {
    const restaurants = _.map(state.restaurants, (val, uid) => {
        return { ...val, uid };
    });

    return { restaurants };
};

export default connect(mapStateToProps, { restaurantsFetch })(RestaurantsList);
