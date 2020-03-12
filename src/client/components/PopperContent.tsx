import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import { Region } from '../types';

import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';

interface PopperContentProps {
  regionId?: string;
  region?: Region;
}

const getPercent = (candidateId: string, region: Region) => {
  const percent = region.candidates[candidateId] / region.sum || 0;
  return `${(percent * 100).toFixed(2)}%`;
};

export const PopperContent = ({ regionId, region }: PopperContentProps) => {
  const candidateTuple = Object.entries(region?.candidates || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
  const empty = !candidateTuple.length;

  return (
    <Card style={{ marginRight: '10px' }}>
      <CardContent style={{ maxWidth: '350px' }}>
        <p>
          <Typography variant="overline">NEIGHBORHOOD</Typography>
          <Typography>{regionId}</Typography>
        </p>
        <Typography variant="overline">RESULTS</Typography>
        {empty && <div>No Results</div>}
        <Table size="small">
          <TableBody>
            {candidateTuple.map(([candidateId, voteCount]) => (
              <TableRow>
                <TableCell>{candidateId}</TableCell>
                <TableCell>{voteCount}</TableCell>
                <TableCell>{getPercent(candidateId, region)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
