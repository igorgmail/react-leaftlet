import { Box, Divider, Grid, Stack } from "@mui/material"
import { FC, useState } from "react"
import RemoveDialog from "../components/RemoveDialog"
import { TEventForDialog, TEventFromDialog, TEventsData, TRemoveDialogCallback, TUsers } from "../types/carsSettingsTypes"

import useBackDrop from "../hooks/useBackdrop";
import useRemoveDialog from "../hooks/useRemoveDialog";
import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";
import SelectBlock from "../components/SelectBlock";

interface IUserFieldProps {
  oneUser: TUsers
}



const UserField: FC<IUserFieldProps> = ({ oneUser }) => {

  const [role, setRole] = useState(oneUser.role)
  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { sendRemove } = useRemoveDialog()
  const dispatch = useAppDispatch()

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
    // ! Ложим все в store перед этим нужна тправка на сервер
    // ! И проверить
    const objectIndex = e.target.value
    // console.log("Индекс объекта", objectIndex);

    const selectedIndex = e.target.options.selectedIndex;
    // console.log("Порядковый номер", selectedIndex);

    const selectedOption = e.target.options[selectedIndex];
    const selectedData = selectedOption.dataset.optionName;

    if (selectedData === 'option-role') {
      setRole(String(objectIndex))
    }
  }


  const makeEventData = (eventObject: any) => {

    const eventData: TEventForDialog = {
      event: 'REMOVE_USER',
      subjectid: eventObject.user_id,
      msg: `Будет удален пользователь <br>${eventObject.email}`
    }

    return eventData
  }

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
              className="all-white-input-style"
              readOnly={true}
              style={{
                width: `calc(${oneUser.email.length}ch + 30px)`,
                // margin: 'auto'
              }}
              defaultValue={oneUser.email}
            />
          </Stack>
        </Grid>

        {/* Role */}
        <Grid item xs={6} display={'flex'} justifyContent={'center'}>
          <SelectBlock selectedItem={role} modifier={'ROLE'} selectChange={selectChange} />
        </Grid>

        <Divider />
      </Grid>
      {BackDropComponent}
    </>
  )
}
export default UserField