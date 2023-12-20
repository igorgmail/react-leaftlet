import { Box, Divider, Grid, Stack } from "@mui/material"
import { FC, useState } from "react"
import RemoveDialog from "../components/RemoveDialog"
import { TEventForDialog, TEventFromDialog, TEventsData, TRemoveDialogCallback, TUsers } from "../types/carsSettingsTypes"

import useBackDrop from "../hooks/useBackdrop";
import useRemoveDialog from "../hooks/useRemoveDialog";
import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";
import SelectBlock from "../components/SelectBlock";
import UserField from "./UserField";

interface IUserBlockProps {
  usersData: TUsers[],
  setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
}


const UserLgBlock: FC<IUserBlockProps> = ({ usersData, setUpdateForm }) => {

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
            <UserField oneUser={oneUser} setUpdateForm={setUpdateForm} key={`userblock-${oneUser.user_id}`}
            />
        ))
        }

      </Stack>
      </Stack>
    </>
  )
}
export default UserLgBlock