// Данные приходят с сервера
export interface ISettingsData {
  company: TCompanyData,
  cars: ICarObject[],
  point: TPointsData[],
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

export type TRemoveDialogCallback = {
  event: string | undefined;
  subjectid: string | undefined;
}