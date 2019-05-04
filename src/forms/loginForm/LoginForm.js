import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import GoogleSignInButton from './google/GoogleSignInButton';
import FacebookSignInButton from './facebook/FacebookSignInButton';
import LOGO from '../../image/restabarLogo.png';

class LoginForm extends Component {

    render() {
        return (
            <View>
                <View style={styles.logo}>
                  <Image source={LOGO} />
                </View>
                <FacebookSignInButton />
                <GoogleSignInButton />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
      position: 'absolute',
      bottom: -200,
      alignItems: 'center',
      top: 20,
      marginLeft: 80
    }
});

export default LoginForm;
