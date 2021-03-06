import React from 'react';
import './App.css';
import { channels } from '../shared/constants';
import Login from './login/login.js';
import Register from './register/register.js';
import HomePage from './homepage/homepage.js';


const { ipcRenderer } = window; 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: '',
      appVersion: '',
      route: 'signin',
      signedInUserId: {}
    }


    ipcRenderer.send(channels.APP_INFO);
    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO);
      const { appName, appVersion } = arg;
      this.setState({ appName, appVersion });
    });
  }

  onRouteChange = (route) => {
    this.setState({route:route});
  }

  onUserSignIn = (id) => {
    this.setState({signedInUserId: id})
    console.log("Signed In User Id is:", this.state.signedInUserId)
  }

  render() {
    const { appName, appVersion } = this.state;
    return (
      <div className="App">
        
        {
          this.state.route === 'signin'
          ? <Login onRouteChange = {this.onRouteChange} onUserSignIn = {this.onUserSignIn}/>
          : (
            this.state.route === 'register'
            ? <Register onRouteChange = {this.onRouteChange}/>
            :(
              this.state.route === 'homepage'
              ? <HomePage signedInUserId = {this.state.signedInUserId} onRouteChange = {this.onRouteChange}/>
              : null
            )
          )
        }
      </div>
    );
  }

}

export default App;
