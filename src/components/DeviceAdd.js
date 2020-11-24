import React, { useState } from 'react';
import axios from 'axios';

const DeviceAdd = (props) => {
  const [headersObj] = useState(props.headers);
  const [deviceName, setDeviceName] = useState('');
  const [osType, setOsType] = useState('iPhone');
  const [countryIsoCode, setCountryIsoCode] = useState('');
  const [otherDomesticCountryIsoCode, setOtherDomesticCountryIsoCode] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    let newDevice = {};
    newDevice.deviceName = deviceName;
    newDevice.osType = osType;
    newDevice.countryIsoCode = countryIsoCode;
    newDevice.otherDomesticCountryIsoCode = otherDomesticCountryIsoCode;

    axios.post('/Device', newDevice, { headers: headersObj })
      .then(res => {
        console.log(`Device with objectId: ${res.data.objectId} was created.`);
        resetForm();
      })
      .catch(err => {
        console.error(err);
      })
  }

  function resetForm() {
    setDeviceName('');
    setOsType('');
    setCountryIsoCode('');
    setOtherDomesticCountryIsoCode('');
  }

  function handleGoBack(event) {
    props.parentCallback(false);
    event.preventDefault();
  }

  return (
    <div>
      <h1>Add new device...</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={deviceName}
              name="name"
              onChange={e => setDeviceName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Operation system type:
            <select value={osType} onChange={e => setOsType(e.target.value)}>
              <option value="iPhone">iPhone</option>
              <option value="Android">Android</option>
              <option value="WindowsPhone">Windows Phone</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Country ISO code:
            <input
              type="text"
              value={countryIsoCode}
              name="countryIsoCode"
              onChange={e => setCountryIsoCode(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Other domestic country ISO code:
            <input
              type="text"
              value={otherDomesticCountryIsoCode}
              name="otherDomesticCountryIsoCode"
              onChange={e => setOtherDomesticCountryIsoCode(e.target.value)}
              required
            />
          </label>
        </div>
        <input type="submit" value="Submit" />
        <input type="button" value="Go back" onClick={handleGoBack} />
      </form>
    </div>
  );
};

export default DeviceAdd;
