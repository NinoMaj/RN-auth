import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

const styles = {
  appContainerStyle: {
    flex: 1,
  },
  spinnerContainerStyle: {
    flex: 1,
  },
};

class App extends Component {
  constructor() {
    super();

    this.state = { loggedIn: null };
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBB9dQ8Y25Ls5yxKEx4sCtI3GmBcR271Kk',
      authDomain: 'auth-a5195.firebaseapp.com',
      databaseURL: 'https://auth-a5195.firebaseio.com',
      projectId: 'auth-a5195',
      storageBucket: 'auth-a5195.appspot.com',
      messagingSenderId: '1058906495103',
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.spinnerContainerStyle}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View style={styles.appContainerStyle}>
        <Header headerText={'Authentication'} />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
