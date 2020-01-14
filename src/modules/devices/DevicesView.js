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
    navigationOptions = {
        title: 'Details',
    };
    
    const {devices} = props;

    useEffect(() => {
        // Update the document title using the browser API
       props.fetchDevices();
    });

    _onSelectImage = (device, image)=>{
        props.updateDeviceImage(device.id, image);
    };
    
    _sketchDevice = device =>{
        console.log("in sketch device", device);
        props.navigation.navigate({
            routeName: 'Sketch',
            params: { ...device, onSelectImage:(image)=>_onSelectImage(device,image) },
        });
    }

    renderDeviceList = ({ item }) => (
        <View style={styles.itemThreeContainer}>
            <View style={styles.itemThreeSubContainer}>
                <TouchableOpacity onPress={() => _sketchDevice(item)} key={item.id}>
                    <Image  source={{ uri: item.image }} style={styles.itemThreeImage} />
                </TouchableOpacity>
                <View style={styles.itemThreeContent}>
                <Text style={styles.itemThreemacaddr}>{item.macaddr}</Text>
                <View>
                    <Text style={styles.itemThreeTitle}>{item.title}</Text>
                    <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
                    {item.subtitle}
                    </Text>
                </View>
                <View style={styles.itemThreeMetaContainer}>
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
                    <Text style={styles.itemThreePrice}>{item.price}</Text>
                </View>
                </View>
            </View>
            <View style={styles.itemThreeHr} />
        </View>
  );

 
 

   
  

       
  
    
        return (
      <View style={styles.container}>
        <FlatList
          style={{ backgroundColor: colors.white, paddingHorizontal: 15 }}
          data={devices}
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
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
