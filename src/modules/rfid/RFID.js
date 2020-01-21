import NFC from "react-native-rfid-nfc-scanner";
import {tagTapped, tagOutOfRange} from '../devices/DevicesState';

import { store } from '../../redux/store';


export function addListener (_navigator){
  

    const {dispatch, getState} = store;
    setTimeout(()=>{
        console.log("initing NFC!!");
        NFC.initialize();
        NFC.removeAllListeners();
        //NFC.stopScan();
        console.log("done initing NFC!");

        
        NFC.addListener("listener", (tag)=>{
        
            console.log("seen result@", tag.scanned); 
            
            tagTapped(tag.scanned)(dispatch, getState);
            setTimeout(()=>addListener(_navigator),500);
        }, (err)=>{console.log("*** error:", err)});

        NFC.addRangeListener("rangelistener", ()=>{
           tagOutOfRange()(dispatch, getState);
        });
    },1000);
}

export function writeTag(towrite){
    return new Promise((resolve, reject)=>{
        NFC.writeTag(towrite);
        resolve();
    })
   
    
}


