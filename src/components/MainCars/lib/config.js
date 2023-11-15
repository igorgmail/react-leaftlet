const carsPageconfig = {
  updateDelay: 1 * 1000, // Время обновления координат
  updatePosMap: 3 * 1000, // Использовалось для обновления карты(положения)
  offsetMapPan: 28, // Сдвиг карты относительно нижний tooltip 
  differentTime: 10 * 60 * 60 * 1000, // 5 часов разница при которой состояние car - disconnect
  dateCompareTime: 60 * 1000, // Разница времени от и до, если меньше то форма disable, сейчас 1 минута
  historyMarkerRadius: 6, // Радиус точки маршрута авто на карте история
  historyLineWeight: 3 // Толщина линий маршрута авто на карте история
}

export default carsPageconfig;