import React, { useEffect, useRef, useState } from 'react';
import * as geo from 'd3-geo';
import * as selection from 'd3-selection';
import * as zoom from 'd3-zoom';
import styled from 'styled-components';

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

  useEffect(() => {
    (async () => {
      const { default: precinctGJ } = await import(
        // @ts-ignore
        '../../../data/sandiego.txt'
      );
      const svg = selection.select(svgRef.current);
      const g = selection.select(graphRef.current);

      projection.fitSize([width, height], precinctGJ);

      g.selectAll('path')
        .data(precinctGJ.features)
        .enter()
        .append('path')
        .attr('d', geo.geoPath().projection(projection))
        .on('mouseover', function() {
          selection.select(this as any).raise();
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
    </StyledMap>
  );
};
