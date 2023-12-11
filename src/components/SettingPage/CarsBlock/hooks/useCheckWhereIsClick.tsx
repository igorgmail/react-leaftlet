import React from "react"
import { useAppSelector, useAppDispatch, carsSettingsActions } from "../../../../store";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

enum EWhereClick {
  SAME = 'same', // тот же элемент
  SIMILAR = 'similar', // то же нтерактивный элемент
  ANOTHER = 'another', // что то другое

}
function useCheckWhereIsClick() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch()

  const chooseInput = useAppSelector((store) => store.carsSettings.config.chooseInputName)



  const checkWhereClick = (event: MouseEvent) => {

    const target = event.target as HTMLElement
    // получаем значение атрибута data-forstore
    const attrValue = target.dataset?.forstore

    // Если currentSelectBlock === null и элемент не имеет аттрибута data-interactive
    // то сразу выходим
    if (chooseInput === null && !target.dataset?.interactive) {
      return
    }

    // Обрабатываем клик на картинке
    if (target.hasAttribute('data-interactive') && target.hasAttribute('data-interactive-image')) {
      console.log("IN IF");
      if (attrValue) dispatch(carsSettingsActions.setChooseInputName(attrValue))
    }


    // Если клик на том же элементе который в currentSelectBlock
    // То ничего ни делаем выходим
    if (attrValue === chooseInput) {
      return
    }

    // Если клик не на интерактивном элементе и currentSelectBlock не null
    // То обнуляем currentSelectBlock

    const touchNumber = event.detail
    console.log("▶ ⇛⇛USE touchNumber:", touchNumber);
    try {

      // Тот же елемент
      if (chooseInput === attrValue) {
        return EWhereClick.SAME
      }

      //  Другой интерактивный элемент имеет аттрибут data-forStore
      if (target.hasAttribute('data-forstore')) {
        return EWhereClick.SIMILAR
      }

      return EWhereClick.ANOTHER



    } catch (error) {

      console.warn("Ошибка при получении аттрибута data-forstore");

      return null
    }

  }


  return checkWhereClick
}


export default useCheckWhereIsClick;