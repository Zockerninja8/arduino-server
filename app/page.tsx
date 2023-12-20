"use client"
import { Button, Container, Grid, Slider, Stack, Switch, Typography } from '@mui/material';
import axios from 'axios';
import { Fragment, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Home() {

  const [ledOn,setLedOn] = useState(false);
  const [useIntervall, setUseIntervall] = useState(false);
  const [intervall,setIntervall] = useState(0);

  function handleSaveSettings(){
    axios.post('/api/arduino', {
      ledOn: ledOn,
      useIntervall: useIntervall,
      intervall: intervall
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function makeBeep(){
    axios.post('/api/beep', {
      put: true
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setIntervall(newValue as number);
  };

  function onChangeLedOn(e: any){
    const value = e.target.checked
    if(value === true){
      setUseIntervall(false);
    }
    setLedOn(value);
  }

  function onChangeUseIntervall(e:any){
    const value = e.target.checked
    if(value === true){
      setLedOn(false);
    }
    setUseIntervall(e.target.checked);
  }


  return (

    <main>
      <Fragment>
        <Container maxWidth={"xs"}>
          <Stack spacing={2}>
            <FormGroup>
              <FormControlLabel control={<Switch checked={ledOn} onChange={onChangeLedOn} />} label="Led On" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Switch checked={useIntervall} onChange={onChangeUseIntervall}/>} label="Use Intervall" />
            </FormGroup>
            <Stack direction="row" alignItems="center">
              <Slider max={10} min={0} value={intervall} onChange={handleChange}/>
              <Typography>Intervall:</Typography>
              <Typography>{intervall}</Typography>
            </Stack>
            <Button onClick={handleSaveSettings} variant='contained' fullWidth>Save Settings</Button>
            <Button onClick={makeBeep} variant='contained' fullWidth>Server Beep</Button>
          </Stack>
        </Container>
      </Fragment>   
    </main>
  )
}
