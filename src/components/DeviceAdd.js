import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

export const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  wrapper: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
    },
  },
  title: {
    margin: theme.spacing(2, 0, 4),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacing(3),
      width: '100%',
    },
  },
  submitBtn: {
    marginTop: theme.spacing(2),
  }
}));

const DeviceAdd = (props) => {
  const classes = useStyles();
  const [headersObj] = useState(props.headers);
  const [deviceName, setDeviceName] = useState('');
  const [osType, setOsType] = useState('');
  const [countryIsoCode, setCountryIsoCode] = useState('');
  const [otherDomesticCountryIsoCode, setOtherDomesticCountryIsoCode] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [btnSubmitLoading, setBtnSubmitLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setBtnSubmitLoading(true);

    let newDevice = {};
    newDevice.deviceName = deviceName;
    newDevice.osType = osType;
    newDevice.countryIsoCode = countryIsoCode;
    newDevice.otherDomesticCountryIsoCode = otherDomesticCountryIsoCode;

    axios.post('https://parse-wandera.herokuapp.com/parse/classes/Device', newDevice, { headers: headersObj })
      .then(res => {
        resetForm();
        setSnackbarMessage(`Device '${newDevice.deviceName}' was successfully created.`);
        setSnackbarOpen(true);
        setBtnSubmitLoading(false);
      })
      .catch(err => {
        console.error(err);
        setBtnSubmitLoading(false);
      })
  }

  const resetForm = () => {
    setDeviceName('');
    setOsType('');
    setCountryIsoCode('');
    setOtherDomesticCountryIsoCode('');
  }

  const handleGoBack = (event) => {
    props.parentCallback(false);
    event.preventDefault();
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" onClick={handleGoBack}>&#60; Go Back</Button>
      <div className={classes.wrapper}>
        <Typography variant="h3" color="inherit" className={classes.title}>
          Add new device...
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            type="text"
            id="name"
            label="Name"
            variant="outlined"
            value={deviceName}
            onChange={e => setDeviceName(e.target.value)}
            required
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="osType-label">Operation system type</InputLabel>
            <Select
              labelId="osType-label"
              id="osType"
              value={osType}
              onChange={e => setOsType(e.target.value)}
              label="Operation system type"
            >
              <MenuItem value="iPhone">iPhone</MenuItem>
              <MenuItem value="Android">Android</MenuItem>
              <MenuItem value="WindowsPhone">WindowsPhone</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="text"
            id="countryIsoCode"
            label="Country ISO code"
            variant="outlined"
            value={countryIsoCode}
            name="countryIsoCode"
            inputProps={{ maxLength: 2 }}
            onChange={e => setCountryIsoCode(e.target.value)}
            required
          />
          <TextField
            type="text"
            id="otherDomesticCountryIsoCode"
            label="Other country ISO code"
            variant="outlined"
            value={otherDomesticCountryIsoCode}
            name="otherDomesticCountryIsoCode"
            inputProps={{ maxLength: 2 }}
            onChange={e => setOtherDomesticCountryIsoCode(e.target.value)}
            required
          />
          <Button
            className={classes.submitBtn}
            type="submit"
            value="Submit"
            variant="contained"
            color="primary"
            disabled={btnSubmitLoading}
          >
            {btnSubmitLoading ? 'Creating ...' : 'Create'}
          </Button>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DeviceAdd;
