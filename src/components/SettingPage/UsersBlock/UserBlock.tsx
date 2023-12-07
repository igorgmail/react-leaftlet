import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject, TEventsData } from "../types/carsSettingsTypes";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BlockHeader from "../components/BlockHeader";
import UserLgBlock from "./UserLgBlock";


interface IUserBlockProps {
  usersData: { email: string, role: string }[]
}

const UserBlock: FC<IUserBlockProps> = ({ usersData }) => {
  console.log("--Render UsersBlock");


  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Stack sx={{ whidth: '100%' }}>
      <BlockHeader header={"Пользователи"} />

      <UserLgBlock usersData={usersData}></UserLgBlock>
      {/* {!isSmallScreen ? (
        <UserLgBlock eventsData={eventsData} />
      ) : (
        <UserSmBlock eventsData={eventsData} />
      )} */}

    </Stack>
  )
}

export default UserBlock
