// Данные приходят с сервера
export interface ISettingsData {
  company: TCompanyData,
  cars: ICarObject[],
  points: TPointsData[],
  events: TEventsData[],
  type_of_events: TTypeEvents,
  icons: TIcons[],

}


export type TCompanyData = {
  company_id: string,
  name: string,
  short_link: string,
  balance: string
}

// Объект car приходит с сервера
export type ICarObject = {
  car_id: string,
  name: string,
  pic: string,
  imei: string,
  alter_imei: string | null
}

export type TPointsData = {
  point_id: string,
  address?: string,
  name: string,
  lat: string,
  lng: string,
  radius: string
}

export type TEventsData = {
  event_id: string,
  company_id: string,
  car_id: string,
  point_id: string,
  event: string,
  time_response_sec: string,
}

export type TTypeEvents = string[]

export type TIcons = {
  icon_id: string,
  url: string,
}

export type TUsers = {
  user_id: string,
  email: string,
}

export type TRemoveDialogCallback = {
  event: string | undefined;
  subjectid: string | undefined;
}

type Tmethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface IRequestOptions {
  method: Tmethod;
  body?: BodyInit | null;
}

// FROM SERVER

export type TPointDataFromServer = {
  address: string,
  point_id: string,
  point_name: string,
  lat: string,
  lng: string,
  radius: string
}