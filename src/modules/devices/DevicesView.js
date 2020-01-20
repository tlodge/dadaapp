import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Image from 'react-native-remote-svg'
import { colors, fonts } from '../../styles';

export default function DevicesScreen (props){
   
    const {devices, navigation} = props;


    useEffect(() => {
        // Update the document title using the browser API
       props.fetchDevices();
      
    });

    _onSelectImage = (device, image)=>{
        props.updateDeviceImage(device.id, image);
    };
    
    _sketchDevice = device =>{
        
        navigation.navigate({
            routeName: 'Sketch',
            params: { ...device, onSelectImage:(image)=>_onSelectImage(device,image) },
        });
       
    }

    _monitorDevice = device => navigation.navigate({
        routeName: 'MonitorDevices',
        params: { devices:[device] },
    });

    renderDeviceList = ({ item }) => (
        <View style={styles.itemThreeContainer, [{backgroundColor:"transparent"}]}>
             
            <View style={styles.itemThreeSubContainer}>
                <TouchableOpacity onPress={() => _sketchDevice(item)} key={item.id}>
                    <Image  source={{ uri: item.image }} style={styles.itemThreeImage} />
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => _monitorDevice(item)} style={styles.itemThreeContent}>
                <Text style={styles.itemThreemacaddr}>{item.macaddr}</Text>
                <View>
                    <Text style={styles.itemThreeTitle}>{item.title}</Text>
                    <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
                    {item.subtitle}
                    </Text>
                </View>
                <View style={styles.itemThreeMetaContainer}>
                <Text style={styles.itemThreePrice}>{item.price}</Text>
                    {item.status && item.status.length>0 && (
                    <View
                        style={[
                        styles.status,
                        item.status.indexOf('NEW') !== -1 && { backgroundColor: colors.green },
                        ]}
                    >
                        <Text
                        style={{ fontSize: 10, color: colors.white }}
                        styleName="bright"
                        >
                        {item.status.join(",")}
                        </Text>
                    </View>
                    )}
                   
                </View>
                </TouchableOpacity>
            </View>
            <View style={styles.itemThreeHr} />
        </View>
     );

        return (
      <View style={styles.container}>
        
        <FlatList
          style={{ backgroundColor: colors.white, paddingHorizontal: 15 }}
          data={devices.map(d=>{
            if (d.status.length > 0){
                return {...d, image: d.image.replace(".st0{fill:#fff}",".st0{fill:#FF0075}")}
            }
            return d;
          })}
          renderItem={renderDeviceList}
        />
      </View>
    );
        
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    color: '#617ae1',
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
  status: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
