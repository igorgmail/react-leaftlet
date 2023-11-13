import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDataAllCarsForMenu, ICompanyData, IOneCarForMenu, ICompanyName, ICarsFilter, IDataFromDateForm } from "../../types/carsTypes";

type TypeCarsFilter = { [key: number]: boolean } | null;

type TypeCarsMapVariant = {
  variant: 'all' | 'history'
}
// type TCarMapItem = {
//   car_id: string | number,
//   carName: string,
//   dataFromIso: string | '',
//   dataToIso: string | '',
//   localOffset: number,
// }

interface TypeInitialState {
  companyName: ICompanyName | null,
  forMenu: IOneCarForMenu[] | null | undefined,
  carsFilter: TypeCarsFilter,
  isConnectFilter: TypeCarsFilter,
  carsMapVariant: TypeCarsMapVariant,
  carsMapHistotyItem: IDataFromDateForm | null
}


const initialState: TypeInitialState = {
  companyName: null,
  forMenu: null,
  carsFilter: null,
  isConnectFilter: null,
  carsMapVariant: { variant: 'all' },
  carsMapHistotyItem: null
}

export const carsMapSlice = createSlice({
  name: 'carsMap',
  initialState: initialState,
  reducers: {
    setCompanyName: (state, action: PayloadAction<ICompanyName>) => {
      state.companyName = { ...action.payload }
      // return state
    },
    setCarsDataForMenu: (state, action: PayloadAction<IOneCarForMenu[]>) => {
      state.forMenu = action.payload
      // return state
    },
    setChooseCheckbox: (state, action: PayloadAction<ICarsFilter>) => {
      state.forMenu = state.forMenu?.map((el: any, ind: any) => { //{carChoose_id: 2, carChoose_value: true} 
        if (Number(el.car_id) === Number(action.payload.carChoose_id)) {
          el.checked = action.payload.carChoose_value
        }
        return el
      })
      // return state
    },
    setCarsFilterMarkers: (state: any, action: PayloadAction<TypeCarsFilter>) => {
      state.carsFilter = { ...state.carsFilter, ...action.payload }
    },
    setCarsIsConnectFilter: (state: any, action: PayloadAction<TypeCarsFilter>) => {
      state.isConnectFilter = { ...state.isConnectFilter, ...action.payload }
      // return state
    },
    setCarsMapVariant: (state: any, action: PayloadAction<TypeCarsMapVariant>) => {
      state.carsMapVariant = { ...state.carsMapVariant, ...action.payload }
      // return state
    },
    setCarsMapHistoryItem: (state: any, action: PayloadAction<IDataFromDateForm>) => {
      state.carsMapHistotyItem = { ...state.carsMapHistotyItem, ...action.payload }
      // return state
    },
  }
})

export const { actions: carsMapActions, reducer: carsMapReducer } = carsMapSlice;
