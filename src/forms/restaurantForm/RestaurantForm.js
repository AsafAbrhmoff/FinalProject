import React, { Component } from 'react';
import { ScrollView, View, Image, Linking } from 'react-native';
import { Title, Subheading, Paragraph, Button, Divider } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { Rating } from 'react-native-ratings';
import Communications from 'react-native-communications';
import AppBar from '../../components/AppBar';
import HorizontalList from '../../components/HorizontalList';

class RestaurantForm extends Component {
    onOrderPress() {
        const { restaurant } = this.props;
        Actions.menu({ restaurants: restaurant });
    }

    goBack() {
        Actions.restaurantsList();
    }

    ratingCompleted(rating) {
        console.log('Rating is: ', rating);
    }

    render() { 
        const { headingStyle, titleStyle, logoStyle, websiteStyle, buttonStyle } = styles;
        const { restaurant } = this.props;

        return (
            <ScrollView>
                <AppBar  
                    Title={restaurant.name} 
                    goBack={this.goBack.bind(this)} 
                />
                <View>
                    <Image source={{ uri: restaurant.logo }} style={logoStyle} />
                    <Title style={titleStyle}>{restaurant.name}</Title>
                    <Subheading style={headingStyle}>Description:</Subheading> 
                    <Paragraph style={headingStyle}>
                        {restaurant.description}
                    </Paragraph>
                    <Button 
                        mode="contained" 
                        onPress={() => Linking.openURL(restaurant.website)} 
                        style={websiteStyle}
                    >
                        See our website
                    </Button>
                </View>
                <Title style={titleStyle}>Contact us</Title>
                <Subheading style={headingStyle}>
                    Phone: {restaurant.phone}
                </Subheading>
                <Subheading style={headingStyle}>
                    Location: {restaurant.address}
                </Subheading>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Button 
                        icon="call"
                        mode="contained" 
                        onPress={() => Communications.phonecall(restaurant.phone.toString(), true)}
                        style={buttonStyle} 
                    >
                        Call us
                    </Button>
                    <Divider style={{ backgroundColor: 'black' }} />
                    <Button 
                        mode="contained" 
                        onPress={() => console.log('table')}
                        style={buttonStyle} 
                    >
                        Choose Table
                    </Button>
                    <Button 
                        mode="contained" 
                        onPress={this.onOrderPress.bind(this)}
                        style={buttonStyle} 
                    >
                        Make an TakeAway order
                    </Button>
                </View>
                <Rating
                    showRating
                    onFinishRating={this.ratingCompleted}
                    style={{ paddingVertical: 10, top: 15 }}
                />
                <View style={{ top: 15 }} >
                    <HorizontalList />
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,
        paddingTop: 10
    },
    logoStyle: {
        resizeMode: 'stretch',
        top: 15,
        left: 220,
        height: 80,
        width: 100,
        position: 'absolute'
    },
    websiteStyle: {
        backgroundColor: '#08B2FF',
        width: 170,
        fontSize: 8,
        position: 'absolute',
        top: 110,
        left: 180
    },
    headingStyle: {
        paddingLeft: 15
    },
    buttonStyle: {
        marginTop: 15,
        width: 300,
        backgroundColor: '#08B2FF'
    }
};

export default RestaurantForm;
