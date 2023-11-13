import { useState, useEffect, useMemo, FC } from 'react';
import { Pane, useMap, LayerGroup, Circle } from 'react-leaflet';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector, carsMapActions } from '../../store';

import L from 'leaflet';
import 'leaflet-rotatedmarker';
import { ICarObject, ICompanyData, IHistoryDataFromServer, IHistoryPoints } from '../../types/carsTypes';


import isHasToushScreen from '../MainCars/lib/isMobile';
import getHistoryFetch from './lib/getHistoryFetch';

import LayerPoints from './LayerPoints';
import LayersHistoryMarkers from './LayersHistoryMarkers';
import HistoryLayerControl from './HistoryLayerControl';
import BackLayerControl from './BackLayerControl';
// type IPainCars = L.LatLngBoundsExpression | [][] | any


const PaneHistoryMap = () => {

  console.log("'--Render PainHistory");

  const [historyBounds, setHistoruBounds] = useState()
  const [dataFromServer, setDataFromServer] = useState<IHistoryDataFromServer | null>(null)
  const [pointsBounds, setPointsBounds] = useState<IHistoryPoints[] | []>([])
  const [boundsForSetMap, setBoundsForSetMap] = useState<L.LatLngBoundsExpression | [][] | any>(null)

  const dispatch = useAppDispatch()
  const carsMapHistotyItem = useAppSelector((state) => state.carsMap?.carsMapHistotyItem);
  // const carsFilterObject = useAppSelector((state) => state.carsMap.carsFilter);

  // console.log("▶ ⇛ carsForMenuFromStore:", carsForMenuFromStore);

  const isMobile = useMemo(() => isHasToushScreen(), [])// mobile -> true ? PC -> false

  const map = useMap();


  // Получаем данные с сервера в запросе отправляем данные с формы menuHistory
  // данные с формы получаем из store - carsMapHistotyItem
  // {car_id: "33"
  // carName: "Ларгус Иванов"
  // dataFromIso: "2023-11-13T18:10:00.000+07:00"
  // dataToIso: "2023-11-13T18:17:00.000+07:00"
  // localOffset: 420}

  useEffect(() => {
    if (dataFromServer) {
      let boundsArray: any = []

      if (dataFromServer.history.length > 0) {
        boundsArray = dataFromServer.history.map((item) => {
          return [Number(item.lat), Number(item.lng)]
        })
      }
      if (pointsBounds.length > 0) {
        pointsBounds.map((pointItem) => {
          boundsArray.push([Number(pointItem.lat), Number(pointItem.lng)])
        })
      }
      if (boundsArray.length > 0) {
        setBoundsForSetMap(boundsArray)
        map.fitBounds(boundsArray)
      }
    }


  }, [dataFromServer])


  useEffect(() => {
    if (carsMapHistotyItem) {
      try {
        const interval = getHistoryFetch(carsMapHistotyItem)
        interval.then((data) => {
          console.log("Получили с сервера");
          console.log("-----------------");
          console.log(data);
          console.log("-----------------");

          setPointsBounds(data.points)


          setDataFromServer(data)
        })
      } catch (error) {
        console.log("Ошибка при запросе к истории", error);

      }

    }
  }, [map]);

  useEffect(() => {
    return () => {
      // Удаляем кнопки control
      const backElement = document.querySelector('[aria-label="Back"]')?.closest('.leaflet-control');
      const historyElement = document.querySelector('[aria-label="History"]')?.closest('.leaflet-control');
      backElement?.remove()
      historyElement?.remove()
    }
  }, [map])

  // // Смещение карты при первой загрузке на велечину тултипа
  // map.whenReady(() => {
  //   if (isMobile) map.zoomOut()
  //   // map.panBy([0, 28], { animate: true });
  //   map.fitBounds(boundsForSetMap)
  // })

  return (
    <div>
      <BackLayerControl></BackLayerControl>
      <HistoryLayerControl></HistoryLayerControl>

      <Pane name="historyMapPane-circleTooltip" style={{ zIndex: 500, width: '100vh', }} />
      <LayerGroup pane='historyMapPane-circleTooltip'>
        {pointsBounds.length && pointsBounds.map((pointItem) => (
          <LayerPoints key={pointItem.name} pointItem={pointItem}></LayerPoints>
        ))}
      </LayerGroup>

      <Pane name="historyMapPane" style={{ zIndex: 300, width: '100vh', }}>
        <LayerGroup pane='historyMapPane'>
          {dataFromServer?.history.length && dataFromServer.history.map((historyItem) => (
            <LayersHistoryMarkers key={uuidv4()} historyFromServer={historyItem}></LayersHistoryMarkers>
          ))}
        </LayerGroup>
      </Pane>

    </div>
  )
}

export default PaneHistoryMap;

// lat: "53.882645"
// lng: "27.5217466"
// name: "home"
// radius: "100"