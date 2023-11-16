import { useState, useEffect, useMemo, useRef, FC } from 'react';
import ReactDOMServer, { render } from 'react-dom';
import { Pane, useMap, LayerGroup, Circle, Tooltip, Polyline } from 'react-leaflet';
import { Marker as PointMarker } from 'react-leaflet';
import { useAppDispatch, useAppSelector, carsMapActions } from '../../store';
import { Provider } from 'react-redux/es/exports';
import { store } from '../../store'

import L from 'leaflet';
import 'leaflet-rotatedmarker';
import { IHistoryPoints, IHistoryCar } from '../../types/carsTypes';
import { IconPoint } from './IconComponent/IconPoint'
import isHasToushScreen from '../MainCars/lib/isMobile';
import carsPageconfig from '../MainCars/lib/config';
type TLayerHistoryMarkersProps = {
  historyFromServer: IHistoryCar
}

const LayersHistoryMarkers: FC<TLayerHistoryMarkersProps> = ({ historyFromServer }) => {
  const isMobile = useMemo(() => isHasToushScreen(), [])// mobile -> true ? PC -> false
  const [historyBounds, setHistoruBounds] = useState()
  // const [pointsBounds, setPointsBounds] = useState<IHistoryPoints[] | []>([])
  console.log("---Render LayersHistoryMarkers");
  const [iconRadius, setIconRadius] = useState(carsPageconfig.historyMarkerRadius) // defualt 6
  const dispatch = useAppDispatch()
  // const carsMapHistotyItem = useAppSelector((state) => state.carsMap?.carsMapHistotyItem);

  const map = useMap();

  useEffect(() => {

    return () => {
      const menuElement = document.querySelector('[aria-label="Map settings"]')?.closest('.leaflet-control');
      menuElement?.remove()
    }
  }, [map])

  map.on('zoom', function () {
    const carMapZoom = map.getZoom()
    if (carMapZoom > 15) setIconRadius(6)
    if (carMapZoom < 15) setIconRadius(3)
  });

  const createPointIcon = () => {
    return new L.DivIcon({
      className: 'custom-point-icon',
      html: `<svg width="${iconRadius * 4}" height="${iconRadius * 4}"><circle cx="${iconRadius}" cy="${iconRadius}" r="${iconRadius}" fill="red" /></svg>`,
      // iconSize: [8, 8],
      iconAnchor: [iconRadius, iconRadius]

    });
  };


  return (
    <PointMarker
      pane={"historyMapPane"}
      position={[Number(historyFromServer.lat), Number(historyFromServer.lng)]}
      icon={createPointIcon()
      }
    // riseOnHover
    >

      <Tooltip
        pane='historyMapPane'
        eventHandlers={{
          // add: () => onLoadTooltip()

        }}
        // permanent={true}
        direction="top" opacity={1}
      >
        {historyFromServer.timestamp}
      </Tooltip>
    </PointMarker>
  )
}

export default LayersHistoryMarkers;

// lat: "53.882645"
// lng: "27.5217466"
// name: "home"
// radius: "100"