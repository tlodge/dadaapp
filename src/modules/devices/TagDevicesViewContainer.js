import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import DevicesScreen from './TagDevicesView';
import { fetchDevices, updateDeviceImage } from './DevicesState';

export default compose(
  connect(
    state => ({
      devices: state.devices.devices,
    }),
    {
      fetchDevices,
      updateDeviceImage,
    },
  ),
)(DevicesScreen);