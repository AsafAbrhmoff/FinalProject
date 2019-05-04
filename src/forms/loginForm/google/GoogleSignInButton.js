import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import firebase from 'firebase';
import { gmailLoginSuccess, gmailLogoutSuccess } from '../../../actions';

class GoogleSignInButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userInfo: '',
          isLoggedIn: false,
        };
    }

    componentDidMount() {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId:
          '903851098197-0jagq02ctqevvd7p31ncdblu3ajs64nq.apps.googleusercontent.com',
      });
    }

    signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userData = await GoogleSignin.signIn()
            .then((user) => { this.loginWithGoogle(user); });
          this.setState({ userInfo: userData });
          this.setState({ isLoggedIn: true });
        } catch (error) {
          console.log('Message', error);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User Cancelled the Login Flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Signing In');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play Services Not Available or Outdated');
          } else {
            console.log('Some Other Error Happened');
          }
        }
      };
    
      loginWithGoogle = (user) => {
        const cred = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);   
        firebase.auth().signInAndRetrieveDataWithCredential(cred);
        this.props.gmailLoginSuccess(user);
      };
    
      _getCurrentUser = async () => {
        try {
          await GoogleSignin.signInSilently();
          console.log('signInSilently');
        } catch (error) {
          console.error(error);
        }
      };
    
      signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.props.gmailLogoutSuccess(null);
          console.log('logout');
          this.setState({ isLoggedIn: false });
        } catch (error) {
          console.error(error);
        }
      };
    
      _revokeAccess = async () => {
        try {
          await GoogleSignin.revokeAccess();
          console.log('deleted');
        } catch (error) {
          console.error(error);
        }
      };
    
      signInOrOut = async () => {
          this.state.isLoggedIn ? this.signOut() : this.signIn();
      };
    
      render() {
        return (
          <View style={styles.buttonContainerStyle}>
             <GoogleSigninButton
                style={{ width: 312, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this.signInOrOut}
             />
          </View>
        );
    }
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -420,
    marginLeft: 25
  }
});

const mapStateToProps = ({ auth }) => {
  const { gmailUser, facebookUser } = auth;
  return { gmailUser, facebookUser };
};

export default connect(
  mapStateToProps, 
  { 
    gmailLoginSuccess,
     gmailLogoutSuccess
})(GoogleSignInButton);
