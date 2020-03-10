import React, { useState, useEffect } from 'react';

interface RoadLayerProps {
  getPath(road: any): string;
}

export const RoadLayer = ({ getPath }: RoadLayerProps) => {
  const [roads, setRoads] = useState<any>();

  useEffect(() => {
    (async () => {
      const { default: roads } = await import(
        // @ts-ignore
        '../../../data/highways.geojson'
      );
      setRoads(roads);
    })();
  }, []);

  return (
    !!roads &&
    roads.features.map(road => (
      <path key={road.properties.OBJECTID} d={getPath(road)} />
    ))
  );
};
