import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as scale from 'd3-scale';
import * as scaleChromatic from 'd3-scale-chromatic';
import Popper from '@material-ui/core/Popper';
// @ts-ignore
import { default as neighborhoods } from '../../../data/consolidations.geojson';
// @ts-ignore
import { default as precincts } from '../../../data/sandiego.txt';
import { Results } from '../types';
import stringToColor from 'string-to-color';
import { PopperContent } from './PopperContent';
import debounce from 'lodash.debounce';

const color = scale
  .scaleSequential(scaleChromatic.interpolateRdBu)
  .domain([-1, 1]);

interface RegionLayerProps {
  getPath(feature: any): string;
  results?: Results;
  regionLevel: string;
}

const getRegionId = (regionLevel: string, regionGeoJSON: any) => {
  if (regionLevel === 'neighborhood') {
    return regionGeoJSON?.properties?.CONSNAME;
  } else if (regionLevel === 'precinct') {
    return regionGeoJSON?.properties?.PRECINCT;
  }
};

const getRegionLabel = (region: any) => {
  const label = region?.properties?.CONSNAME;
  const precinctId = region?.properties?.PRECINCT;

  if (!precinctId) {
    return label;
  }

  return `${label} ${precinctId}`;
};

export const RegionLayer = ({
  results,
  getPath,
  regionLevel,
}: RegionLayerProps) => {
  const [regions, setRegions] = useState(neighborhoods.features);
  const [popperData, setPopperData] = useState<any>();
  const [regionIdToPathMap, setRegionIdToPathMap] = useState(null);

  useEffect(() => {
    setRegionIdToPathMap(
      [...precincts.features, ...neighborhoods.features].reduce(
        (acc, currFeature) => {
          const regionId =
            currFeature.properties.PRECINCT || currFeature.properties.CONSNAME;
          acc[regionId] = getPath(currFeature);
          return acc;
        },
        {},
      ),
    );
  }, []);

  useEffect(() => {
    if (regionLevel === 'precinct') {
      setRegions(precincts.features);
    } else if (regionLevel === 'neighborhoods') {
      setRegions(neighborhoods.features);
    }
  }, [regionLevel]);

  return (
    <>
      {regions.map((region, index) => {
        const regionId = getRegionId(regionLevel, region);

        return (
          <path
            d={regionIdToPathMap?.[regionId]}
            key={regionId}
            data-id={regionId}
            style={{
              fill: (() => {
                const regionData = results?.regions[regionId];
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
                anchor: document.querySelector(`[data-id="${regionId}"]`),
                geo: region,
              });
              // setRegions([
              //   ...regions.slice(0, index),
              //   ...regions.slice(index + 1, regions.length),
              //   region,
              // ]);
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
          regionLabel={getRegionLabel(popperData?.geo)}
          region={results?.regions[getRegionId(regionLevel, popperData?.geo)]}
        />
      </Popper>
    </>
  );
};
