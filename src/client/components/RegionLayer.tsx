import React, { useState, useEffect, useMemo } from 'react';
import * as scale from 'd3-scale';
import * as scaleChromatic from 'd3-scale-chromatic';
import Popper from '@material-ui/core/Popper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
// @ts-ignore
import { default as neighborhoods } from '../../../data/consolidations.geojson';
import { getContestData, Results } from '../utils';

const color = scale
  .scaleSequential(scaleChromatic.interpolateRdBu)
  .domain([-1, 1]);

interface RegionLayerProps {
  getPath(feature: any): string;
  contest?: string;
}

export const RegionLayer = ({ contest, getPath }: RegionLayerProps) => {
  const [regions, setRegions] = useState(neighborhoods.features);
  const [popperData, setPopperData] = useState<any>();
  const [contestData, setContestData] = useState<Results>();

  const getPathMemo = (feature: any) =>
    useMemo(() => getPath(feature), [feature]);

  useEffect(() => {
    (async () => {
      const currContestData = await getContestData(contest);
      setContestData(currContestData);
    })();
  }, [contest]);

  return (
    <>
      {regions.map((region, index) => {
        return (
          <path
            d={getPathMemo(region)}
            key={region.properties.CONSNAME}
            data-id={region.properties.CONSNAME}
            style={{
              fill: (() => {
                if (contestData?.isBinaryRace) {
                  return color(
                    contestData.results[region.properties.CONSNAME].net,
                  );
                }
              })(),
            }}
            onMouseOver={() => {
              setPopperData({
                anchor: document.querySelector(
                  `[data-id="${region.properties.CONSNAME}"]`,
                ),
                geo: region,
              });
              setRegions([
                ...regions.slice(0, index),
                ...regions.slice(index + 1, regions.length),
                region,
              ]);
            }}
            onMouseLeave={() => {
              setPopperData(null);
            }}
          />
        );
      })}
      <Popper
        open={!!popperData}
        anchorEl={popperData?.anchor}
        placement="left"
      >
        <Card style={{ marginRight: '10px' }}>
          <CardContent style={{ maxWidth: '325px' }}>
            <Typography variant="overline">PRECINCT / NEIGHBORHOOD</Typography>
            <div>
              {popperData?.geo?.properties?.CONSNAME}{' '}
              {popperData?.geo?.properties?.PRECINCT}
            </div>
            <Typography variant="overline">RESULTS</Typography>
            <pre style={{ whiteSpace: 'pre-wrap', display: 'block' }}>
              {JSON.stringify(
                contestData?.results?.[popperData?.geo?.properties?.CONSNAME],
                null,
                2,
              )}
            </pre>
          </CardContent>
        </Card>
      </Popper>
    </>
  );
};
