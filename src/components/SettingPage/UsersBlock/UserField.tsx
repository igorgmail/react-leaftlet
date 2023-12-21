import { Box, Divider, Grid, Stack } from "@mui/material"
import { FC, useEffect, useState } from "react"
import RemoveDialog from "../components/RemoveDialog"
import { TEventForDialog, TEventFromDialog, TEventsData, TRemoveDialogCallback, TSelectedFieldChanged, TUsers } from "../types/carsSettingsTypes"

import useBackDrop from "../hooks/useBackdrop";
import useRemoveDialog from "../hooks/useRemoveDialog";
import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";
import SelectBlock from "../components/SelectBlock";
import useUpdateData from "../hooks/useUpdateData";
import useAlert from "../hooks/useAlert";

interface IUserFieldProps {
  oneUser: TUsers,
  setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
}



const UserField: FC<IUserFieldProps> = ({ oneUser, setUpdateForm }) => {

  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const [userId, setUserId] = useState(oneUser.user_id)
  const [userEmail, setUserEmail] = useState(oneUser.user_email)
  const [userRole, setUserRole] = useState(oneUser.user_role)

  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { showAlert, alertComponent } = useAlert()
  const { sendRemove } = useRemoveDialog()
  const dispatch = useAppDispatch()
  const { updateDataRequest } = useUpdateData()

  const handleDialog = (eventData: TEventFromDialog) => {
    startBackDrop()
    sendRemove(eventData)
      .then((data) => {
        if (data?.data) {
          const id = data.data
          dispatch(carsSettingsActions.setRemoveUser(id))
          stopBackDrop()
        } else {
          console.info("При удалении Пользователя с сервера пришли некорректные данные");

        }
      }).catch((err) => {
        console.warn("ERROR, Ошибка при удалении Пользователя", err);
      }).finally(() => stopBackDrop())
  }


  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const objectIndex = e.target.value
    // console.log("Индекс объекта", objectIndex);

    const selectedIndex = e.target.options.selectedIndex;
    // console.log("Порядковый номер", selectedIndex);

    const selectedOption = e.target.options[selectedIndex];
    const selectedData = selectedOption.dataset.optionName;

    if (selectedData === 'option-role') {
      setUserRole(objectIndex)
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, user_role: objectIndex } }))
      startUpdate()
    }
  }
  const eventObject: TSelectedFieldChanged = {
    typeField: 'users',
    selectBlockObject: {
      user_id: userId,
      user_email: userEmail,
      user_role: userRole,
    }
  }
  function startUpdate() {
    console.log("▶ ⇛ IN startUpdate:");

    // startBackDrop()
    updateDataRequest().then((data) => {
      console.log("▶ ⇛ updateDataRequestdata:", data);

    }).catch((err) => {
      console.warn("При обновлении произошла ошибка ", err);

      showAlert('Ошибка при обновлении', 'error')
      setUpdateForm((cur) => !cur)
    })
  }

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    event.preventDefault()
    const touchNumber = event.detail

    if (touchNumber === 2) {
      const targ = event.currentTarget
      const dataValue = targ.dataset.forstore
      const inputType = event.currentTarget.type
      targ.focus()

      if (dataValue === chooseInputFromStore) return
      if (dataValue) dispatch(carsSettingsActions.setChooseInputName(dataValue))

      // Установка курсора в конец текста
      if (inputType === 'number') {
        targ.type = 'text'
        const textLength = targ.value.length;
        targ.setSelectionRange(textLength, textLength);
        targ.type = 'number'
      } else {
        const textLength = targ.value.length;
        targ.setSelectionRange(textLength, textLength);
      }
    }
  }

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setUserEmail(email)
    dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, user_email: email } }))
  }

  const makeEventData = (eventObject: any) => {

    const eventData: TEventForDialog = {
      event: 'REMOVE_USER',
      subjectid: eventObject.user_id,
      msg: `Будет удален пользователь <br>${eventObject.user_email}`
    }

    return eventData
  }

  useEffect(() => {
    setUserId(oneUser.user_id)
    setUserEmail(oneUser.user_email)
    setUserRole(oneUser.user_role)
  }, [oneUser])
  return (
    <>
      <Grid
        key={`user-block-` + oneUser.user_id}
        container
        sx={{
          backgroundColor: 'white',
          paddingLeft: '.8rem'
        }}
      >
        {/* Email */}
        <Grid item xs={6} display={'flex'} justifyContent={'flex-start'}>
          <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} >

            {/* Remove Button */}
            <RemoveDialog callback={handleDialog}
              eventData={makeEventData(oneUser)}
            />

            <input
              onClick={handleInputClick}
              onChange={handleEmailInputChange}
              // className="all-white-input-style"
              readOnly={chooseInputFromStore !== `id${oneUser.user_id}-email`}
              className={chooseInputFromStore === `id${oneUser.user_id}-email` ? "all-white-input--choose-style" : "all-white-input-style"}
              style={{
                width: `100%`,
                textAlign: 'left',
                // width: `calc(${oneUser.user_email.length}ch + 30px)`,
                // margin: 'auto'
              }}
              value={userEmail}
              data-forstore={`id${oneUser.user_id}-email`}
              data-interactive
            />
            {/* <input
              data-option-name={'event-time'}
              onClick={handleInputClick}
              onChange={handleTimeInputChange}
              className={chooseInputFromStore === `id${oneEvent.event_id}-event` ? "all-white-input--choose-style" : "all-white-input-style"}
              style={{
                width: '100%',
                textAlign: 'right',
              }}
              type="text"
              readOnly={chooseInputFromStore !== `id${oneEvent.event_id}-event`}
              value={`${eventTimeSec}`}
              data-forstore={`id${oneEvent.event_id}-event`}
              data-interactive
            /> */}

          </Stack>
        </Grid>

        {/* Role */}
        <Grid item xs={6} display={'flex'} justifyContent={'center'}>
          <SelectBlock selectedItem={userRole} modifier={'ROLE'} selectChange={selectChange} />
        </Grid>

        <Divider />
      </Grid>
      {BackDropComponent}
      {alertComponent}
    </>
  )
}
export default UserField