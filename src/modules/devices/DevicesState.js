import navigation from "../navigation/NavigationService";

const DEVICES_LOADED = 'DeviceState/DEVICES_LOADED';
const DEVICES_UPDATE_IMAGE = 'DeviceState/DEVICES_UPDATE_IMAGE';
const TAG_IN_RANGE ='DeviceState/TAG_IN_RANGE';
const TAG_OUT_OF_RANGE = 'DeviceState/TAG_OUT_OF_RANGE';


const defaultimage  = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1920"><style>.st0{fill:#fff}.st1{fill:none;stroke:#231f20;stroke-width:50;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}</style><path class="st0" d="M884.8 1322.2c-42.1 42.1-42.1 110.3 0 152.4 42.1 42.1 110.3 42.1 152.4 0 42.1-42.1 42.1-110.3 0-152.4-42.1-42-110.3-42-152.4 0zm342.9-251.1c-4.6-4-9.7-7.3-15.2-10.1-156.1-99.7-358.1-98.2-512.8 4.5-41.2 27.3-46.8 85.6-11.8 120.6l.1.1c26.5 26.5 67.8 30.3 99.1 9.7 101.4-67 233.1-68.8 336.3-5.7 0 0 12.6 9.8 19.8 13.2 10.2 4.8 21.5 7.4 33.5 7.4 16.5 0 31.8-5.1 44.5-13.7 8.2-5.6 15.3-12.7 20.9-20.9 8.7-12.7 13.8-28.1 13.8-44.6-.2-24.3-11.1-46-28.2-60.5zm236.7-213.3c-.7-.6-27.4-22.1-28.2-22.7-284.8-218.5-685.3-215-966.5 10.4-36.3 29.1-39.1 83.5-6.2 116.4l.1.1c28.3 28.3 73.3 30.6 104.6 5.6 227.2-181.8 551.6-182.6 779.7-2.4 2.7 2.5 5.6 4.9 8.7 7 12.8 8.9 28.4 14.1 45.2 14.1 16.8 0 32.3-5.2 45.1-14.1.3-.2.6-.5 1-.7 1.7-1.2 3.3-2.4 4.8-3.8.7-.5 1.3-1.1 1.9-1.7l.1-.1c2.1-1.9 4.1-3.9 6-6l.1-.1c1.5-1.7 3-3.5 4.4-5.3 2.9-3.9 5.5-8 7.6-12.4.2-.3.3-.6.5-.9 5.1-10.5 8-22.2 8-34.6-.1-18.5-6.4-35.4-16.9-48.8zm211.3-232.1c-410.8-354.2-1021.6-354.2-1432.3 0-33.6 29-35.4 80.6-4 112 28.4 28.4 73.8 29.9 104.2 3.7C697 437 1222.2 437 1575.5 741.4c30.4 26.2 75.8 24.7 104.2-3.7 15-15 22.4-34.6 22.4-54.2.1-21.4-8.8-42.7-26.4-57.8z" id="Layer_6"/><g id="STROKES"><ellipse transform="rotate(-45.001 961.002 1398.448)" class="st1" cx="961" cy="1398.4" rx="107.7" ry="107.7"/><path class="st1" d="M1464.4 857.7c-.7-.6-27.4-22.1-28.2-22.7-284.9-218.5-685.3-215.1-966.5 10.4-36.3 29.1-39.1 83.5-6.2 116.4l.1.1c28.3 28.3 73.3 30.6 104.6 5.6 227.2-181.8 551.6-182.6 779.7-2.4 2.7 2.5 5.6 4.9 8.7 7 12.8 8.9 28.4 14.1 45.2 14.1 16.8 0 32.3-5.2 45.1-14.1.3-.2.6-.4 1-.7 1.7-1.2 3.3-2.4 4.8-3.7.6-.5 1.3-1.1 1.9-1.7l.1-.1c2.1-1.9 4.1-3.9 6-6l.1-.1c1.5-1.7 3-3.5 4.4-5.4 2.9-3.9 5.5-8 7.6-12.4.2-.3.3-.6.5-.9 5.1-10.5 8-22.2 8-34.6-.1-18.4-6.4-35.3-16.9-48.8z"/><path class="st1" d="M1675.7 625.7c-410.7-354.2-1021.6-354.2-1432.3 0-33.7 29-35.4 80.6-4 112 28.4 28.4 73.8 29.9 104.2 3.7C697 437 1222.2 437 1575.5 741.4c30.4 26.2 75.8 24.6 104.2-3.7 15-15 22.4-34.6 22.4-54.2.1-21.4-8.8-42.7-26.4-57.8z"/><path class="st1" d="M1227.7 1071.1c-4.6-3.9-9.7-7.3-15.2-10.1-156.1-99.7-358.1-98.2-512.8 4.5-41.2 27.3-46.8 85.6-11.8 120.6l.1.1c26.5 26.5 67.8 30.3 99.1 9.7 101.4-67 233.1-68.8 336.3-5.7 0 0 12.5 9.8 19.8 13.2 10.2 4.7 21.5 7.4 33.5 7.4 16.5 0 31.8-5.1 44.5-13.7 8.2-5.6 15.3-12.7 20.9-20.9 8.7-12.7 13.8-28.1 13.8-44.6-.2-24.3-11.1-46-28.2-60.5z"/></g></svg>`;

