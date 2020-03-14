import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { Region, Results } from '../types';

const ContestTable = ({ data }: { data: [string, Region][] }) => {
  return (
    <Table size="small">
      <TableBody>
        {Object.values(data).map(([regionId, region]) => {
          return (
            <TableRow key={regionId}>
              <TableCell>{regionId}</TableCell>
              <TableCell>
                {region.winners.map(([winner]) => (
                  <p key={winner}>{winner}</p>
                ))}
              </TableCell>
              <TableCell>
                {region.winners.map(([winner, voteCount]) => (
                  <p key={winner}>
                    {((voteCount / region.sum) * 100).toFixed(2)}%
                  </p>
                ))}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export const ContestStats = ({ results }: { results?: Results }) => {
  if (!results) {
    return null;
  }

  const regionsSorted = Object.entries(results?.regions)
    .filter(([, a]) => a.winners.length)
    .sort(([, a], [, b]) => {
      if (!a.winMargin && !b.winMargin) {
        return -1;
      }
      return a.winMargin - b.winMargin;
    });

  const mostCompetitive = regionsSorted.slice(0, 5);
  const leastCompetitive = regionsSorted
    .slice(regionsSorted.length - 5, regionsSorted.length)
    .reverse();

  return (
    <Grid container spacing={3} style={{ marginTop: '10px' }}>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Most Competitive</Typography>
            <ContestTable data={mostCompetitive} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Least Competitive</Typography>
            <ContestTable data={leastCompetitive} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
