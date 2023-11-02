import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDataAllCarsForMenu, ICompanyData, IOneCarForMenu, ICompanyName, ICarsFilter } from "../../types/carsTypes";

type TypeCarsFilter = { [key: number]: boolean } | null;

type TypeInitialState = {
  companyName: ICompanyData | null,
  forMenu: IOneCarForMenu[] | null,
  carsFilter: TypeCarsFilter,
}

const initialState: TypeInitialState = {

  companyName: null,
  forMenu: null,
  carsFilter: null,
}

export const carsMapSlice = createSlice({
  name: 'carsMap',
  initialState: initialState,
  reducers: {
    setCompanyName: (state: any, action: PayloadAction<ICompanyName>) => {
      state.companyName = { ...action.payload }
      // return state
    },
    setCarsDataForMenu: (state: any, action: PayloadAction<IOneCarForMenu[]>) => {
      console.log("▶ ⇛ action.payload:", action.payload);
      state.forMenu = action.payload
      // return state
    },
    setChooseCheckbox: (state: any, action: PayloadAction<ICarsFilter>) => {
      state.forMenu = state.forMenu.map((el: any, ind: any) => { //{carChoose_id: 2, carChoose_value: true} 
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
  }
})

export const { actions: carsMapActions, reducer: carsMapReducer } = carsMapSlice;
// // Два export !!
// export default carsMapSlice.reducer

// // Экспортируем экшены
// export const { setCarsData } = carsMapSlice.actions