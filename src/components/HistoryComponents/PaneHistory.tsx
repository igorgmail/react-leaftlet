import { useState, useEffect, useMemo, FC } from 'react';
import { Pane, useMap } from 'react-leaflet';

import { useAppDispatch, useAppSelector, carsMapActions } from '../../store';

import L from 'leaflet';
import 'leaflet-rotatedmarker';
import { ICarObject, ICompanyData, ICompanyName } from '../../types/carsTypes';


import isHasToushScreen from '../MainCars/lib/isMobile';

import MenuItemCar from '../MenuCars/MenuItemCar';
import HistoryLayerControl from './HistoryLayerControl';
import BackLayerControl from './BackLayerControl';
type IPainCars = L.LatLngBoundsExpression | [][] | any

const PaneHistory: FC<IPainCars> = () => {

  console.log("'--Render PainHistory");

  // mapBounds - массив массивов координат для определения расположения видимой карты
  // carsDataStart - массив объектов с данными cars для первого рендере

  const dispatch = useAppDispatch()
  const carsForMenuFromStore = useAppSelector((state) => state.carsMap?.forMenu);
  const carsFilterObject = useAppSelector((state) => state.carsMap.carsFilter);

  // console.log("▶ ⇛ carsForMenuFromStore:", carsForMenuFromStore);

  const isMobile = useMemo(() => isHasToushScreen(), [])// mobile -> true ? PC -> false

  const map = useMap();


  useEffect(() => {

    return () => {
      const backElement = document.querySelector('[aria-label="Back"]')?.closest('.leaflet-control');

      const historyElement = document.querySelector('[aria-label="History"]')?.closest('.leaflet-control');
      backElement?.remove()
      historyElement?.remove()

    }
  }, [map])
  // Смещение карты при первой загрузке на велечину тултипа
  useEffect(() => {
    map.whenReady(() => {
      if (isMobile) map.zoomOut()
      // map.panBy([0, 28], { animate: true });
    })
  }, [map])

  return (
    <div>
      <BackLayerControl></BackLayerControl>
      <HistoryLayerControl></HistoryLayerControl>
      {/* {companyData &&
        <CustomLayerControl menuHeaderData={menuHeaderData} key={menuHeaderData.company_id}>

          {carsForMenuFromStore && carsForMenuFromStore.map((carData) =>
            (<MenuItemCar carData={carData} key={`menuItem` + carData.car_id}></MenuItemCar>)
          )}

        </CustomLayerControl>} */}

      <Pane name="historyMapPane" style={{ zIndex: 500, width: '100vh', }}>
        {/* {companyData && filterForMarkers.map((el: any) => {
          return <MarkerCar car={el} key={`${el.car_id}-${el.last_track}`} />
        }
        )} */}
      </Pane>

      {/* <Pane name="historyTooltipsPane" style={{ zIndex: 700, width: '100vh', }}>
      </Pane> */}
    </div>
  )
}

export default PaneHistory;