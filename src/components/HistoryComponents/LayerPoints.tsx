import { useState, useEffect, useMemo, FC } from 'react';
import { Pane, useMap, LayerGroup, Circle, Tooltip } from 'react-leaflet';

import { useAppDispatch, useAppSelector, carsMapActions } from '../../store';

import L from 'leaflet';
import 'leaflet-rotatedmarker';
import { IHistoryPoints } from '../../types/carsTypes';

type TLayerPointsProps = {
  pointItem: IHistoryPoints
}

const LayerPoints: FC<TLayerPointsProps> = ({ pointItem }) => {
  console.log("▶ ⇛ pointItem:", pointItem);

  const [historyBounds, setHistoruBounds] = useState()
  // const [pointsBounds, setPointsBounds] = useState<IHistoryPoints[] | []>([])
  // console.log("▶ ⇛ pointsBounds:", pointsBounds);

  const dispatch = useAppDispatch()
  // const carsMapHistotyItem = useAppSelector((state) => state.carsMap?.carsMapHistotyItem);

  const map = useMap();

  useEffect(() => {


  }, [map]);


  return (
    <div>
      <Circle
        center={[Number(pointItem.lat), Number(pointItem.lng)]}
        pathOptions={{ color: 'blue' }}
        radius={Number(pointItem.radius)}
        fillOpacity={0.2}
        weight={2}
      >
        <Tooltip
          position={[Number(pointItem.lat), Number(pointItem.lng)]}
          pane='historyMapPane-circleTooltip'
          permanent
          // offset={[0, -pointItem.radius]}
          direction='bottom'
          opacity={0.8}
        >{pointItem.name}</Tooltip>
      </Circle>
    </div>
  )
}

export default LayerPoints;

// lat: "53.882645"
// lng: "27.5217466"
// name: "home"
// radius: "100"