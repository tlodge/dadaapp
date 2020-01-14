import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';

import { fonts, colors } from '../../styles';
import SignatureCapture from 'react-native-signature-capture';
import {get, post} from '../../utils/net';
let _signatureView;

const API_ENDPOINT = 'https://inputtools.google.com/request?ime=handwriting&app=autodraw&dbg=1&cs=1&oe=UTF-8';
const SVG_ENDPOINT = 'https://storage.googleapis.com/artlab-public.appspot.com/stencils/selman/'

//const STENCILS_ENDPOINT = 'src/data/stencils.json';

export default function  SketchScreen(props){
    
    const _onSaveEvent =(result)=>{
       
         console.log(result.encoded);
        
    }

  
    const getResults =(data)=>{
        var regex = /SCORESINKS: (.*) Service_Recognize:/
        return JSON.parse(data[1][0][3].debug_info.match(regex)[1])
    }
      
    const _onDragEvent = (event)=>{
       console.log("finished dragging!!", event.points);  
       const timestamp = Date.now();
       //const shapes =  [[[1.45,2.45,3.4],[66.90,100.1,82.2],[]]];

       const shapes = event.points.trim().split(" ").reduce((acc, item)=>{
            const points = item.split(",");
            return [
                [...acc[0], Number(points[0])],
                [...acc[1], Number(points[1])],
                []
            ]
       },[[],[],[]]);

       const {height, width} = Dimensions.get("window");

       const payload = {
           input_type:0,
           requests:[
               {
                    language:"autodraw",
                    writing_guide:{
                       width:width,
                       height:height
                    },
                    ink:[shapes]
                }
            ]
        }

       post(API_ENDPOINT,payload).then((data)=>{
         
       
          
       
          if (data[0] !== 'SUCCESS') {
            throw new Error(data)
          }

        
          var results = getResults(data);
          
          const pictures = results.map(function (result) {
            var escapedName = result[0].replace(/ /g, '-')
            return {
              name: result[0],
              confidence: result[1],
              url: SVG_ENDPOINT + escapedName + '-01.svg',
              url_variant_1: SVG_ENDPOINT + escapedName + '-02.svg',
              url_variant_2: SVG_ENDPOINT + escapedName + '-03.svg'
            }
          });

          //console.log(pictures);
          console.log("getting", pictures[0].url);
          
          get(pictures[0].url).then((svg)=>{
            console.log(svg);
          });
        })
       //_signatureView.saySomething("shjshs");
    }
    
    const saveSign = ()=>{
        _signatureView.saveImage();
    }

    const resetSign = ()=>{
        _signatureView.resetImage();
    }

    const renderControls = ()=>{
        return <View style={{ flex: 0, flexDirection: "row" }}>
        <TouchableHighlight style={styles.buttonStyle} onPress={saveSign} > 
                    <Text>Save</Text> 
            </TouchableHighlight> 
        <TouchableHighlight style={styles.buttonStyle} onPress={resetSign} > 
            <Text>Reset</Text>
        </TouchableHighlight>
    </View>
    }
  
    const {height} = Dimensions.get("window");
    return (<View> 
                <View style={{width:"100%", height:height-50}}>
                    <SignatureCapture
                    style={[{ flex: 1 }, styles.signature]}
                    ref={r=>_signatureView=r}
                    onSaveEvent={_onSaveEvent}
                    onDragEvent={_onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"} />
                    {renderControls()}
                </View>
            </View>
        );
        
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: 'space-around',
  },
  nerdImage: {
    width: 80,
    height: 80,
  },
  availableText: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 40,
    marginVertical: 3,
  },
  textContainer: {
    alignItems: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
},
buttonStyle: {
    flex: 1, justifyContent: "center", alignItems: "center", height: 50,
    backgroundColor: "white",
    margin: 10
}
});
