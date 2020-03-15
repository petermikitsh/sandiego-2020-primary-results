import React, { useEffect, useRef } from 'react';
import * as geo from 'd3-geo';
import * as selection from 'd3-selection';
import * as zoom from 'd3-zoom';
import styled from 'styled-components';
import useDarkMode from 'use-dark-mode';
import { RegionLayer } from './RegionLayer';
import { RoadLayer } from './RoadLayer';
// @ts-ignore
import { default as sdcounty } from '../../../data/sdcounty.geojson';
import { Results } from '../types';

interface StyledMapProps {
  darkMode: boolean;
  results: Results;
}

const StyledMap = styled.div<StyledMapProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  path {
    vector-effect: non-scaling-stroke;
    stroke-width: 0.2;
  }

  .county {
    stroke: ${props => (props.darkMode ? '#fff' : '#555')};
    stroke-width: ${props => (props.darkMode ? '1.5' : '1')};
    stroke-opacity: ${props => (props.darkMode ? '1' : '0.5')};
    fill: transparent;
    fill: #f9f9fa;
    fill-opacity: 0.5;
  }

  .region path {
    stroke: ${props => (props.darkMode ? '#333' : '#aaa')};
    fill: ${props => (props.darkMode ? '#e7e7e7' : '#e7e7e7')};
    fill: #f9f9fa;
    stroke-opacity: 0.5;
    fill-opacity: 0.5;
    cursor: pointer;
  }

  .region path:hover {
    stroke-width: 2;
    stroke: ${props => (props.darkMode ? '#333' : '#222')};
    stroke-opacity: 1;
  }

  .roads path {
    stroke: ${props => (props.darkMode ? '#888' : '#ddd')};
    stroke-width: 1;
    fill: transparent;
  }
`;

const width = 600;
const height = 500;
const INITIAL_X = -500;
const INITIAL_Y = -1400;
const INITIAL_ZOOM = 4;
const projection = geo.geoMercator().fitSize([width, height], sdcounty);
const getPath = geo.geoPath().projection(projection);

interface PrecinctMapProps {
  results: Results;
  regionLevel: string;
}

export const PrecinctMap = ({ results, regionLevel }: PrecinctMapProps) => {
  const svgRef = useRef<SVGSVGElement>();
  const zoomRef = useRef<SVGGElement>();
  const darkMode = useDarkMode();

  useEffect(() => {
    (async () => {
      const currZoom = zoom
        .zoom()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([0.9, 25])
        .on('zoom', () => {
          selection
            .select(zoomRef.current)
            .attr('transform', selection.event.transform);
        });
      selection
        .select(svgRef.current)
        .call(currZoom)
        .call(currZoom.transform, zoom.zoomIdentity);
    })();
  }, []);

  return (
    <StyledMap darkMode={darkMode.value}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        preserveAspectRatio="xMinYMin meet"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <pattern
            id="diagonal-stripe-1"
            patternUnits="userSpaceOnUse"
            width="4"
            height="4"
          >
            <path
              d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2"
              style={{ stroke: darkMode.value ? '#333' : '#aaa' }}
            />
          </pattern>
        </defs>
        <g
          ref={zoomRef}
          transform={
            zoomRef?.current?.getAttribute('transform') ||
            `translate(${INITIAL_X}, ${INITIAL_Y}), scale(${INITIAL_ZOOM})`
          }
        >
          <g>
            <path className="county" d={getPath(sdcounty)} />
          </g>
          <g className="roads">
            <RoadLayer getPath={getPath} />
          </g>
          <g className="region">
            <RegionLayer
              getPath={getPath}
              results={results}
              regionLevel={regionLevel}
            />
          </g>
        </g>
      </svg>
    </StyledMap>
  );
};
