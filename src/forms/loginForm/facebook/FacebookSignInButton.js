import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { facebookLoginSuccess, facebookLogoutSuccess } from '../../../actions';

class FacebookSignInButton extends Component {
  responseInfoCallback = (error, result) => {
    if (error) {
      console.log(error.toString());
    } else {
      this.props.facebookLoginSuccess(result);
    }
  }

  render() {
    return (
      <View style={styles.buttonContainerStyle}>
        <LoginButton
          readPermissions={['public_profile', 'email']}
          style={{ width: 306, height: 48 }}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log(result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    const cred = firebase.auth.FacebookAuthProvider.credential(
                      data.accessToken.toString()
                    );
                    firebase.auth().signInAndRetrieveDataWithCredential(cred);
                    const infoRequest = new GraphRequest(
                      '/me?fields=name,email',
                      null,
                      this.responseInfoCallback
                    );
                    new GraphRequestManager().addRequest(infoRequest).start();
                  }
                );
              }
            }
          }
          onLogoutFinished={() => {
            this.props.facebookLogoutSuccess(null);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    bottom: -380,
    marginLeft: 28
  }
});

const mapStateToProps = ({ auth }) => {
  const { gmailUser, facebookUser } = auth;
  return { gmailUser, facebookUser };
};

export default connect(
  mapStateToProps,
  {
    facebookLoginSuccess,
    facebookLogoutSuccess
  })(FacebookSignInButton);

