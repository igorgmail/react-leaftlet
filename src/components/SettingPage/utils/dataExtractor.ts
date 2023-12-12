import { TPointDataFromServer } from "../types/carsSettingsTypes"

class DataExtractor {

  static getPointsFromServerData(data: TPointDataFromServer) {
    console.log("▶ ⇛ data:", data);


    const { address, point_id, lat, lng, radius, point_name: name } = { ...data }

    return { address, point_id, lat, lng, radius, name };
  }
}

export default DataExtractor;

// point_id: string,
// point_name: string,
// lat: string,
// lng: string,
// radius: string


// address: string,
// point_id: string,
// point_name: string,
// lat: string,
// lng: string,
// radius: string
// }