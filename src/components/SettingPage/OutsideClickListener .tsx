import { FC, useEffect } from 'react';
import { useAppDispatch, carsSettingsActions, useAppSelector, store } from '../../store';
import useUpdateData from './hooks/useUpdateData';
import useBackDrop from './hooks/useBackdrop';
import useAlert from './hooks/useAlert';

type TOutsideClickProps = {
  setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const OutsideClickListener: FC<TOutsideClickProps> = ({ setUpdateForm }) => {

  const dispatch = useAppDispatch()
  const chooseInput = useAppSelector((store) => store.carsSettings.config.chooseInputName)
  const { updateDataRequest } = useUpdateData()
  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop()
  const { showAlert, alertComponent } = useAlert()



  function startUpdate() {

    // startBackDrop()
    updateDataRequest().then((data) => {
      if (data.error) {
        showAlert('Ошибка', data.error.message)
        setUpdateForm((cur) => !cur)
      }
    })
  }


  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {
      const targ = event.target as HTMLElement
      const posibleDataAttr = targ.dataset?.forstore

      if (chooseInput === null) return
      // если клик на томе input
      if (chooseInput === posibleDataAttr) return
      if (chooseInput) dispatch(carsSettingsActions.setChooseInputName(null))
      if (store.getState().carsSettings.config.currentSelectBlock) {
        console.log("Будет отправлено на сервер");
        console.log(store.getState().carsSettings.config.currentSelectBlock);
        startUpdate()
      }
      return
    }


    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [chooseInput, dispatch]);



  return (
    <>
      {BackDropComponent}
      {alertComponent}
    </>
  )
}
export default OutsideClickListener 