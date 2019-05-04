import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import CardSection from '../../components/common/CardSection';
//import Card from '../../components/common/Card';

class Listitem extends Component {
    componentWillMount() {
        const { item } = this.props.item;
        console.log(item);
    }
    render() {
        return (
            <View>
                <CardSection>
                    <Text style={styles.titleStyle}>{this.props.item.name}</Text>
                    <IconButton 
                        icon="add-circle-outline" 
                        style={{ position: 'absolute', left: 300, paddingTop: 4, paddingBottom: 15 }} 
                        size={30} 
                        onPress={() => console.log('')} 
                    />
                </CardSection>
                </View>
        );
    }
}
const styles = {
    titleStyle: {
        fontSize: 20,
        color: 'black'
    }
};

export default Listitem;
