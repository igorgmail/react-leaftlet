import { useAppSelector, useAppDispatch, carsSettingsActions } from "../../../store";

import useUpdateData from "./useUpdateData";
import configAdminPage from "../config";

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
    // Если backDrop
    if (configAdminPage.showBackDrop) {
      dispatch(carsSettingsActions.setBackDropShow())
    }

    console.log("▶ ⇛ IN startUpdate:");

    updateDataRequest()
      .then((data) => {
      console.log("▶ ⇛ updateDataRequestdata:", data);
      })
      .catch((err) => {
        console.warn("При обновлении произошла ошибка ", err);
      dispatch(carsSettingsActions.setAlertShow())
        dispatch(carsSettingsActions.setForcedUpdateToogle())
    })
      .finally(() => {
        if (configAdminPage) {
          dispatch(carsSettingsActions.setBackDropHide())
        }
      }
      )
  }

  return { startUpdate }
}




export default useStartUpdate;



