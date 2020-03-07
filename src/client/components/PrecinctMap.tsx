import React, { useEffect, useRef, useState } from 'react';
import * as geo from 'd3-geo';
import * as selection from 'd3-selection';
import * as zoom from 'd3-zoom';
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const projection = geo.geoMercator();
const StyledMap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  path {
    vector-effect: non-scaling-stroke;
    stroke-width: 0.2;
    stroke: #ddd;
    fill: #7d7d7d;
  }

  path:hover {
    stroke-width: 3;
    stroke: #000;
    z-index: 1;
  }
`;
const width = 600;
const height = 600;

export const PrecinctMap = () => {
  const mount = useRef();
  const svgRef = useRef();
  const graphRef = useRef();
  const [popperData, setPopperData] = useState<any>();

  useEffect(() => {
    (async () => {
      // const { default: geojson } = await import(
      //   // @ts-ignore
      //   '../../../data/sandiego.txt'
      // );
      const { default: geojson } = await import(
        // @ts-ignore
        '../../../data/consolidations.geojson'
      );
      const svg = selection.select(svgRef.current);
      const g = selection.select(graphRef.current);

      projection.fitSize([width, height], geojson);

      g.selectAll('path')
        .data(geojson.features)
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
        });

      const currZoom = zoom
        .zoom()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([1, 25])
        .on('zoom', () => {
          g.attr('transform', selection.event.transform);
        });

      svg.call(currZoom);
      svg.call(
        currZoom.transform,
        zoom.zoomIdentity.translate(-500, -1400).scale(4),
      );
    })();
  }, []);

  return (
    <StyledMap ref={mount}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        preserveAspectRatio="xMinYMin meet"
        viewBox={`0 0 ${width} ${height}`}
      >
        <g ref={graphRef} style={{ position: 'relative' }} />
      </svg>
      <Popper open={!!popperData} anchorEl={popperData?.anchor}>
        <Card>
          <CardContent>
            {popperData?.geo?.properties?.CONSNAME}{' '}
            {popperData?.geo?.properties?.PRECINCT}
          </CardContent>
        </Card>
      </Popper>
    </StyledMap>
  );
};
