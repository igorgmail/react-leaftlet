import { FC, useEffect } from "react";
import useAlert from "../hooks/useAlert";
import useBackDrop from "../hooks/useBackdrop";
import useUpdateData from "../hooks/useUpdateData";
import { useAppSelector } from "../../../store";


interface IForcedUpdateProps {
  setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
}

const ForcedUpdate: FC<IForcedUpdateProps> = ({ setUpdateForm }) => {

  const alertShowState = useAppSelector((store) => store.carsSettings.config.alertShow)
  const forcedUpdateState = useAppSelector((store) => store.carsSettings.config.forcedUpdateToogle)

  const { updateDataRequest } = useUpdateData()
  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { showAlert, alertComponent } = useAlert()

  useEffect(() => {
    if (alertShowState) showAlert('Ошибка при обновлении', 'error')
  }, [alertShowState])

  useEffect(() => {
    setUpdateForm((cur) => !cur)
  }, [forcedUpdateState])

  return (
    <>
      {alertComponent}
      {BackDropComponent}
    </>
  )
}
export default ForcedUpdate