import React, { useEffect, useRef, useState } from 'react';
import * as geo from 'd3-geo';
import * as selection from 'd3-selection';
import * as zoom from 'd3-zoom';
import * as scale from 'd3-scale';
import * as scaleChromatic from 'd3-scale-chromatic';
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import { getContestData, Results } from '../utils';

const color = scale
  .scaleSequential(scaleChromatic.interpolateRdBu)
  .domain([-1, 1]);

const StyledMap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  path {
    vector-effect: non-scaling-stroke;
    stroke-width: 0.2;
    stroke: #ddd;
    fill: #7d7d7d;
    stroke: #ddd;
  }

  path:not(.highway) {
    fill-opacity: 0.5;
  }

  path:not(.highway):hover {
    stroke-width: 3;
    stroke: #000;
    z-index: 1;
  }

  .highway {
    stroke: #fff;
    stroke-width: 1;
    fill: transparent;
  }
`;
const width = 600;
const height = 500;

export const PrecinctMap = ({ contest }: { contest: string }) => {
  const mount = useRef();
  const svgRef = useRef();
  const zoomRef = useRef();
  const highwayRef = useRef();
  const precinctsRef = useRef();
  const [popperData, setPopperData] = useState<any>();
  const [contestData, setContestData] = useState<Results>();

  useEffect(() => {
    (async () => {
      const currContestData = await getContestData(contest);
      setContestData(currContestData);

      // clear old nodes before repainting
      const parents = [highwayRef.current, precinctsRef.current];
      parents.forEach((parent: SVGElement) => {
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
        }
      });

      // repaint map
      (async () => {
        const { default: highwayGeoJson } = await import(
          // @ts-ignore
          '../../../data/highways.geojson'
        );

        const { default: neighborhoodGeoJson } = await import(
          // @ts-ignore
          '../../../data/consolidations.geojson'
        );

        const projection = geo.geoMercator();
        projection.fitSize([width, height], neighborhoodGeoJson);
        selection
          .select(precinctsRef.current)
          .selectAll('path')
          .data(neighborhoodGeoJson.features)
          .enter()
          .append('path')
          .attr('d', geo.geoPath().projection(projection))
          .on('mouseover', function(geo) {
            setPopperData({
              anchor: this,
              geo,
            });
            selection.select(this as any).raise();
          })
          .on('mouseleave', () => {
            setPopperData(null);
          })
          // @ts-ignore
          .style('fill', (d: any) => {
            if (currContestData.isBinaryRace) {
              const {
                properties: { CONSNAME },
              } = d;

              // @ts-ignore
              const { net } = currContestData.results[CONSNAME];
              return color(net);
            }
          });
        const currZoom = zoom
          .zoom()
          .extent([
            [0, 0],
            [width, height],
          ])
          .scaleExtent([1, 25])
          .on('zoom', () => {
            selection
              .select(zoomRef.current)
              .attr('transform', selection.event.transform);
          });
        selection
          .select(svgRef.current)
          .call(currZoom)
          .call(
            currZoom.transform,
            zoom.zoomIdentity.translate(-500, -1400).scale(4),
          );

        projection.fitSize([width, height], neighborhoodGeoJson);
        selection
          .select(highwayRef.current)
          .selectAll('path')
          .data(highwayGeoJson.features)
          .enter()
          .append('path')
          .attr('d', geo.geoPath().projection(projection))
          .classed('highway', true);
      })();
    })();
  }, [contest]);

  return (
    <StyledMap ref={mount}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        preserveAspectRatio="xMinYMin meet"
        viewBox={`0 0 ${width} ${height}`}
      >
        <g ref={zoomRef}>
          <g ref={highwayRef} />
          <g ref={precinctsRef} />
        </g>
      </svg>
      <Popper
        open={!!popperData}
        anchorEl={popperData?.anchor}
        placement="left"
        transition
      >
        <Card>
          <CardContent style={{ maxWidth: '300px' }}>
            <Typography variant="overline">PRECINCT / NEIGHBORHOOD</Typography>
            <div>
              {popperData?.geo?.properties?.CONSNAME}{' '}
              {popperData?.geo?.properties?.PRECINCT}
            </div>
            <Typography variant="overline">CONTEST</Typography>
            <div>{contest}</div>
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
    </StyledMap>
  );
};
