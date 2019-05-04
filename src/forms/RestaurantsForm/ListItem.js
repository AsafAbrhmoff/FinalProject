import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import CardSection from '../../components/common/CardSection';

class ListItem extends Component {
    onRowPress() {
        const { item } = this.props.restaurant;
        Actions.restaurantDetails({ title: item.name, restaurant: item });
    }

    render() {
        const { item } = this.props.restaurant;
        console.log(item.uid);
        return (
            <View>
                <CardSection>
                    <Avatar.Image 
                        size={40}
                        source={{ uri: item.logo }}
                        style={{ backgroundColor: 'transparent' }} 
                    />
                    <View>
                        <Text style={styles.titleStyle}>
                            {item.name}
                        </Text>
                        <Text style={{ fontSize: 12, paddingLeft: 13 }}> Open Now </Text>
                    </View>
                    <IconButton 
                        icon="chevron-right" 
                        style={{ position: 'absolute', left: 300, top: 2, bottom: 5 }} 
                        size={40} 
                        onPress={this.onRowPress.bind(this)} 
                    />
                </CardSection>
            </View>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 20,
        paddingLeft: 15,
        color: 'black'
    }
};

export default ListItem;
