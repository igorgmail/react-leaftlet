import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISettingsData, TCompanyData, ICarObject, TPointsData, TEventsData, TTypeEvents, TIcons } from '../../components/SettingPage/types/carsSettingsTypes';


// type TSettingsConfig = {
//   requestWorks: boolean
//   }

interface IInitSettingStore extends ISettingsData {
  config: {
    requestWorks: boolean
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
    requestWorks: false
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
    setCompanyName: (state, action: PayloadAction<TCompanyData>) => {
      state.company.name = action.payload.name
    },
  },
}
)

export const { actions: carsSettingsActions, reducer: carsSettingsReducer } = carsSettingsSlice;
