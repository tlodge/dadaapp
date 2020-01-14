import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableHighlight,
  Text,
  ScrollView

} from 'react-native';

import { fonts, colors } from '../../styles';
import SignatureCapture from 'react-native-signature-capture';
import {get, post} from '../../utils/net';
import Image from 'react-native-remote-svg'
import { TouchableOpacity } from 'react-native-gesture-handler';


let _signatureView;

const API_ENDPOINT = 'https://inputtools.google.com/request?ime=handwriting&app=autodraw&dbg=1&cs=1&oe=UTF-8';
const SVG_ENDPOINT = 'https://storage.googleapis.com/artlab-public.appspot.com/stencils/selman/'

//const STENCILS_ENDPOINT = 'src/data/stencils.json';

export default function  SketchScreen(props){
    

    const [suggestions, setSuggestions] = useState([]);
    const [chosen, setChosen] = useState();

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
       let pictures = [];

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

       post(API_ENDPOINT,payload).then(async (data)=>{
         
       
          
       
          if (data[0] !== 'SUCCESS') {
            throw new Error(data)
          }

          var results = getResults(data);

          for (const result of results){

            const  escapedName = result[0].replace(/ /g, '-');
            try{            
                const svg1 = await get(SVG_ENDPOINT + escapedName + '-01.svg');
                pictures = [...pictures, `data:image/svg+xml;utf8,${svg1}`];
                setSuggestions(pictures);
               
            }catch(err){

            }
          }
        })
    }
    
    const saveSign = ()=>{
        
        //_signatureView.saveImage();
    }

    const resetSign = ()=>{
        setSuggestions([]);
        setChosen(null);
        try{
        _signatureView.resetImage();
        }catch(err){

        }
    }

    const renderSignatureControls = ()=>{
        return <View style={{ flex: 0, flexDirection: "row" }}>
       
        <TouchableHighlight style={styles.buttonStyle} onPress={resetSign} > 
            <Text>Clear</Text>
        </TouchableHighlight>
    </View>
    }
    const renderImageControls = ()=>{

        
        const {navigation}=props;
       
        const onSelectImage = navigation.getParam("onSelectImage");
        
    
        return <View style={{ flex: 0, flexDirection: "row" }}>
        <TouchableHighlight style={styles.buttonStyle}  onPress={()=>{onSelectImage(chosen);navigation.goBack()}}> 
                <Text>Use this!</Text> 
        </TouchableHighlight> 
        <TouchableHighlight style={styles.buttonStyle} onPress={resetSign} > 
            <Text>Clear</Text>
        </TouchableHighlight>
    </View>
    }
  
    const {height, width} = Dimensions.get("window");

    const images = suggestions.map((svg)=>{
        return <TouchableHighlight onPress={()=>setChosen(svg)} style={{flex:0, width:60, height:100}}>
            <Image  source={{uri:svg}} style={{ width: "100%",height:100}}/>
        </TouchableHighlight>
    });

    return (<View> 
                <ScrollView horizontal={true} vertical={false} style={{height:100,backgroundColor:"#efefef"}}>
                    <View style={{flexDirection:"row"}}>
                     {images}
                    </View>
                </ScrollView>
                {!chosen && <View style={{width:"100%", height:height-150}}>
                    <SignatureCapture
                    style={[{ flex: 1 }, styles.signature]}
                    ref={r=>_signatureView=r}
                    onSaveEvent={_onSaveEvent}
                    onDragEvent={_onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"} />
                    {renderSignatureControls()}
                </View>}
                {chosen && <View style={{flex:1}}>
                            <Image  source={{uri:chosen}} style={{ width: "100%",height:height-250}}/>
                            {renderImageControls()}
                        </View>}
                
            </View>
        );
        
}

/*<ScrollView style={{height:200, width:width}}>*/

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
