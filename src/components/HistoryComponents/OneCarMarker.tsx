import { FC, useState, useEffect, useMemo, useLayoutEffect } from 'react';

import { Marker as LeafletMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-rotatedmarker';

import { useAppSelector } from '../../store';

import isHasToushScreen from '../MainCars/lib/isMobile';
import carsPageconfig from '../MainCars/lib/config';
import getCarsFetch from '../MainCars/lib/fetchGetCars';

import { ICarObject } from '../../types/carsTypes';

interface OneCarProps {
  carStartData: ICarObject,
}
interface IiconImageSize {
  width: number;
  height: number;
}

const OneCarMarker: FC<OneCarProps> = ({ carStartData }) => {

  const isMobile = useMemo(() => isHasToushScreen(), [])// mobile -> true ? PC -> false
  const carId = useAppSelector((state) => state.carsMap.carsItemFromHistoryForm?.car_id);

  // Что бы изменить размер картики нужно поменять только width
  const [imageSize, setImageSize] = useState<IiconImageSize>({ width: 16, height: 0 })
  const [oneCarData, setOneCarData] = useState<ICarObject>(carStartData)

  function getImgUrl(id: string) {
    if (Number(id) === 1) return process.env.PUBLIC_URL + '/img/car1.png'
    if (Number(id) === 2) return process.env.PUBLIC_URL + '/img/car2.png'
    if (Number(id) === 33) return process.env.PUBLIC_URL + '/img/car3.png'
    return ''
  }

  useLayoutEffect(() => {
        var img = new Image();
        img.src = getImgUrl(oneCarData!.car_id)
    img.onload = function (e) {
          var width = img.width;
          var height = img.height;
          const proportions = Math.round(height / width)
      setImageSize({ ...imageSize, height: imageSize.width * proportions })
    };
  }, [])

  useEffect(() => {
    const abortController = new AbortController();
    const interval = setInterval(async () => {
      const carDataFromServer = await getCarsFetch(abortController)
      if (carDataFromServer) {
        const oneCarData = carDataFromServer.cars.find((el) => el.car_id === carId)!
        setOneCarData(oneCarData)
      }
    }, carsPageconfig.updateDelay)

    return () => {
      clearInterval(interval)
      abortController.abort();
    };

  }, [imageSize, carId]);


  return (
    oneCarData && <LeafletMarker
      eventHandlers={{
        /*         add: () => onLoadMarker(),
                loading: () => { console.log("MARKER READY") }
                mouseover: (e) => mouseOverMarkerHandler(),
                mouseout: (e) => mouseOutMarkerHandler(), */
        click: (e) => {
          // mouseClickMarkerHandler()
        }
      }}
      // data={`markerKey-${item.unicKey}`}
      pane={"OneCarMarker"}
      // ref={tooltipRef}
      // title={`скорость ${car.speed} км/ч`}
      position={[Number(oneCarData.lat), Number(oneCarData.lng)]}
      rotationAngle={90}
      rotationOrigin={'center'}
      riseOnHover

      icon={
        new L.Icon({
          iconUrl: getImgUrl(oneCarData.car_id),
          iconSize: [imageSize.width, imageSize.height],
          // iconAnchor: [16, 32],
          popupAnchor: [0, 0],
          shadowSize: [32, 32],
          shadowAnchor: [32, 72],
          // className: `${!isConnection && style.carIcon}`,

        })
      }
    >

    </LeafletMarker>
  )
}

export default OneCarMarker