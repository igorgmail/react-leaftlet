import { useAppSelector, useAppDispatch, carsSettingsActions, store } from "../../../store";
import useApi from "./useApi";

import API_ENDPOINTS from "../utils/apiEndpoints";
import DataExtractor from "../utils/dataExtractor";


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
    if (selectBlock?.typeField === 'cars') {
      url = API_ENDPOINTS.SAVE_CAR
      options = {
        method: 'POST',
        body: JSON.stringify(selectBlock?.selectBlockObject)
      }
      const response = await sendRequest(url, options)

      if (response.data.status === 'error') {
        console.warn("Error in update new car", response.data.message);
        return response
      }
      if (response.data.status === 'ok') {
        const carData = await response.data.car
        console.info("▶FROMSERVER ⇛ Авто обновлено");
        console.info("▶FROMSERVER ⇛ UPDATE_CAR", carData);
        const newData = DataExtractor.createCarDataFromServer(carData)
        dispatch(carsSettingsActions.setUpdateCar(newData))
        dispatch(carsSettingsActions.setCurrentSelectBlock(null))
        return carData
      }
    };

    return { updateDataRequest, abortController: AbortController };
  }

  return { updateDataRequest }
}



export default useUpdateData;
