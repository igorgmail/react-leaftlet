import { FC, useEffect, useState } from 'react'

import useSelectorEvents from '../hooks/useSelectorEvents'
import './style/style.css'
import { useAppSelector } from '../../../store'


type TSelectBlock = {
  eventId: string,
  modifier: 'CARS' | 'POINTS' | 'EVENTS',
  selectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  selectedItem?: string

}
const SelectBlock: FC<TSelectBlock> = ({ selectedItem, eventId, modifier, selectChange }) => {

  const allCars = useAppSelector((store) => store.carsSettings.cars)
  const allPoints = useAppSelector((store) => store.carsSettings.points)
  const allTypeEvents = useAppSelector((store) => store.carsSettings.type_of_events)

  // const { getCarIdFromEventId, getPointIdFromEventId, getEventFromEventId } = useSelectorEvents()


  // useEffect(() => {
  //   if (eventId) {
  //     const cars = getCarById(eventId)//.then(data => setOptions(data))
  //     setOptions(cars)
  //   }
  // }, [eventId, getCarById])

  const CarsOptions = () => {
    return (
      <>
        {allCars.map((car) => (
          <option key={car.car_id}
            value={`${car.car_id}`}
            selected={selectedItem === car.car_id}
            data-option-name={'event-car'}
          >{car.name}</option>
        ))}
      </>
    );
  }
  const PointsOptions = () => {
    return (
      <>
        {allPoints.map((point) => (
          <option key={point.point_id}
            value={`${point.point_id}`}
            selected={selectedItem === point.point_id}
            data-option-name={'event-point'}
          >{point.name}</option>
        ))}
      </>
    );
  }
  const TypeEventsOptions = () => {
    return (
      <>
        {allTypeEvents.map((typeEv, ind) => (
          <option key={ind}
            value={`${ind}`}
            selected={selectedItem === typeEv}
            data-option-name={'event-type'}
          >{typeEv}</option>
        ))}
      </>
    );
  }


  return (
    <>
      <label className="select all-white-input-style" htmlFor="slct" >
        <select
          onChange={selectChange}
          id="slct"
          required

        >
          {/* <option value="" disabled selected>Select option</option> */}
          {modifier === 'CARS' && <CarsOptions></CarsOptions>}
          {modifier === 'POINTS' && <PointsOptions></PointsOptions>}
          {modifier === 'EVENTS' && <TypeEventsOptions></TypeEventsOptions>}

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