import PlaceIcon from '@mui/icons-material/Place';
import { FC, useRef, useState } from 'react';

import { useMap, useMapEvents } from 'react-leaflet';
import { useAppDispatch, useAppSelector, carsSettingsActions } from '../../../../store';


type Tcoord = {
  lat: number,
  lng: number
}

type TPinMarkerProps = {
  // setCoord: (coord: Tcoord) => void
  // handleSaveButton: (coord: Tcoord) => void
}

const PinMarker: FC<TPinMarkerProps> = () => {

  const map = useMap()
  const dispatch = useAppDispatch()
  const [pinMove, setPinMove] = useState(false)


  useMapEvents({
    movestart: () => {
      setPinMove(true)
      console.log("MOVE START");

      dispatch(carsSettingsActions.setMapMove(true))

      // setCoord({ ...map.getCenter() }!)
    },
    moveend: () => {
      setPinMove(false)

      const center = map.getCenter()
      dispatch(carsSettingsActions.setMapCenter(center))
      dispatch(carsSettingsActions.setMapMove(false))

    },
    // zoomstart: () => {
    //   console.log('Масштаб карты начал меняться');
    // },
    // zoomend: () => {
    //   console.log('Масштаб закончил меняться');
    // },
    viewreset: () => {
      console.log('Вид карты сброшен');
    },
    resize: () => {
      console.log('Размер карты изменен');
    }
  });

  return (
    <PlaceIcon
      className={!pinMove ? "map-marker-centered" : "map-marker-centered bounce-marker"}
      sx={{ zIndex: '1500' }}
    ></PlaceIcon>
  )
}
export default PinMarker