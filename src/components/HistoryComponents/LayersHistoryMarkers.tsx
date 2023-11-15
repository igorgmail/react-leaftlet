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

  const dispatch = useAppDispatch()
  // const carsMapHistotyItem = useAppSelector((state) => state.carsMap?.carsMapHistotyItem);

  const map = useMap();

  // Создаем div для портала
  // const rootEl = document.getElementById('root')!;
  // const iconContainer = document.createElement('div');
  // rootEl.appendChild(portalContainer);

  // Рендерим JSX-компонент внутри портала
  // render(<Provider store={store}><IconPoint /></Provider>, iconContainer);

  const mapRef = useRef(null);

  useEffect(() => {
    map.whenReady(() => {
      if (isMobile) map.zoomOut()
      // map.panBy([0, 28], { animate: true });
      // map.fitBounds(mapBounds)
    })

    return () => {
      const menuElement = document.querySelector('[aria-label="Map settings"]')?.closest('.leaflet-control');
      menuElement?.remove()
    }
  }, [map])

  const r = 6//carsPageconfig.historyMarkerRadius
  const createPointIcon = () => {
    return new L.DivIcon({
      className: 'custom-point-icon',
      html: `<svg width="${r * 2}" height="${r * 2}"><circle cx="${r}" cy="${r}" r="${r}" fill="red" /></svg>`,
      iconSize: [10, 10],
    });
  };


  return (
    <PointMarker
      pane={"historyMapPane"}
      position={[Number(historyFromServer.lat), Number(historyFromServer.lng)]}
      icon={createPointIcon()}
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