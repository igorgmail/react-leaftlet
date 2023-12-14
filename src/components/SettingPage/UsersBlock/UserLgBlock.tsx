import { Box, Divider, Grid, Stack } from "@mui/material"
import { FC } from "react"
import RemoveDialog from "../components/RemoveDialog"
import { TEventForDialog, TEventFromDialog, TEventsData, TRemoveDialogCallback, TUsers } from "../types/carsSettingsTypes"

import useBackDrop from "../hooks/useBackdrop";
import useRemoveDialog from "../hooks/useRemoveDialog";
import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";

interface IUserBlockProps {
  usersData: TUsers[]
}


const UserLgBlock: FC<IUserBlockProps> = ({ usersData }) => {


  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { sendRemove } = useRemoveDialog()
  const dispatch = useAppDispatch()


  const handleDialog = (eventData: TEventFromDialog) => {
    startBackDrop()
    sendRemove(eventData)
      .then((data) => {
        if (data.data) {
          const id = data.data.data
          dispatch(carsSettingsActions.setRemoveUser(id))
          stopBackDrop()
        } else {
          console.info("При удалении Пользователя с сервера пришли некорректные данные");

        }
      }).catch((err) => {
        console.warn("ERROR, Ошибка при удалении Пользователя", err);
      }).finally(() => stopBackDrop())
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
    <Stack sx={{ flexGrow: 1, overflow: 'hidden' }}>

      {/* Header Cars */}
      <Stack
        sx={{ marginBottom: '0' }}
      >
    <Grid container
      rowSpacing={1}
      sx={{
        marginTop: '0.8rem',
        backgroundColor: '#078c75',
        color: 'white',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        paddingLeft: '.8rem'
      }}>

      <Grid item xs={6} sx={{ borderTopLeftRadius: '8px' }}>
        <Stack >Email</Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack display={'flex'} alignItems={'center'}>Полномочия</Stack>
      </Grid>
    </Grid>

        {usersData.length > 0 && usersData.map((oneUser) => (
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
              {/* <Stack display={'flex'} alignItems={'center'}> */}
              <input
                className="all-white-input-style"
                style={{ width: `calc(${oneUser.role.length}ch + 22px)`, fontSize: '0.8rem' }}
                type="text"
                readOnly={true}
                defaultValue={oneUser.role} />
              {/* </Stack> */}
            </Grid>

            <Divider />
          </Grid>
        ))
        }

      </Stack>
    </Stack>
      {BackDropComponent}
    </>
  )
}
export default UserLgBlock