import { FC, useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } from 'react';
import { DateTime } from "luxon";

import { Provider } from 'react-redux/es/exports';
import { createRoot } from 'react-dom/client';

import { Marker as LeafletMarker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-rotatedmarker';

import { store } from '../../store'
import { useAppDispatch, useAppSelector, carsMapActions } from '../../store';
import { IconDisconnect } from '../HistoryComponents/IconComponent/IconDisconnect';
import isHasToushScreen from '../MainCars/lib/isMobile';
import carsPageconfig from '../MainCars/lib/config';
import getCarsFetch from '../MainCars/lib/fetchGetCars';

import { ICarObject } from '../../types/carsTypes';

import HistoryMenu from '../HistoryComponents/HistoryMenu';

import style from './style.module.css';

interface OneCarProps {
  carId: string | number,
}
interface IiconImageSize {
  width: number;
  height: number;
}

const OneCarMarker: FC<OneCarProps> = ({ carId }) => {
  console.log("▶ ⇛ carId:", carId);
  const map = useMap()
  const dispatch = useAppDispatch()
  let tooltipRef = useRef<any>(null)


  const isMobile = useMemo(() => isHasToushScreen(), [])// mobile -> true ? PC -> false

  // const carsIsConnectFilter = useAppSelector((state) => state.carsMap.isConnectFilter);

  // Что бы изменить размер картики нужно поменять только width
  const [imageSize, setImageSize] = useState<IiconImageSize>({ width: 16, height: 0 })
  const [oneCarData, setOneCarData] = useState<ICarObject | null>(null)
  console.log("▶ ⇛ oneCarData:", oneCarData);

  function getImgUrl(id: number) {
    if (Number(id) === 1) return process.env.PUBLIC_URL + '/img/car1.png'
    if (Number(id) === 2) return process.env.PUBLIC_URL + '/img/car2.png'
    if (Number(id) === 33) return process.env.PUBLIC_URL + '/img/car3.png'
    return ''
  }


  // async function getImageSize(carData: ICarObject) {
  //   var img = new Image();
  //   img.src = getImgUrl(carData!.car_id)

  //   img.onload = function () {
  //     var width = img.width;
  //     var height = img.height;
  //     const proportions = Math.round(height / width)
  //     setImageSize({ ...imageSize, height: imageSize.width * proportions })
  //   };
  // }


  useLayoutEffect(() => {
    const abortController = new AbortController();
    getCarsFetch(abortController)
      .then((allCaraData) => {
        const oneCarData = allCaraData.cars.find((el) => el.car_id === carId)

        var img = new Image();
        img.src = getImgUrl(oneCarData!.car_id)
        console.log("▶ ⇛ img.src:", img.src);
        img.onload = function () {
          var width = img.width;
          var height = img.height;
          const proportions = Math.round(height / width)
          setImageSize({ ...imageSize, height: imageSize.width * proportions })
          setOneCarData(oneCarData!)
        };
      })


  }, [])

  useEffect(() => {

    // const carData = getCarData()

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

  }, [imageSize]);


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