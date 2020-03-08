import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
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

const DarkMode = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const StyledPage = styled.div`
  max-width: 800px;
  margin: 20px;

  @media (min-width: 840px) {
    margin: 20px auto;
  }
`;

const App = () => {
  const [currContest, setCurrContest] = useState<string>();
  const [contests, setContests] = useState<object[]>([]);
  useEffect(() => {
    (async () => {
      // @ts-ignore
      const { default: contests } = await import('../../data/contests_8.json');
      const countyLevelContests = contests.filter(contest => !contest.Precinct);
      setContests(countyLevelContests);
      setCurrContest(countyLevelContests[1]['Contest Name']);
    })();
  }, []);

  return (
    <ThemeProvider theme={DarkMode}>
      <StyledPage>
        <GithubCorner href="https://github.com/petermikitsh/sandiego-2020-primary-results" />
        <Typography variant="h3" component="h1">
          San Diego County
        </Typography>
        <Typography variant="h4" component="h2">
          March 3, 2020 Primary
        </Typography>
        <FormControl style={{ margin: '20px 0' }}>
          <InputLabel id="demo-simple-select-label">Contest</InputLabel>
          {currContest && (
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
          )}
        </FormControl>
        <Card variant="outlined" style={{ backgroundColor: '#333' }}>
          <CardContent>
            <PrecinctMap contest={currContest} />
          </CardContent>
        </Card>
      </StyledPage>
    </ThemeProvider>
  );
};

export default hot(App);
