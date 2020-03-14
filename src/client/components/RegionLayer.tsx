import React, { useState, useEffect, useMemo } from 'react';
import * as scale from 'd3-scale';
import * as scaleChromatic from 'd3-scale-chromatic';
import Popper from '@material-ui/core/Popper';
// @ts-ignore
import { default as neighborhoods } from '../../../data/consolidations.geojson';
import { Results } from '../types';
import stringToColor from 'string-to-color';
import { PopperContent } from './PopperContent';

const color = scale
  .scaleSequential(scaleChromatic.interpolateRdBu)
  .domain([-1, 1]);

interface RegionLayerProps {
  getPath(feature: any): string;
  results?: Results;
}

export const RegionLayer = ({ results, getPath }: RegionLayerProps) => {
  const [regions, setRegions] = useState(neighborhoods.features);
  const [popperData, setPopperData] = useState<any>();

  const getPathMemo = (feature: any) =>
    useMemo(() => getPath(feature), [feature]);

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
                const regionData =
                  results?.regions[region?.properties?.CONSNAME];
                if (results && !regionData?.sum) {
                  return 'url(#diagonal-stripe-1)';
                } else if (results?.isBinaryRace) {
                  return color(regionData.net);
                } else if (regionData?.sum > 0 && regionData.winner) {
                  return stringToColor(regionData.winner);
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
        <PopperContent
          regionId={popperData?.geo?.properties?.CONSNAME}
          region={results?.regions[popperData?.geo?.properties?.CONSNAME]}
        />
      </Popper>
    </>
  );
};
