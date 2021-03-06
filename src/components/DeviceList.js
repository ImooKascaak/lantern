import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Button,
  IconButton,
  Paper,
  Snackbar,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

import { getHeaders, getToken } from '../utils/Common';

import DeviceAdd, { Alert } from './DeviceAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  paper: {
    height: '70vh',
    padding: theme.spacing(5),
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(4),
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginTop: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      height: '80vh',
      width: '80vw',
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      paddingBottom: theme.spacing(3),
    },
  },
  title: {
    margin: theme.spacing(2, 0, 2),
  },
  grid: {
    height: '500px',
    width: '850px',
    [theme.breakpoints.down('md')]: {
      height: 'calc(70vh - 100px)',
      width: '600px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  }
}));

const DeviceList = () => {
  const classes = useStyles();
  const headersObj = { ...getHeaders(), "X-Parse-Session-Token": getToken() };
  const [btnDeleteLoading, setBtnDeleteLoading] = useState(false);
  const [devices, setDevices] = useState([]);
  const [showDeviceAdd, setShowDeviceAdd] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const columns = [
    {
      field: 'objectId',
      headerName: 'Action',
      description: 'Press the ' - ' button to delete the current device',
      sortable: false,
      align: 'center',
      width: 80,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <IconButton
            aria-label="delete"
            className={classes.margin}
            onClick={() => handleDeviceDelete(params.data.objectId, params.data.deviceName)}
            disabled={btnDeleteLoading}
          >
            <DeleteIcon />
          </IconButton>
        )
      }
    },
    { field: 'deviceName', headerName: 'Device name', width: 230 },
    { field: 'osType', headerName: 'Phone OS type', width: 150, sortable: false, },
    {
      field: 'countryIsoCode',
      headerName: 'Country code',
      description: 'Domestic country code',
      align: 'center',
      width: 120
    },
    {
      field: 'createdAt',
      headerName: 'Create date',
      description: 'Create date',
      align: 'center',
      width: 120,
      valueGetter: (params) => `${new Date(params.getValue('createdAt')).toLocaleDateString()}`,
    },
  ];

  const getDevices = useCallback(() => {
    axios.get('https://parse-wandera.herokuapp.com/parse/classes/Device', { headers: headersObj })
      .then(res => {
        res.data['results'].map(device => (device.id = device.objectId));
        setDevices(res.data['results']);
      })
      .catch(err => {
        console.error(err);
      })
  }, []);

  useEffect(() => {
    getDevices();
  }, [showDeviceAdd, getDevices]);

  const handleDeviceDelete = (deletedObjectId, deletedDeviceName) => {
    setBtnDeleteLoading(true);

    axios.delete(`https://parse-wandera.herokuapp.com/parse/classes/Device/${deletedObjectId}`, { headers: headersObj })
      .then(res => {
        setSnackbarMessage(`Device '${deletedDeviceName}' was successfully deleted.`);
        setSnackbarOpen(true);
        getDevices();
        setBtnDeleteLoading(false);
      })
      .catch(err => {
        setBtnDeleteLoading(false);
        console.error(err);
      })
  };

  const handleDeviceAdd = (_showDeviceAdd) => {
    setShowDeviceAdd(_showDeviceAdd);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        {
          showDeviceAdd ?
            <DeviceAdd headers={headersObj} parentCallback={handleDeviceAdd} />
            :
            <div>
              <div className={classes.header}>
                <Typography variant="h3" color="inherit" className={classes.title}>
                  Device list
                </Typography>
                <Button variant="contained" color="secondary" onClick={() => handleDeviceAdd(true)}>Create new device</Button>
              </div>
              <div className={classes.grid}>
                <DataGrid
                  rows={devices}
                  columns={columns}
                  pageSize={10}
                />
              </div>
            </div>
        }
      </Paper>
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

export default DeviceList;
