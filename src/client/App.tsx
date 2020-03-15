import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader/root';
import { capitalCase } from 'change-case';
import styled from 'styled-components';
import GithubCorner from 'react-github-corner';
import { PrecinctMap } from './components/PrecinctMap';
import { ContestStats } from './components/ContestStats';
import useDarkMode from 'use-dark-mode';
import { Theme } from '@material-ui/core';
import { getContestData } from './utils';
import { Results } from './types';

const LightMode = createMuiTheme({
  palette: {
    type: 'light',
  },
});

const DarkMode = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#757ce8',
      main: '#90CAF9',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const StyledPage = styled.div`
  max-width: 850px;
  margin: 20px;

  @media (min-width: 840px) {
    margin: 20px auto;
    margin-bottom: 0;
  }
`;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const App = () => {
  const classes = useStyles();
  const [regionLevel, setRegionLevel] = useState<string>('neighborhood');
  const [currContest, setCurrContest] = useState<string>();
  const [contests, setContests] = useState<object[]>([]);
  const [theme, setTheme] = useState<Theme>();
  const [results, setResults] = useState<Results>();
  const darkMode = useDarkMode();

  useEffect(() => {
    const darkModeEnabled = darkMode.value;
    setTheme(darkModeEnabled ? DarkMode : LightMode);
  }, [darkMode]);

  useEffect(() => {
    (async () => {
      // @ts-ignore
      const { default: contests } = await import('../../data/contests_8.json');
      const countyLevelContests = contests.filter(contest => !contest.Precinct);
      setContests(countyLevelContests);
      setCurrContest(countyLevelContests[1]['Contest Name']);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // @ts-ignore
      const currContestData = await getContestData(currContest, regionLevel);
      setResults(currContestData);
    })();
  }, [currContest, regionLevel]);

  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <GithubCorner href="https://github.com/petermikitsh/sandiego-2020-primary-results" />
        <Typography variant="h3" component="h1">
          San Diego County
        </Typography>
        <Typography variant="h4" component="h2">
          March 3, 2020 Primary
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="detail-level-label">Region</InputLabel>
          <Select
            value={regionLevel}
            labelId="detail-level-label"
            id="detail-level"
            onChange={e => {
              // @ts-ignore
              setRegionLevel(e.target.value);
            }}
          >
            <MenuItem value="precinct">Precinct</MenuItem>
            <MenuItem value="neighborhood">Neighborhood</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          className={classes.formControl}
          style={{ maxWidth: '350px' }}
        >
          {currContest && contests && (
            <>
              <InputLabel id="demo-simple-select-label">Contest</InputLabel>
              <Select
                value={currContest}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={e => {
                  // @ts-ignore
                  setCurrContest(e.target.value);
                }}
              >
                {contests.map(contest => (
                  <MenuItem
                    key={contest['Contest Name']}
                    value={contest['Contest Name']}
                  >
                    {capitalCase(contest['Contest Name'])}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="mode-label">Mode</InputLabel>
          <Select
            value={String(darkMode.value)}
            labelId="mode-label"
            id="mode-select"
            onChange={e => {
              if (e.target.value !== String(darkMode.value)) {
                darkMode.toggle();
              }
            }}
          >
            <MenuItem value="false">Light Mode</MenuItem>
            <MenuItem value="true">Dark Mode</MenuItem>
          </Select>
        </FormControl>
        <Card variant="outlined">
          <CardContent>
            <PrecinctMap results={results} regionLevel={regionLevel} />
          </CardContent>
        </Card>
        <ContestStats results={results} />
      </StyledPage>
    </ThemeProvider>
  );
};

export default hot(App);
