import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISettingsData, TCompanyData, ICarObject, TPointsData, TEventsData, TTypeEvents, TIcons } from '../../components/SettingComponents/types/carsSettingsTypes';

const initialState: ISettingsData = {
  company: null,
  cars: [],
  points: [],
  events: [],
  type_of_events: [],
  icons: []
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
      console.log("▶ ⇛ action.payload:", action.payload);
      state.company = action.payload.company
      state.cars = action.payload.cars
      state.points = action.payload.points
      state.events = action.payload.events
      state.type_of_events = action.payload.type_of_events
      state.icons = action.payload.icons
    },
  },
}
)

export const { actions: carsSettingsActions, reducer: carsSettingsReducer } = carsSettingsSlice;
