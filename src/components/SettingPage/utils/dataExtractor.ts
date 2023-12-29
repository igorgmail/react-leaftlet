import { ICarObject, ICarObjectTwo, TPointDataFromServer, ISettingsData, TEventsData, TEventsDataForServer } from "../types/carsSettingsTypes"

class DataExtractor {

  // Заменяем point_name на name
  static getPointsFromServerData(data: TPointDataFromServer) {
    const { address, point_id, lat, lng, radius, point_name: name } = { ...data }
    return { address, point_id, lat, lng, radius, name };
  }

  static createCarDataForServer(data: Omit<ICarObject, 'car_id'>) {
    const { pic, imei, alter_imei, name: car_name } = { ...data }
    return { pic, imei, alter_imei, car_name };
  }

  static createCarDataFromServer(data: ICarObjectTwo) {
    const { car_id, pic, imei, alter_imei, name } = { ...data }

    return { car_id, pic: this.createiconPath(pic), imei, alter_imei, name }
  }
  // static createEventDataForServer(data: Omit<TEventsData, 'event_id'>): TEventsDataForServer {
  //   const { company_id, car_id, point_id, event, time_response_sec, point_id: user_id } = { ...data }
  //   return { car_id, event, time_response_sec, user_id }
  // }

  // event_id: string;
  // company_id: string;
  // car_id: string;
  // point_id: string;
  // event: string;
  // time_response_sec:
  // При получении первичных данных обрабатываем строку ссылки на иконку
  // Получаем строку вида :  "CONCAT('https://gpson.ru/',pic)": "https://gpson.ru/pics/car1.png",
  // Возвращаем : "https://gpson.ru/pics/car1.png"

  static createDataWithPicHref(data: ISettingsData) {

    const newCarData = data.cars.map((car: any) => {
      if (car["CONCAT('https://gpson.ru/',pic)"]) {
        // Преобразование значения поля "CONCAT('https://gpson.ru/',pic)"
        const concatenatedValue = car["CONCAT('https://gpson.ru/',pic)"];
        const url = concatenatedValue.replace(/^CONCAT\('([^']*)',pic\)$/, '$1');
        console.log("▶ ⇛ url:", url);
        // Замена значения поля на преобразованную ссылку
        car.pic = url;
        // Удаление оригинального поля
        delete car["CONCAT('https://gpson.ru/',pic)"];
        return car
      }
      return car
    })
    return { ...data, cars: newCarData }
  }

  static createiconPath(href: string) {
    return `https://gpson.ru/${href}`
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