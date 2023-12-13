import { FC, useEffect, useState } from 'react'

import useSelectorEvents from '../hooks/useSelectorEvents'
import './style/style.css'
import { ICarObject } from '../types/carsSettingsTypes'
import { useAppSelector } from '../../../store'


type TSelectBlock = {
  eventId: string,
  modifier: 'CARS' | 'POINTS' | 'EVENTS'
}
const SelectBlock: FC<TSelectBlock> = ({ eventId, modifier }) => {

  const allCars = useAppSelector((store) => store.carsSettings.cars)

  // const [options, setOptions] = useState<ICarObject | undefined>([])

  const { getCarById } = useSelectorEvents()


  // useEffect(() => {
  //   if (eventId) {
  //     const cars = getCarById(eventId)//.then(data => setOptions(data))
  //     setOptions(cars)
  //   }
  // }, [eventId, getCarById])

  const Options = () => {
    return (
      <>
        {allCars.map((car, ind) => (
          <option key={car.car_id} value={`${car.car_id}`}>{car.name}</option>
        ))}
      </>
    );
  }


  return (
    <>
      <label className="select all-white-input-style" htmlFor="slct" >
        <select id="slct" required>
          {/* <option value="" disabled selected>Select option</option> */}
          <Options></Options>
        </select>
        <svg>
          <use xlinkHref="#select-arrow-down"></use>
        </svg>
      </label>

      {/* <!-- SVG Sprites --> */}
      <svg className="sprites">
        <symbol id="select-arrow-down" viewBox="0 0 10 6">
          <polyline points="1 1 5 5 9 1"></polyline>
        </symbol>
      </svg>
    </>

  )
}
export default SelectBlock