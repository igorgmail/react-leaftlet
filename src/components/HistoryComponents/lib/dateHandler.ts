
class DateServices {
  // private time = () => Date.now() // В мс

  // Сегодня , текущее время в миллисекундах
  public getMsNow = () => {
    return Date.now() // В мс
  }

  // Сегодня , полночь в миллисекундах
  public getMsMidnight = () => {

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const timestampAtMidnight = currentDate.getTime();
    return timestampAtMidnight; // В мс
  }

  // Сегодня , только дата в формате даты (2023-11-25)
  public getDateToday = () => {
    // Получение текущей даты
    const currentDate = new Date();

    // Форматирование даты в строку "YYYY-MM-DD"
    const formattedDate = currentDate.toISOString().slice(0, 10);
    return formattedDate
  }

  // Сегодня , только время в формате (21:05)
  public getTimeNow = () => {
    const currentTime = new Date();
    // Форматирование времени в строку "HH:mm"
    const formattedTime = currentTime.toTimeString().slice(0, 5);
    return formattedTime
  }

  // Сравнивает метки( в миллисекундах ) полей от и до
  // Возвращает true | false
  public checkTimeForAndTo = (timeFor: string | number, timeTo: string | number) => {
    return Number(timeTo) > Number(timeFor)
  }
}

const dateServices = new DateServices;
export default dateServices;