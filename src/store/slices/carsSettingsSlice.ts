import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISettingsData, TCompanyData, ICarObject, TPointsData, TEventsData, TTypeEvents, TIcons, TUsers } from '../../components/SettingPage/types/carsSettingsTypes';
import { LatLng } from 'leaflet';

type TPointsDataWithAddress = TPointsData & {
  address: string;
};

type TSelectFieldCar = {
  typeField: 'cars' | 'points' | 'events' | 'users',
  selectBlockObject: ICarObject | TPointsDataWithAddress | TEventsData | TUsers
}

type TMapCenter = {
  lat: string,
  lng: string
}
interface IInitSettingStore extends ISettingsData {
  config: {
    requestWorks: boolean,
    chooseInputName: string | null,
    currentSelectBlock: TSelectFieldCar | null,
    mapMove: boolean | undefined,
    mapCenter: LatLng | null
  }
}


const initialState: IInitSettingStore = {
  company: { company_id: '', name: '', short_link: '', balance: '' },
  cars: [],
  points: [],
  events: [],
  type_of_events: [],
  icons: [],
  config: {
    requestWorks: false,
    chooseInputName: null,
    currentSelectBlock: null,
    mapMove: undefined,
    mapCenter: null
  }
}

export const carsSettingsSlice = createSlice({
  name: 'carsSettings',
  initialState: initialState,
  reducers: {

    setCompanyDataInSettings: (state, action: PayloadAction<TCompanyData>) => {
      state.company = { ...action.payload }
    },
    setCarsDataInSettings: (state, action: PayloadAction<ICarObject[]>) => {
      state.cars = [...action.payload]
    },
    setPointsDataInSettings: (state, action: PayloadAction<TPointsData[]>) => {
      state.points = [...action.payload]
    },
    setEventsDataInSettings: (state, action: PayloadAction<TEventsData[]>) => {
      state.events = [...action.payload]
    },
    setTypeEventsDataInSettings: (state, action: PayloadAction<TTypeEvents>) => {
      state.type_of_events = [...action.payload]
    },
    setIconsDataInSettings: (state, action: PayloadAction<TIcons[]>) => {
      state.icons = [...action.payload]
    },
    setInitialSettingsData: (state, action: PayloadAction<ISettingsData>) => {
      state.company = action.payload.company
      state.cars = action.payload.cars
      state.points = action.payload.points
      state.events = action.payload.events
      state.type_of_events = action.payload.type_of_events
      state.icons = action.payload.icons
      console.log("set action.payload.company", action?.payload?.company);
    },


    //  предусмотрена для отображения загрузки и блокирования страницы
    setRequestWorks: (state, action: PayloadAction<boolean>) => {
      state.config.requestWorks = action.payload
    },
    // Обновить состояние компании
    setRefreshCompanyData: (state) => {
      state.company = { ...state.company }
    },
    // Имя компании установить
    setCompanyName: (state, action: PayloadAction<TCompanyData>) => {
      state.company.name = action.payload.name
    },

    // Установить shortLink
    setShortLink: (state, action: PayloadAction<string>) => {
      state.company.short_link = action.payload
      console.log("▶ ⇛ action.payload:", action.payload);
    },

    // Удалить shortLink
    setRemoveShortLink: (state) => {
      state.company.short_link = ''
    },

    // Установить balance
    setBalance: (state, action: PayloadAction<string>) => {
      state.company.balance = action.payload
    },

    // Установить имя выбранного меню
    setChooseInputName: (state, action: PayloadAction<string | null>) => {
      state.config.chooseInputName = action.payload
    },

    // Установить текущее состояние выбора (какой инпут меняем, сюда ложим весь объект чье это поле
    // С указанием типа объекта - cars | points | events | users
    setCurrentSelectBlock: (state, action: PayloadAction<TSelectFieldCar | null>) => {
      state.config.currentSelectBlock = action.payload
    },

    // Карта двигается в данный момент или нет (true | false)
    setMapMove: (state, action: PayloadAction<boolean>) => {
      state.config.mapMove = action.payload
    },
    // Установливаем центр карты пи каждом изменении карты
    setMapCenter: (state, action: PayloadAction<LatLng | null>) => {
      state.config.mapCenter = action.payload
    },

  },
}
)

export const { actions: carsSettingsActions, reducer: carsSettingsReducer } = carsSettingsSlice;
