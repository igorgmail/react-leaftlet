import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject, TEventsData } from "../types/carsSettingsTypes";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BlockHeader from "../components/BlockHeader";
import UserLgBlock from "./UserLgBlock";
import AddUserModal from "./AddModal/AddUserModal";
import { useAppSelector, store } from "../../../store";

type TUserBlockProps = {
  setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
}
const UserBlock: FC<TUserBlockProps> = ({ setUpdateForm }) => {
  console.log("--Render UsersBlock");
  const usersFromStore = useAppSelector((store) => store.carsSettings.users)

  const [userData, setUserData] = useState(usersFromStore)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setUserData(store.getState().carsSettings.users)
  }, [usersFromStore])


  return (
    <Stack sx={{ whidth: '100%' }}>
      <BlockHeader header={"Пользователи"} />

      <UserLgBlock usersData={userData} setUpdateForm={setUpdateForm}></UserLgBlock>
      {/* {!isSmallScreen ? (
        <UserLgBlock eventsData={eventsData} />
      ) : (
        <UserSmBlock eventsData={eventsData} />
      )} */}
      <AddUserModal />
    </Stack>
  )
}

export default UserBlock
