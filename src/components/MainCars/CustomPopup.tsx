import React, { FC, useState, useEffect, useRef, ForwardRefExoticComponent } from 'react';
import { Marker as LeafletMarker, Popup, Tooltip, useMap } from 'react-leaflet';

import L from 'leaflet';
import 'leaflet-rotatedmarker';

import { ICars } from '../../types/carsTypes';
import NoConnection from './SvgIcon';
import style from './style.module.css';
import carsPageconfig from './lib/config';
import { Interface } from 'readline';

interface ICustomPopup {
  speed: string,
  key: number
}
const CustomPopup: FC<ICustomPopup> = React.memo(({ speed, key }) => {
  console.log("---Render Popup");

  console.log("▶ ⇛ speed:", speed);


  const [refReady, setRefReady] = useState(false);
  let popupRef = useRef(null)


  return (
    <Popup autoPan={true}
      // ref={popupRef}
      ref={(r) => {
        console.log("REF", r);

        // setRefReady(true);
      }}
    >
      <p>{`скорость ${speed} км/ч`}</p>
    </Popup>
  )
})

export default CustomPopup;