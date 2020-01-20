import NFC from "react-native-rfid-nfc-scanner";
import { NavigationActions } from 'react-navigation';
import {tagTapped} from '../devices/DevicesState';

import { store } from '../../redux/store';


export function addListener (_navigator){
    console.log("initing NFC!!");

    const {dispatch, getState} = store;
    setTimeout(()=>{
        NFC.initialize();
        
        NFC.addListener("listener", (tag)=>{
        
            console.log("seen result@", tag.scanned); 
            NFC.removeAllListeners();
            NFC.stopScan();
            tagTapped(tag.scanned)(dispatch, getState);
            setTimeout(()=>addListener(_navigator),500);
        }, (err)=>{console.log("error:", err)});
    },1000);
}

export function writeTag(towrite){
    return new Promise((resolve, reject)=>{
        NFC.writeTag(towrite);
        resolve();
    })
   
    
}


