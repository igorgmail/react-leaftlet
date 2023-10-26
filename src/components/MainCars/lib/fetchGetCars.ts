import { ICarServerData } from "../../../types/carsTypes";

// https://user-headers.onrender.com/cars
// http://89.108.99.163/gps/gpsapi.php/all_cars?park_id=1
async function getCarsFetch(): Promise<ICarServerData> {
  try {
    const response = await fetch('https://user-headers.onrender.com/cars', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });


    if (response.ok) {
      const data: ICarServerData = await response.json();
      return data;
    } else {
      console.error('Ошибка при получении данных:', response.statusText);
      // Вернуть пустой объект или выбросить ошибку в зависимости от ваших потребностей
      return {
        company_name: '',
        company_id: 0,
        cars: []
      };
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
    // Вернуть пустой объект или выбросить ошибку в зависимости от ваших потребностей
    return {
      company_name: '',
      company_id: 0,
      cars: []
    };
  }
}


export default getCarsFetch;