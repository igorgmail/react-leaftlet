import { FC } from "react"
import { Box } from "@mui/material"
import { ICarObject } from "../types/carsSettingsTypes";
import SmFieldCars from "./SmFieldCars";

interface ICarsBlockProps {
  carsData: ICarObject[],
  setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
}

const CarsSmallScreen: FC<ICarsBlockProps> = ({ carsData, setUpdateForm }) => {

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
      {carsData.map((car) => (<SmFieldCars car={car} key={`cars-block-` + car.car_id} setUpdateForm={setUpdateForm} />))}
    </Box >
  )
}
export default CarsSmallScreen