const deviceData = [
    {
      id: 1,
      macaddr: '00:de:ad:be:af:dd',
      title: 'Hue Bulb',
      subtitle: 'Philips Smart Bulb',
      price: 'lounge',
      status:['NEW'],
      badgeColor: '#3cd39f',
      image: defaultimage,
    },
    {
      id: 2,
      macaddr: '08:00:2b:01:02:03',
      title: 'Hue Bulb',
      subtitle: 'Philips Smart Bulb',
      price: 'lounge',
      status:[],
      priceFrom: true,
      image:  defaultimage,
    },
    {
      id: 3,
      macaddr: '09:01:2c:01:02:03',
      title: 'Smart TV',
      subtitle: 'Samsung MX-4567',
      price: 'lounge',
      status:[],
      priceFrom: true,
      image:  defaultimage,
    },
    {
      id: 4,
      macaddr: '00:00:11:22:33:44',
      title: 'Kettle',
      subtitle: 'Morphy Richards S7Y72',
      price: 'kitchen',
      status:['update firmware'],
      badgeColor: 'green',
      image:  defaultimage,
    },
    {
      id: 5,
      macaddr: '1c:10:c1:d2:33:44',
      title: 'Weighing Scales',
      subtitle: 'John Lewis Smart Bathroom Scales',
      price: 'small bathroom',
      status:['unusual activity'],
      priceFrom: true,
      image:  defaultimage,
    },
    {
      id: 6,
      macaddr: '33:33:41:cc:dd:ee',
      title: 'Toaster',
      subtitle: 'Delonghi Smart Toaster',
      price: 'kitchen',
      priceFrom: true,
      status: ['update firmware'],
      badgeColor: 'red',
      image:  defaultimage,
    },
    {
      id: 7,
      macaddr: 'bb:cc:aa:11:12:32',
      title: 'Smartphone',
      subtitle: 'Apple iPhone X',
      price: 'tom',
      badge: 'NEW',
      badgeColor: '#3cd39f',
      status: [],
      image:  defaultimage,
    },
    
  ];

function devicesLoaded(devices) {
  return {
    type: DEVICES_LOADED,
    devices,
  };
}


export function tagOutOfRange(){
    return (dispatch, getState) => {
        dispatch({type:TAG_OUT_OF_RANGE});
        const route = navigation.getCurrentRoute();
        if (route === "TagDevices"){
            navigation.navigate("Devices",{});
        }
    }
}   
export function tagTapped(data) {
    // Do items loading here
    let seen = [];
    try {
        seen = JSON.parse(data);
    }catch(err){

    }
    console.log(seen);

    return (dispatch, getState) => {
       
        const devices = getState().devices || {};

        const taggeddevices = (devices.devices || []).reduce((acc, device)=>{
            if (seen.indexOf(device.macaddr) !== -1){
                return [...acc, device]
            }
            return acc;
        },[]);

        if (taggeddevices.length <= 0){
            navigation.navigate("TagDevices",{});
           
        }else{
            navigation.navigate("MonitorDevices",{devices:taggeddevices});
          
        }
        dispatch({type:TAG_IN_RANGE});   
    };
  }

export function fetchDevices() {
  // Do items loading here
 
  return (dispatch, getState) => {
    //console.log("-----------> havce state", getState().devices.devices);
    if (((getState().devices || {}).devices || []).length <= 0){
        dispatch(devicesLoaded(deviceData));
    }
  };
}

export function updateDeviceImage(id, image){
    return (dispatch, getState) => {
        dispatch( {
            type: DEVICES_UPDATE_IMAGE,
            id,
            image,
        });
    }
}

const defaultState = {
  devices: [],
  isLoading: false,
  inRange: false,
};

export default function DevicesStateReducer(state = defaultState, action) {

  switch (action.type) {

   
    case DEVICES_LOADED:
      return {...state, 
        isLoading: true,
        devices: action.devices,
      };

    case DEVICES_UPDATE_IMAGE:
       
      return {...state, 
            devices: state.devices.map(device=>{
                if (device.id === action.id){
                    return {
                        ...device,
                        image: action.image
                    }
                }
                return device;
            })
                
        }
    case TAG_IN_RANGE:
        return {...state, inRange:true}

    case TAG_OUT_OF_RANGE:
        return {...state, inRange:false}

    default:
      return state;
  }
}
