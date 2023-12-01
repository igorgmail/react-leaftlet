

// Данные приходят с сервера 
export interface ICompanyData {
  company_name: string,
  company_id: string,
  cars: ICarObject[]
}

// Объект car приходит с сервера
export type ICarObject = {
  car_id: string,
  car_name: string,
  lat: string,
  lng: string,
  angle: string,
  altitude: string,
  speed: string,
  pic: string,
  last_track: string
}