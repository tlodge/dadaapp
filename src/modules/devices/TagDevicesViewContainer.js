import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import DevicesScreen from './TagDevicesView';
import { fetchDevices, updateDeviceImage } from './DevicesState';

export default compose(
  connect(
    state => ({
      devices: state.devices.devices,
      inRange: state.devices.inRange,
    }),
    {
      fetchDevices,
      updateDeviceImage,
    },
  ),
)(DevicesScreen);