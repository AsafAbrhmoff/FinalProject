import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { restaurantsFetch } from '../../actions';
import ListItem from './ListItem';

class RestaurantsList extends Component {
    componentWillMount() {
        this.props.restaurantsFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ restaurants }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(restaurants);
    }

    renderRow(restaurant) {
        return <ListItem restaurant={restaurant} />;
    }

    render() {
        console.log(this.props);
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
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
