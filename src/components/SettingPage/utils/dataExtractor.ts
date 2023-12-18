import { ICarObject, ICarObjectTwo, TPointDataFromServer } from "../types/carsSettingsTypes"

class DataExtractor {

  static getPointsFromServerData(data: TPointDataFromServer) {
    const { address, point_id, lat, lng, radius, point_name: name } = { ...data }
    return { address, point_id, lat, lng, radius, name };
  }

  static createCarDataForServer(data: Omit<ICarObject, 'car_id'>) {
    const { pic, imei, alter_imei, name: car_name } = { ...data }
    return { pic, imei, alter_imei, car_name };
  }

  static createCarDataFromServer(data: ICarObjectTwo) {
    const { car_id, pic, imei, alter_imei, car_name: name } = { ...data }
    return { car_id, pic, imei, alter_imei, name }
  }
}

export default DataExtractor;

// point_id: string,
// point_name: string,
// lat: string,
// lng: string,
// radius: string


// address: string,
// point_id: string,
// point_name: string,
// lat: string,
// lng: string,
// radius: string
// }