import React, { Component } from 'react';
import firebase from 'firebase';
import md5 from 'md5';
import Button from '../../components/common/Button';
import CardSection from '../../components/common/CardSection';
import Card from '../../components/common/Card';

class MainForm extends Component {
    onButtonPress() {
    const { currentUser } = firebase.auth();
    const namse = 'Petra';
    const phone = 4589786;
    const email = 'petra@petra.com';
    const website = 'http://www.burgus.co.il';
    const address = 'bbb 4, tel aviv';
    const logo = 'https://i.ibb.co/hfs2zSh/602.png';
    const description = `asdasd
asdasd
dfdsfg
zsdfsdf`;
    console.log(currentUser);
    console.log(namse);
    console.log(phone);
    console.log(email);
    console.log(website);
    console.log(address);

    let plate = { name: 'pie', price: 15, description: 'yum' };
    let plate1 = { name: 'kish', price: 20, description: 'bbb' };
    let plates = [];
    plates.push(plate, plate1);
    const category1 = { 
        Name: 'desert', 
        Plates: plates
    };
     plate = { name: 'aa', price: 15, description: 'yum' };
     plate1 = { name: 'dd', price: 20, description: 'bbb' };
     plates = [];
    plates.push(plate, plate1);
    
    const category2 = { 
        Name: 'main', 
        Plates: plates
    };

    const menu = [];
    menu.push(category1);
    menu.push(category2);
    const a = md5(email);
        firebase.database().ref(`/reser/${a}`)
            .push({ menu })
            .catch(error => console.log(error));
        console.log('success');
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        aaaaa
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default MainForm;
