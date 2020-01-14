import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    console.log("am in here!!");
  _navigator = navigatorRef;
  
  if (_navigator){
  setTimeout(()=>{
    console.log("and navigator is", _navigator);
    _navigator.dispatch(
        NavigationActions.navigate({
          routeName:"Devices",
          params:{},
        })
      );

  }, 5000);
}
 
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function push(routeName, params) {
  _navigator.dispatch(
    StackActions.push({
      routeName,
      params,
    })
  );
}


function pop() {
  _navigator.dispatch(
    StackActions.pop()
  );
}


function getCurrentRoute(){
  let route = _navigator.state.nav;
  while (route.routes) {
    route = route.routes[route.index];
  }
  return route;
}


export default {
  navigate,
  pop,
  push,
  setTopLevelNavigator,
  getCurrentRoute,
};