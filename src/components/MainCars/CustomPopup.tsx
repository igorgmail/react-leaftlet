import React, { FC, useState, useEffect, useRef, useMemo } from 'react';
import { Marker as LeafletMarker, Popup, Tooltip, useMap } from 'react-leaflet';

import L from 'leaflet';
import 'leaflet-rotatedmarker';

import { ICars } from '../../types/carsTypes';
import NoConnection from './SvgIcon';
import style from './style.module.css';
import carsPageconfig from './lib/config';
import { Interface } from 'readline';
import isHasToushScreen from './lib/isMobile';

interface ICustomPopup {
  speed: string,
}
const CustomPopup: FC<ICustomPopup> = React.memo(({ speed }) => {
  const isMobile = useMemo(() => isHasToushScreen(), [])
  console.log("▶ ⇛ isMobile:", isMobile);
  console.log("---Render Popup");

  console.log("▶ ⇛ speed:", speed);


  const [refReady, setRefReady] = useState(false);
  let popupRef = useRef(null)


  return (isMobile ?
    (<Popup autoPan={true}
      // ref={popupRef}
      ref={(r) => {
        console.log("REF", r);

        // setRefReady(true);
      }}
    >
      <p>{`скорость ${speed} км/ч`}</p>
    </Popup>) : null

  )



})

export default CustomPopup;