import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Image from 'react-native-remote-svg'
import { colors, fonts } from '../../styles';
import {writeTag} from '../rfid/RFID';

export default function DeviceScreen (props){
   
    const {navigation} = props;
   
    useEffect(() => {
      console.log("OK IN DEVICE SCREEN WITH TAGGED DEVICES", );

    });


    const _deTag = ()=>{
      writeTag("").then(()=>{  
        navigation.navigate({
            routeName: 'TagDevices',
        })
      });
    }
  
    const devices = props.navigation.getParam("devices") || [];

    const dim = devices.length > 1 ? 175: 350;
    const imgdim = devices.length > 1 ? 150: 300;

    const items = devices.map((device)=>{
      return <View style={{ width: dim, height:dim,backgroundColor:"#efefef", borderColor: "black", borderWidth:6, borderRadius: 175,margin:10}}>
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                  <Image  source={{ uri: device.image }} style={{height: imgdim, width: imgdim}} />
                </View>
              </View>
    })
    

    return (<View style={{flex:1}}>
      <TouchableOpacity onPress={_deTag} style={styles.detag}><Text style={{color:"white"}}>unlink from tag</Text>
              </TouchableOpacity>
              <ScrollView style={{flex:1}} contentContainerStyle={{justifyContent:"center", alignItems:"center"}}>
              
              <View style={styles.container}>
                 {items}
              </View>
            </ScrollView>
            </View>);
  
}

const styles = StyleSheet.create({
  

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  detag:{
    flex:0,
    width: "100%",
    height: 60,
    backgroundColor: colors.secondary,
    justifyContent:"center",
    alignItems:"center"
  }


});
