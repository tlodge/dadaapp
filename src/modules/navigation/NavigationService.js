import { NavigationActions, StackActions } from 'react-navigation';
import {addListener} from '../rfid/RFID';


let _navigator;

function setTopLevelNavigator(navigatorRef) {

   _navigator = navigatorRef;
  
  if (_navigator){
    addListener(_navigator); 
  }
}


function navigate(routeName, params) {
  if (_navigator){
    _navigator.dispatch(
        NavigationActions.navigate({
        routeName,
        params,
        })
    );
  }else{
      console.log("NOT NAVIGATING as NAVIGATOR IS NULL");
  }

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

   
    if (_navigator){
        try{        
            const routes = _navigator.state.nav;
            return routes.routes[routes.index].routeName;
        }catch(err){
        }
    }
    return "";
}


export default {
  navigate,
  pop,
  push,
  setTopLevelNavigator,
  getCurrentRoute,
};