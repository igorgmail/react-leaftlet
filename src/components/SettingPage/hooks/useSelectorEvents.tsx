import { useAppSelector } from "../../../store";

function useSelectorEvents() {

  const cars = useAppSelector((store) => store.carsSettings.cars)

  const getCarById = (id: string) => {
    return cars.find((el) => el.car_id === id)
  };

  return { getCarById, abortController: AbortController };
}

export default useSelectorEvents;
