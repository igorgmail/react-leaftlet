import { ICarObject } from "../../types/carsSettingsTypes"

const makeEventData = (carObject: ICarObject) => {

  const eventData = {
    event: 'REMOVE_CAR',
    subjectid: carObject.car_id,
    msg: `Будет удален автомобиль <br>${carObject.name}`
  }

  return eventData
}

export { makeEventData }