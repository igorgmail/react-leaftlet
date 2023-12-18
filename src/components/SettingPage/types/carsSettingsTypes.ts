// Данные приходят с сервера
export interface ISettingsData {
  company: TCompanyData,
  cars: ICarObject[],
  points: TPointsData[],
  events: TEventsData[],
  type_of_events: TTypeEvents,
  icons: TIcons[],
  users: TUsers[],

}


export type TCompanyData = {
  company_id: string,
  name: string,
  short_link: string,
  balance: string,
  currency: string
}

// Объект car приходит с сервера
export type ICarObject = {
  car_id: string,
  name: string,
  pic: string,
  imei: string,
  alter_imei: string | null
}
export type ICarObjectTwo = {
  car_id: string,
  car_name: string,
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
  role: string,
}
export type TUserRole = {
  email: string,
  role: string
}

export type TRemoveDialogCallback = {
  event: 'REMOVE_CAR' | 'REMOVE_POINT' | 'REMOVE_EVENT' | 'REMOVE_USER',
  subjectid: string,
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
export type TEventForDialog = {
  event: 'REMOVE_CAR' | 'REMOVE_POINT' | 'REMOVE_EVENT' | 'REMOVE_USER',
  subjectid: string,
  msg: string,
}

export type TEventFromDialog = {
  event: 'REMOVE_CAR' | 'REMOVE_POINT' | 'REMOVE_EVENT' | 'REMOVE_USER',
  subjectid: string,
}
export type TRemoveDialogProps = {
  callback: (dialogEvent: TEventFromDialog) => void,
  eventData: TEventForDialog
}
export type TAddCarObject = {
  car_name: string,
  pic: string,
  imei: string,
  alter_imei: string | null
}