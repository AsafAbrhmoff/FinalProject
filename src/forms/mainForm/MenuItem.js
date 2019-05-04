import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
//import { Actions } from 'react-native-router-flux';
import CardSection from '../../components/common/CardSection';
import Confirm from '../../components/common/Confirms';

class MenuItem extends Component {
    state = {
        visible: false,
    };

    onAccept() {
        this.setState({ visible: false });
    }
   
    showDialog = () => this.setState({ visible: true });
    
    hideDialog = () => this.setState({ visible: false });

    render() {
        const item = this.props.item;
        return (
            <View>
                <CardSection>
                    <Text style={styles.plateStyle}>{item.currPlate.name}</Text>
                    <IconButton 
                        icon="add-circle-outline" 
                        style={styles.addIconStyle} 
                        size={30} 
                        onPress={this.showDialog} 
                    />
                </CardSection>
                <Confirm
                    visible={this.state.visible}
                    onAccept={this.showDialog.bind(this)}
                    onDecline={this.hideDialog.bind(this)}
                    item={item}
                />
            </View>
        );
    }
}

const styles = {
    addIconStyle: {
        position: 'absolute', 
        left: 300, 
        paddingTop: 4, 
        paddingBottom: 15
    },
    plateStyle: {
        fontSize: 20,
        color: 'black'
    }
};

export default MenuItem;
