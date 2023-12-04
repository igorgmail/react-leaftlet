import { useState, useEffect, FC } from "react"

import { Container, Stack } from "@mui/material"

import { TPointsData } from "./types/carsSettingsTypes";

interface IPointDataProps {
  pointData: TPointsData[]
}
const ControlPointBlock: FC<IPointDataProps> = ({ pointData }) => {
  console.log("--Render ControlPointBlock");

  return (
    <div>ControlPointBlock</div>
  )
}
export default ControlPointBlock