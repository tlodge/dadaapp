import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

export default function HomeScreen({ isExtended, setIsExtended }) {
  // const rnsUrl = 'https://reactnativestarter.com';
  // const handleClick = () => {
  //   Linking.canOpenURL(rnsUrl).then(supported => {
  //     if (supported) {
  //       Linking.openURL(rnsUrl);
  //     } else {
  //       console.log(`Don't know how to open URI: ${rnsUrl}`);
  //     }
  //   });
  // };

  return (
    <View style={styles.container}>
       <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.section}>
        
        <Text size={30} bold white style={styles.title}>
            Everything is ok
          </Text>
        </View>

      </ImageBackground>
    </View>
  );
}

/*

      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.section}>
          <Text size={20} white>
            Home Network Overview
          </Text>
        </View>
        <View style={styles.section}>
          <Text color="#19e7f7" size={15}>
            
          </Text>
          <Text size={30} bold white style={styles.title}>
            Everything ok 
          </Text>
        </View>
      </ImageBackground>
    </View>*/

const {width, height} = Dimensions.get("screen");

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "pink",
    alignItems: 'center',
    justifyContent: 'space-around',
  },
 
  bgImage: {
    flex: 1,
    flexGrow: 1
    //marginHorizontal: -20,
  },
  section: {
    flex: 1,
    flexGrow:1,
    width: width,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
});
