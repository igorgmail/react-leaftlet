import { useEffect, useState, useCallback } from 'react';
import L from '@react-leaflet/core'



const useMapClick = (map: any, className: string = 'leaflet-marker-icon') => {
  const [isMapClick, setIsMapClick] = useState(false);

  map.on('click', useCallback((e: any) => {
    const target = e.originalEvent.target as Element
    // L.DomEvent.disableClickPropagation(target)
    if (!target.classList.contains(className)) {
      // Обработка клика за пределами маркера (не в попапе)
      // Закрытие попапа маркера (если он открыт)
      console.log("Click Map");

      // map.closePopup();
      setIsMapClick(true)
    }
  }, []));

  return [isMapClick];
}

export default useMapClick