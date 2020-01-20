import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import DevicesScreen from './DeviceMonitorView';

export default compose(
  connect(
    (state, newProps) => {
      const _ = ()=>[];
      console.log("STATE DEVICWS", state.devices.taggedDevices);
      return {
        taggedDevices: (state.devices.taggedDevices || _)(state, newProps),
      } 
    },
  ),
)(DevicesScreen);

