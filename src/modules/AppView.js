import React from 'react';

import Navigator from './navigation/RootNavigation';
import NavigationService from './navigation/NavigationService';

export default function AppView() {
  return <Navigator  ref={(navigatorRef) => {
    NavigationService.setTopLevelNavigator(navigatorRef);
  }} onNavigationStateChange={() => {}} uriPrefix="/app" />;
}
