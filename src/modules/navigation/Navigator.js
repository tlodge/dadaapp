import React from 'react';

// import AuthScreen from '../containers/AuthScreen';
import AppNavigator from './RootNavigation';

export default class NavigatorView extends React.Component{
  // if (authState.isLoggedIn || authState.hasSkippedLogin) {
  //     return <AppNavigator />;
  // }
  // return <AuthScreen />;
  render(){
    return <AppNavigator />;
  }
}
