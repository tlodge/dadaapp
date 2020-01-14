const DEVICES_LOADED = 'DeviceState/DEVICES_LOADED';
const DEVICES_UPDATE_IMAGE = 'DeviceState/DEVICES_UPDATE_IMAGE';

const deviceData = [
    {
      id: 1,
      macaddr: '00:de:ad:be:af:dd',
      title: 'HUE BULB',
      subtitle: 'Philips Smart Bulb',
      price: 'on',
      badge: 'NEW',
      badgeColor: '#3cd39f',
      image:
        'https://reactnativestarter.com/demo/images/city-sunny-people-street.jpg',
    },
    {
      id: 2,
      macaddr: '08:00:2b:01:02:03',
      title: 'NEXT-LEVEL WEAR',
      subtitle: 'Office, prom or special parties is all dressed up',
      price: '$29.99',
      priceFrom: true,
      image: 'https://reactnativestarter.com/demo/images/pexels-photo-26549.jpg',
    },
    {
      id: 3,
      macaddr: '09:01:2c:01:02:03',
      title: 'CITIZEN ECO-DRIVE',
      subtitle: 'Office, prom or special parties is all dressed up',
      price: '$29.99',
      priceFrom: true,
      badge: 'SALE',
      badgeColor: '#ee1f78',
      image: 'https://reactnativestarter.com/demo/images/pexels-photo-30360.jpg',
    },
    {
      id: 4,
      macaddr: '00:00:11:22:33:44',
      title: 'CITIZEN ECO-DRIVE',
      subtitle: 'Limited Edition',
      price: '$129.99',
      badge: 'NEW',
      badgeColor: 'green',
      image: 'https://reactnativestarter.com/demo/images/pexels-photo-37839.jpg',
    },
    {
      id: 5,
      macaddr: '1c:10:c1:d2:33:44',
      title: 'NEXT-LEVEL WEAR',
      subtitle: 'Office, prom or special parties is all dressed up',
      price: '$29.99',
      priceFrom: true,
      image: 'https://reactnativestarter.com/demo/images/pexels-photo-69212.jpg',
    },
    {
      id: 6,
      macaddr: '33:33:41:cc:dd:ee',
      title: 'CITIZEN ECO-DRIVE',
      subtitle: 'Office, prom or special parties is all dressed up',
      price: '$29.99',
      priceFrom: true,
      badge: 'SALE',
      badgeColor: 'red',
      image: 'https://reactnativestarter.com/demo/images/pexels-photo-108061.jpg',
    },
    {
      id: 7,
      macaddr: 'bb:cc:aa:11:12:32',
      title: 'CITIZEN ECO-DRIVE',
      subtitle: 'Limited Edition',
      price: '$129.99',
      badge: 'NEW',
      badgeColor: '#3cd39f',
      image: 'https://reactnativestarter.com/demo/images/pexels-photo-126371.jpg',
    },
    
  ];

function devicesLoaded(devices) {
  return {
    type: DEVICES_LOADED,
    devices,
  };
}

export function fetchDevices() {
  // Do items loading here
 
  return (dispatch, getState) => {
    
    //if (getState().devices.length < 0){
        dispatch(devicesLoaded(deviceData));
    //}
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
};

export default function DevicesStateReducer(state = defaultState, action) {

console.log("nice seen ATCON!!", action);

  switch (action.type) {
    case DEVICES_LOADED:
        console.log("nice seen devices loaded", action.devices);
      return {...state, 
        isLoading: true,
        devices: action.devices,
      };

    case DEVICES_UPDATE_IMAGE:
       
      return {...state, 
            devices: state.devices.map(device=>{
                console.log("cheking", device.id, " against ", action.id);
                if (device.id === action.id){
                    return {
                        ...device,
                        image: action.image
                    }
                }
                return device;
            })
                
        }
      
    default:
      return state;
  }
}
