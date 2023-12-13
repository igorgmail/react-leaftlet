import API_ENDPOINTS from "../utils/apiEndpoints";

const apiEndpoint = process.env.REACT_APP_API_SETTINGS;

type Tmethod = 'GET' | 'POST' | 'PUT' | 'DELETE';


interface IRequestOptions {
  method: Tmethod;
  body?: BodyInit | null;
}

type TEvent = {
  event: 'REMOVE_CAR' | 'REMOVE_POINT' | 'REMOVE_EVENT' | 'REMOVE_USER',
  subjectid: string,
}


function useRemoveDialog() {

  const eventApi = {
    REMOVE_CAR: API_ENDPOINTS.DELETE_CAR,
    REMOVE_POINT: API_ENDPOINTS.DELETE_POINT,
    REMOVE_EVENT: API_ENDPOINTS.DELETE_EVENT,
    REMOVE_USER: API_ENDPOINTS.DELETE_USER,
  }

  const itemIdKEy: { [key: string]: string } = {
    REMOVE_CAR: 'car_id',
    REMOVE_POINT: 'point_id',
    REMOVE_EVENT: 'event_id',
    REMOVE_USER: 'user_id',
  }

  const sendRemove = async (event: TEvent) => {
    let responseData;
    const url = eventApi[event.event]
    const key = itemIdKEy[event.event];
    const body: { [key: string]: string } = {};
    body[key] = event.subjectid;

    const abortController = new AbortController();
    try {
      const response = await fetch(`${apiEndpoint}${url}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(body),
        signal: abortController?.signal
      });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      responseData = await response.json();
      return { data: responseData, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Произошла неизвестная ошибка' };

    }
  };

  return { sendRemove, abortController: AbortController };
}

export default useRemoveDialog;
