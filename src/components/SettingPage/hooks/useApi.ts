const apiEndpoint = process.env.REACT_APP_API_SETTINGS;
type Tmethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IRequestOptions {
  method: Tmethod;
  body?: BodyInit | null;
}

function useApi() {

  const username = 'test';
  const password = '123';

  const sendRequest = async (url: string, options: IRequestOptions) => {
    let responseData;
    const abortController = new AbortController();
    try {
      const response = await fetch(`${apiEndpoint}${url}`, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Authorization': `Basic ${username}:${password}`
          'Authorization': 'Basic ' + btoa(username + ":" + password)
        },
        credentials: 'same-origin',
        body: options.body,
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

  return { sendRequest, abortController: AbortController };
}

export default useApi;
