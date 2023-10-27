import React, { FC, useState, useEffect, useRef } from 'react';
import { Marker as LeafletMarker, Popup, Tooltip } from 'react-leaflet';

import L from 'leaflet';
import 'leaflet-rotatedmarker';

import { ICars } from '../../types/carsTypes';
import NoConnection from './SvgIcon';
import style from './style.module.css';
import carsPageconfig from './lib/config';
interface CarProps {
  car: ICars
}
interface IiconImageSize {
  width: number;
  height: number;
}
const MarkerCar: FC<CarProps> = React.memo(({ car }) => {

  const tooltipRef = useRef<any>(null)
  // Что бы изменть размер картики нужно поменять только width
  const [imageSize, setImageSize] = useState<IiconImageSize>({ width: 16, height: 0 })

  function timeDifference(dateString: string) {
    const lastTrack = new Date(dateString)
    const dif = Date.now() - lastTrack.getTime()
    const oneHour = carsPageconfig.differentTime

    return dif < oneHour // Если с последнего track прошло меньше часа - true иначе false
  }
  const isConnection = timeDifference(String(car.last_track))

  function getImgUrl(id: number) {
    if (Number(id) === 1) return process.env.PUBLIC_URL + '/img/car1.png'
    if (Number(id) === 2) return process.env.PUBLIC_URL + '/img/car2.png'
    if (Number(id) === 33) return process.env.PUBLIC_URL + '/img/car3.png'
    return ''
  }

  useEffect(() => {
    var img = new Image();
    img.src = getImgUrl(car.car_id)//car.pic;

    img.onload = function () {
      var width = img.width;
      var height = img.height;
      const proportions = Math.round(height / width)
      setImageSize({ ...imageSize, height: imageSize.width * proportions })
    };


  }, [car, imageSize])


  const onLoadMarker = () => {
  }
  const onLoadTooltip = () => {
  }

  return (
    <LeafletMarker
      eventHandlers={{
        add: () => onLoadMarker(),
        // loading: () => { console.log("MARKER READY") }

      }}
      // data={`markerKey-${item.unicKey}`}
      pane={"myPane"}
      ref={tooltipRef}
      title={`скорость ${car.speed} км/ч`}
      position={[Number(car.lat), Number(car.lng)]}
      rotationAngle={Number(car.angle)}
      rotationOrigin={'center'}
      riseOnHover
      icon={
        new L.Icon({
          iconUrl: getImgUrl(car.car_id),//iconUrlCar,//car.pic,
          iconSize: [imageSize.width, imageSize.height],
          // iconAnchor: [16, 32],
          popupAnchor: [0, 0],
          shadowSize: [32, 32],
          shadowAnchor: [32, 72],
          // className: `${!isConnection && style.carIcon}`,

        })
      }
    >
      {imageSize.height && <Tooltip
        eventHandlers={{
          add: () => onLoadTooltip()

        }}
        permanent={true}
        direction="bottom" offset={[0, imageSize.height / 2]} opacity={1}
        className={style.lfTooltip}
      >
        <div
          className={isConnection ? [style.carTooltip, style.carBgWhite].join(' ') : [style.carTooltip, style.carBgGrey].join(' ')}
        >
          {car.car_name}
          {!isConnection && <NoConnection />}
        </div>

      </Tooltip>}
      {/* <Popup autoPan={true}>
        <p>{car.angle}</p>
      </Popup> */}
    </LeafletMarker>
  )
}
)

export default MarkerCar