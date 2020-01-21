import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Image from 'react-native-remote-svg'
import { colors, fonts } from '../../styles';
import {writeTag} from '../rfid/RFID';

export default function DevicesScreen (props){
   
    const {devices, navigation, inRange=true} = props;
  
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        // Update the document title using the browser API
       props.fetchDevices();
      
    });

    _onSelectImage = (device, image)=>{
        props.updateDeviceImage(device.id, image);
    };
    
    _selectDevice = device => {
        
      
        if (selected.indexOf(device.macaddr) == -1){
           setSelected([...selected, device.macaddr]);
        }else{
           setSelected(selected.filter(d=>d!==device.macaddr));
        }
        /*writeTag(JSON.stringify([device.macaddr])).then(()=>{
           
            navigation.navigate({
            routeName: 'Devices',
            params:  {tag:""},
            })
            
        });*/
    }

    _tagDevices = ()=>{
        if (selected.length >= 0){
            writeTag(JSON.stringify(selected)).then(()=>{
           
                navigation.navigate({
                    routeName: 'MonitorDevices',
                    params:{devices:devices.filter(d=>selected.indexOf(d.macaddr) !== -1)},
                })
            
            });
        }
    }
    renderDeviceList = ({ item }) => {
        const isselected = selected.indexOf(item.macaddr) !== -1;
        return <TouchableOpacity onPress={() => _selectDevice(item)} style={styles.itemThreeContainer, [{paddingRight:15,backgroundColor: !isselected ? "transparent":colors.blue}]}>
            <View style={styles.itemThreeSubContainer}>
                <View key={item.id}>
                    <Image  source={{ uri: item.image }} style={styles.itemThreeImage} />
                </View>
                <View style={styles.itemThreeContent}>
                <Text style={styles.itemThreemacaddr, [{color: !isselected ?'#617ae1' : 'white' }]}>{item.macaddr}</Text>
                <View>
                    <Text style={styles.itemThreeTitle}>{item.title}</Text>
                    <Text style={styles.itemThreeSubtitle, [{color: !isselected ?'#a4a4a4' : 'white' }]} numberOfLines={1}>
                    {item.subtitle}
                    </Text>
                </View>
                <View style={styles.itemThreeMetaContainer}>
                <Text style={styles.itemThreePrice}>{item.price}</Text>
                    {item.badge && (
                    <View
                        style={[
                        styles.badge,
                        item.badge === 'NEW' && { backgroundColor: colors.green },
                        ]}
                    >
                        <Text
                        style={{ fontSize: 10, color: colors.white }}
                        styleName="bright"
                        >
                        {item.badge}
                        </Text>
                    </View>
                    )}
                   
                </View>
                </View>
            </View>
            <View style={styles.itemThreeHr} />
        </TouchableOpacity>
    };

    console.log("selected  is", selected)
    const tagtext = selected.length > 1 ?  `tag ${selected.length} selected devices`: `tag selected device`;

        return (
      <View style={styles.container}>
          <View style={styles.title}>
                 <Text style={styles.info}>Select the devices you'd like to link to the tag.</Text>
         </View>
        <FlatList
          style={{ backgroundColor: colors.bluish}}
          data={devices}
          renderItem={renderDeviceList}
        />
        {selected.length > 0 && inRange && <TouchableOpacity onPress={_tagDevices} style={styles.tagbutton}><Text style={styles.tagbuttontext}>{tagtext}</Text></TouchableOpacity>}
      </View>
    );
        
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  tagbutton:{
    height:60,
    width: "100%",
    backgroundColor: colors.secondary,
    justifyContent:"center",
    alignItems:"center",
  },
  tagbuttontext:{
    color: "white",
},
  title:{
    height: 60,
    width: "100%",
    backgroundColor: colors.black,
   
    justifyContent:"center",
    alignItems:"center",
  },
  info:{
    color: colors.white,
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 100,
    width: 100,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreemacaddr: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
   
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#a4a4a4',
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
