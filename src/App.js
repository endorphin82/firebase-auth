import React, {Component, Fragment} from 'react';

import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp({
  apiKey: "AIzaSyCCv7OrYG7M7_s6jGmlZF-VyX64RqmkXDE",
  authDomain: "fir-auth-818d1.firebaseapp.com"
  // ,
  // databaseURL: "https://fir-auth-818d1.firebaseio.com",
  // projectId: "fir-auth-818d1",
  // storageBucket: "fir-auth-818d1.appspot.com",
  // messagingSenderId: "786458628361"
});

class App extends Component {
  state = {isSignedIn: false};
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };


  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn: !!user})
      console.log("user", user);
    });

  }


  render() {
    return (
      <div className="App">
        {
          this.state.isSignedIn
            ? (
                <Fragment>
                  <p> Signed In ! </p>
                  <button
                    onClick={ () => firebase.auth().signOut() }> Sign Out!
                  </button>
                  <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                  <img
                    src={firebase.auth().currentUser.photoURL}
                    alt={firebase.auth().currentUser.displayName}
                  />
                </Fragment>
              )
            :
             (
               <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
             )
        }
      </div>
    );
  }
}

export default App;
