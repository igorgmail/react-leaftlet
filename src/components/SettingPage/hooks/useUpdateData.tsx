import { useAppSelector, useAppDispatch, carsSettingsActions, store } from "../../../store";
import useApi from "./useApi";

import API_ENDPOINTS from "../utils/apiEndpoints";
import DataExtractor from "../utils/dataExtractor";
import { ICarObject, TPointsData } from "../types/carsSettingsTypes";


const apiEndpoint = process.env.REACT_APP_API_SETTINGS;

type Tmethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IRequestOptions {
  method: Tmethod;
  body?: BodyInit | null;
}

function useUpdateData() {

  const username = 'test';
  const password = '123';

  const { sendRequest } = useApi()
  const dispatch = useAppDispatch()
  // const selectBlock = useAppSelector((store) => store.carsSettings.config.currentSelectBlock)

  const updateDataRequest = async () => {
    const selectBlock = store.getState().carsSettings.config.currentSelectBlock

    let url;
    let options: IRequestOptions;
    let param;

    if (selectBlock?.typeField === 'cars') {
      const car = selectBlock.selectBlockObject as ICarObject
      param = `?car_id=${car.car_id}&car_name=${car.name}&icon=${car.pic}&imei=${car.imei}&alter_imei=${car.alter_imei}`
      url = API_ENDPOINTS.SAVE_CAR + param
      options = {
        method: 'POST',
        // body: JSON.stringify(selectBlock?.selectBlockObject),
      }
      const response = await sendRequest(url, options)

      if (response.data.status === 'Ok') {
        const carData = await response.data.car

        const newData = DataExtractor.createCarDataFromServer(carData)

        dispatch(carsSettingsActions.setUpdateCar(newData))
        dispatch(carsSettingsActions.setCurrentSelectBlock(null))

        return carData
      } else {
        console.warn("Error in update new car", response.data.message);
        throw new Error(response.data.message);
      }
    };

    if (selectBlock?.typeField === 'points') {
      const point = selectBlock.selectBlockObject as TPointsData
      param = `?point_id=${point.point_id}&point_name=${point.name}&address=${point.address}&lat=${point.lat}&lng=${point.lng}&radius=${point.radius}`
      url = API_ENDPOINTS.SAVE_POINT + param
      options = {
        method: 'POST',
        // body: JSON.stringify(selectBlock?.selectBlockObject),
      }
      const response = await sendRequest(url, options)

      if (response.data.status === 'Ok') {
        const pointData = await response.data.point

        // const newData = DataExtractor.createCarDataFromServer(carData)

        dispatch(carsSettingsActions.setUpdatePoint(pointData))
        dispatch(carsSettingsActions.setCurrentSelectBlock(null))

        return pointData
      } else {
        console.warn("Error in update new car", response.data.message);
        throw new Error(response.data.message);
      }
    };
  }

  return { updateDataRequest }
}



export default useUpdateData;
