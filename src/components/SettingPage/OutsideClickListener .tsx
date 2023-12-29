import { FC, useEffect } from 'react';
import { useAppDispatch, carsSettingsActions, useAppSelector, store } from '../../store';
import useUpdateData from './hooks/useUpdateData';
import useBackDrop from './hooks/useBackdrop';
import useAlert from './hooks/useAlert';
import useStartUpdate from './hooks/useStartUpdate';

type TOutsideClickProps = {
  setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const OutsideClickListener: FC<TOutsideClickProps> = ({ setUpdateForm }) => {

  const dispatch = useAppDispatch()
  const chooseInput = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const { startUpdate } = useStartUpdate()


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
    </>
  )
}
export default OutsideClickListener 