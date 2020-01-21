import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Image from 'react-native-remote-svg'
import { colors, fonts } from '../../styles';
import {writeTag} from '../rfid/RFID';
const MARGIN = 20;
export default function DeviceScreen (props){
   
    const {navigation, inRange=true} = props;
   

    const _deTag = ()=>{
      writeTag("").then(()=>{  
        navigation.navigate({
            routeName: 'TagDevices',
        })
      });
    }
   
    const devices = props.navigation.getParam("devices") || [];
    const {width, height} = Dimensions.get("window");
    console.log("width",width);
    const radius = Math.max(Math.floor((height-80))/devices.length - ((devices.length+1)*MARGIN), 200)
    const dim = devices.length > 1 ? radius : 350;
    const imgdim = devices.length > 1 ? radius-50: 300;

    const items = devices.map((device)=>{
      return <View style={{ width: dim, height:dim,backgroundColor:"#efefef", borderColor: "black", borderWidth:6, borderRadius: 175,margin:10}}>
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                  <Image  source={{ uri: device.image }} style={{height: imgdim, width: imgdim}} />
                </View>
              </View>
    })
    

    return (<View style={{flex:1}}>
              {inRange && <TouchableOpacity onPress={_deTag} style={styles.detag}><Text style={{color:"white"}}>unlink from tag</Text>
              </TouchableOpacity>}
             
                <ScrollView contentContainerStyle={{ flex:0, justifyContent:"center", flexDirection:"row", flexWrap:"wrap"}}>
                  <View style={styles.container}>
                     {items}
                  </View>
              
            </ScrollView>
            </View>);
  
}

const styles = StyleSheet.create({
  

  container:{
    flex: 0,
    width:30,
    margin:MARGIN,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row", flexWrap:"wrap"
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
