import { useEffect, useState } from "react"

import { Stack } from "@mui/material"

import { useAppDispatch, useAppSelector, carsSettingsActions, store } from "../../../store";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// import useCheckWhereIsClick from "./hooks/useCheckWhereIsClick";

import BlockHeader from "../components/BlockHeader";
import CarsSmallScreen from "./CarsSmallScreen";
import CarsLargeScreen from "./CarsLargeScreen";
import AddCarModal from "./AddCarModal/AddCarModal";



const CarsBlock = () => {
  console.log("--Render CarsBlock");

  const dataFromStore = useAppSelector((store) => store.carsSettings.cars);
  const [carsData, setCarsData] = useState(dataFromStore);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setCarsData(store.getState().carsSettings.cars)
  }, [dataFromStore])

  return (
    <Stack sx={{ whidth: '100%' }}>

      <BlockHeader header={'Автомобили'} />

      {!isSmallScreen ? (

        <CarsLargeScreen carsData={carsData} />

      ) : (

        <CarsSmallScreen carsData={carsData} />

      )}


      <AddCarModal />
    </Stack>
  )
}
export default CarsBlock




