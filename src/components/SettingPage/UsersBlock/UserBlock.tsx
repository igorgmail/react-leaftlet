import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject, TEventsData } from "../types/carsSettingsTypes";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BlockHeader from "../components/BlockHeader";
import UserLgBlock from "./UserLgBlock";
import AddUserModal from "./AddModal/AddUserModal";
import { useAppSelector, carsSettingsActions } from "../../../store";

type TUserBlockProps = {
  setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
}
const UserBlock: FC<TUserBlockProps> = ({ setUpdateForm }) => {
  console.log("--Render UsersBlock");

  const usersData = useAppSelector((store) => store.carsSettings.users)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Stack sx={{ whidth: '100%' }}>
      <BlockHeader header={"Пользователи"} />

      <UserLgBlock usersData={usersData} setUpdateForm={setUpdateForm}></UserLgBlock>
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
