import { useState, useEffect, useMemo } from 'react';
import { Pane, useMap, LayerGroup } from 'react-leaflet';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../store';

import L from 'leaflet';
import 'leaflet-rotatedmarker';
import { IHistoryDataFromServer, IHistoryPoints } from '../../types/carsTypes';
import { Spinner } from '../MainCars/Spinner';
import { IDataFromDateForm } from '../../types/carsTypes';

import isHasToushScreen from '../MainCars/lib/isMobile';
import getHistoryFetch from './lib/getHistoryFetch';

import LayerPoints from './LayerPoints';
import LayersHistoryMarkers from './LayersHistoryMarkers';
import HistoryLayerControl from './HistoryLayerControl';
import BackLayerControl from './BackLayerControl';
// type IPainCars = L.LatLngBoundsExpression | [][] | any

const PaneHistoryMap = () => {

  console.log("'--Render PainHistory");

  const [dataFromServer, setDataFromServer] = useState<IHistoryDataFromServer | null>(null)
  const [pointsBounds, setPointsBounds] = useState<IHistoryPoints[] | []>([])
  const [forFitBounds, setForFitBounds] = useState<L.LatLngBoundsExpression | [][] | any>(null)

  const [historyDataLoad, setHistoryDataLoad] = useState(false)

  const dispatch = useAppDispatch()
  const carsItemFromHistoryForm = useAppSelector((state) => state.carsMap?.carsItemFromHistoryForm);

  const isMobile = useMemo(() => isHasToushScreen(), [])// mobile -> true ? PC -> false

  const map = useMap();


  // Получаем данные с сервера в запросе отправляем данные с формы menuHistory
  // данные с формы получаем из store - carsMapHistotyItem
  // {car_id: "33"
  // carName: "Ларгус Иванов"
  // dataFromIso: "2023-11-13T18:10:00.000+07:00"
  // dataToIso: "2023-11-13T18:17:00.000+07:00"
  // localOffset: 420}
  // ---------------------------
  // С сервера приходят массивы объектов history :
  //
  // {altitude: "231"
  // angle: "232"
  // lat: "53.8827183"
  // lng: "27.5219233"
  // speed: "0"
  // timestamp: "2023-11-13 00:30:19"}
  //
  //
  // массивы points  :[[],[]]
  // {lat: "53.882645"
  // lng: "27.5217466"
  // name: "home"
  // radius: "100"}

  async function historyFetchHandler(data: IDataFromDateForm) {
    // получаем данные с сервера оправляем данные с формы из store
    // Получим либо данные либо пустой объект сформированный в getHistoryFetch
    const historyServerData = await getHistoryFetch(data)

    if (!historyServerData.car_id) {
      // ошибка нет car_id в ответе с сервера
      errorHandler("Нет car_id")
    }
    if (historyServerData.history.length === 0 && historyServerData.points.length === 0) {
      // нет данных 
      errorHandler("оба массива (history и points) пусты")
    }
    const coordHistoryToFitBounds = arrayPointsForBoundsSort(historyServerData.history)
    const coordPointsToFitBounds = arrayPointsForBoundsSort(historyServerData.points)
    coordHistoryToFitBounds.push(...coordPointsToFitBounds)

    setForFitBounds(coordHistoryToFitBounds)
    setPointsBounds(historyServerData.points)
    setDataFromServer(historyServerData)

  }

  function errorHandler(msg: string) {
    console.warn("ERROR -->", msg);

  }

  function arrayPointsForBoundsSort(arr: any) {
    // let result : number[][] = []
    if (arr.length === 0) return []
    const result = arr.reduce(
      (acc: number[][], obj: any) => {
        const lat = parseFloat(obj.lat);
        const lng = parseFloat(obj.lng);

        if (!isNaN(lat) && !isNaN(lng)) {
          // Находим максимальные значения
          acc[0][0] = Math.max(acc[0][0], lat);
          acc[0][1] = Math.max(acc[0][1], lng);

          // Находим минимальные значения
          acc[1][0] = Math.min(acc[1][0], lat);
          acc[1][1] = Math.min(acc[1][1], lng);
        }

        return acc;
      },
      [
        [-Infinity, -Infinity], // Максимальные значения lat и lng
        [Infinity, Infinity]   // Минимальные значения lat и lng
      ]
    );

    return result
  }

  useEffect(() => {
    if (carsItemFromHistoryForm) {
      historyFetchHandler(carsItemFromHistoryForm)

    }
  }, [carsItemFromHistoryForm])


  useEffect(() => {
    return () => {
      // Удаляем кнопки control
      const backElement = document.querySelector('[aria-label="Back"]')?.closest('.leaflet-control');
      const historyElement = document.querySelector('[aria-label="History"]')?.closest('.leaflet-control');
      backElement?.remove()
      historyElement?.remove()
    }
  }, [map]);

  useEffect(() => {
    // После отрисовки всех компонентов истории
    map.whenReady(() => {
      console.log("--Render Useeffect PaneHistoryMap");
      if (forFitBounds && forFitBounds.length > 0) {
        console.log("▶ ⇛ forFitBoundsError:", forFitBounds);
        map.fitBounds(forFitBounds)
        map.zoomOut()
        setHistoryDataLoad(true)
      }

    })

  }, [forFitBounds])

  return (
    <div>
      <BackLayerControl></BackLayerControl>
      <HistoryLayerControl></HistoryLayerControl>

      {!historyDataLoad && <Spinner />}
      <>
      <Pane name="historyMapPane-circleTooltip" style={{ zIndex: 500, width: '100vh', }} />

      <LayerGroup pane='historyMapPane-circleTooltip'>
        {pointsBounds.length && pointsBounds.map((pointItem) => (
          <LayerPoints key={pointItem.name} pointItem={pointItem}></LayerPoints>
        ))}
      </LayerGroup>

      <Pane name="historyMapPane" style={{ zIndex: 300, width: '100vh', }}>
        <LayerGroup pane='historyMapPane'>
            {dataFromServer?.history.length! > 0 && dataFromServer?.history.map((historyItem) => (
            <LayersHistoryMarkers key={uuidv4()} historyFromServer={historyItem}></LayersHistoryMarkers>
          ))}
        </LayerGroup>
      </Pane>
      </>

    </div>
  )
}

export default PaneHistoryMap;

// lat: "53.882645"
// lng: "27.5217466"
// name: "home"
// radius: "100"