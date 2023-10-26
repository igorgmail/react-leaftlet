import React, { useState, useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Marker, Popup, Pane } from 'react-leaflet';

import { Box } from '@mui/material';
import L from 'leaflet';
import 'leaflet-rotatedmarker';


import { ReactElementType } from 'react-window';


function useTooltipHeight() {

  const map = useMap();
  const container = map.getContainer()

  async function getTooltipHeight(): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const nodeListAllTooltips = container.querySelectorAll('.leaflet-tooltip');
        const arrayAllTooltips = Array.from(nodeListAllTooltips);
        const maxHeightTooltips = Math.max(...arrayAllTooltips.map((e) => e.clientHeight));
        resolve(maxHeightTooltips);
      }, 10);
    });
  }



  return { getTooltipHeight }
}

export { useTooltipHeight };