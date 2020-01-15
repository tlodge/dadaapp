import NFC from "react-native-rfid-nfc-scanner";
import { NavigationActions } from 'react-navigation';



export function addListener (_navigator){
    console.log("initing NFC!!");
  
    NFC.initialize();
    
    NFC.addListener("listener", (tag)=>{
      
        console.log("seen result@", tag.scanned); 
      
       
        NFC.removeAllListeners();
        NFC.stopScan();
        if (_navigator){
            _navigator.dispatch(
                NavigationActions.navigate({
                routeName:"TagDevices"
            }));
        }
        
        setTimeout(()=>addListener(_navigator),2000);
    }, (err)=>{console.log("error:", err)});
}

export function writeTag(towrite){
    return new Promise((resolve, reject)=>{
        NFC.writeTag(towrite);
        resolve();
    })
   
    
}


