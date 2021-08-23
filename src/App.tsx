import { Box, Checkbox, Container, FormControlLabel, FormGroup, IconButton, LinearProgress, Popover, Slider, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createTheme';
import { Settings } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { ChangeEvent, useEffect, useReducer } from 'react';
import { useState } from 'react';
import reducer from './App.reducer';
import Equation from './Equation';

const useStyles = makeStyles<Theme>((theme) => createStyles({
  root: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    margin: 0,
    padding: theme.spacing(2, 4),
  },
  settings: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1)
  },
}));

const initialState: ReturnType<typeof reducer> = {
  a: 1,
  b: 1,
  linear: true,
  speed: 5000,
  progress: 0,
};

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const classes = useStyles();

  useEffect(() => {
    if (state.progress > state.speed) {
      dispatch({ type: 'next' });
    }
  }, [state.progress, state.speed])

  useEffect(() => {
    const interval = setInterval(() => dispatch({ type: 'tick', delta: 100}), 100);
    return () => clearInterval(interval);
  }, [dispatch])

  const handleLinearChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'linear', value: e.target.checked });
  }

  const handleSpeedChange = (e: ChangeEvent<{}>, value: number | number[]) => {
    if (typeof value === "number") {
      dispatch({ type: 'speed', value: value });
    }
  }

  const handleSettingsClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleSettingsClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'settings-popover' : undefined;

  return (
    <main className={classes.root}>
      <IconButton className={classes.settings} onClick={handleSettingsClick} aria-describedby={id}>
        <Settings />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleSettingsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Box m={2} width={200}>
          <FormGroup>
            <FormControlLabel 
              control={<Checkbox checked={state.linear}  onChange={handleLinearChange} />}
              label="Linear"
            />
          </FormGroup>
          <FormGroup>
              <Typography>Speed</Typography>
              <Slider min={1000} max={60000} step={1000} value={state.speed} marks onChangeCommitted={handleSpeedChange} />
          </FormGroup>
        </Box>
      </Popover>
      <main>
        <Container>
          <Equation a={state.a} b={state.b} />
          <LinearProgress variant="determinate" value={100 * state.progress / state.speed} color="secondary" />
        </Container>
      </main>
    </main>
  );
}

export default App;
