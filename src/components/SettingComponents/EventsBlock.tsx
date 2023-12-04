import { useState, useEffect, FC } from "react"

import { Container, Stack } from "@mui/material"

import { TEventsData } from "./types/carsSettingsTypes";



interface IEventsBlockProps {
  eventsData: TEventsData[]
}
const EventsBlock: FC<IEventsBlockProps> = ({ eventsData }) => {
  console.log("--Render EventsBlock");
  return (
    <div>EventsBlock</div>
  )
}
export default EventsBlock