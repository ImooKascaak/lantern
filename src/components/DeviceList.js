import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeviceAdd from './DeviceAdd';

const headersObj = {
  "Content-Type": "application/json",
  "X-Parse-Session-Token": "r:b5382b28beb25fdde4f952a8acdace65",
  "X-Parse-Application-Id": "UKB9QAriw4ABOGRwOJ67fXj2Iypx7UQPhj5ZdR66",
  "X-Parse-REST-API-Key": "FQ3wONUU2tFb7o8I7nszpAlQkMoxMS6FEbcpXkRz"
}

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [showDeviceAdd, setShowDeviceAdd] = useState(false);

  useEffect(() => {
    getDevices();
  }, [showDeviceAdd]);

  function getDevices() {
    axios.get('/Device', { headers: headersObj })
      .then(res => {
        console.log(res.data['results']);
        setDevices(res.data['results']);
      })
      .catch(err => {
        console.error(err);
      })
  }

  function handleDeviceDelete(deletedObjectId) {
    axios.delete(`/Device/${deletedObjectId}`, { headers: headersObj })
      .then(res => {
        console.log(res);
        getDevices();
        // alert(`Device with objectId: ${deletedObjectId} was deleted.`);
      })
      .catch(err => {
        console.error(err);
      })
  }

  function handleDeviceAdd(_showDeviceAdd) {
    setShowDeviceAdd(_showDeviceAdd);
  }

  return (
    <div>
      {
        showDeviceAdd ?
          <DeviceAdd headers={headersObj} parentCallback={handleDeviceAdd} />
          :
          <div>
            <ul>
              {devices.map(device => (
                <li key={device.objectId}>
                  {device.objectId} - {device.deviceName} - {device.osType} - {device.countryIsoCode} - {new Date(device.createdAt).toLocaleDateString()}
                  <input type="button" value="Delete" onClick={() => handleDeviceDelete(device.objectId)} />
                </li>
              ))}
            </ul>
            <input type="button" value="Add new device" onClick={() => handleDeviceAdd(true)} />
          </div>
      }
    </div>
  );
};

export default DeviceList;
