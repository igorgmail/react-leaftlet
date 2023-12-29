import { useAppSelector, useAppDispatch, carsSettingsActions, store } from "../../../store";
import useApi from "./useApi";

import API_ENDPOINTS from "../utils/apiEndpoints";
import DataExtractor from "../utils/dataExtractor";
import { ICarObject, TEventsDataForServer, TPointsData, TUsers } from "../types/carsSettingsTypes";
import useUpdateData from "./useUpdateData";
import { useEffect } from "react";

const apiEndpoint = process.env.REACT_APP_API_SETTINGS;

type Tmethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IRequestOptions {
  method: Tmethod;
  body?: BodyInit | null;
}

function useStartUpdate() {

  const { updateDataRequest } = useUpdateData()
  const dispatch = useAppDispatch()

  const alertShowState = useAppSelector((store) => store.carsSettings.config.alertShow)
  const forcedUpdateState = useAppSelector((store) => store.carsSettings.config.forcedUpdateToogle)
  // const selectBlock = useAppSelector((store) => store.carsSettings.config.currentSelectBlock)

  function startUpdate() {
    console.log("▶ ⇛ IN startUpdate:");

    // startBackDrop()
    updateDataRequest().then((data) => {
      console.log("▶ ⇛ updateDataRequestdata:", data);

    }).catch((err) => {
      console.warn("При обновлении произошла ошибка ", err);

      dispatch(carsSettingsActions.setAlertShow())
      dispatch(carsSettingsActions.setForcedUpdateToogle())
      // showAlert('Ошибка при обновлении', 'error')

    })
  }

  return { startUpdate }
}




export default useStartUpdate;



