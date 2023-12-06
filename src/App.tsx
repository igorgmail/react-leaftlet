import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteObject, useLocation, useRoutes } from 'react-router-dom';
import { localizeRoutes } from './common/utils';
import { ROUTES } from './constants';
import { Main } from './components';
import MainCars from './components/MainCars/MainCars';
import SettingMain from './components/SettingPage/SettingMain';
const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Main />,
  },
  {
    path: ROUTES.CARS,
    element: <MainCars />
  },
  {
    path: ROUTES.SETTINGS,
    element: <SettingMain />
  }
];

export const App = () => {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  //Always on top on serve
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return useRoutes([
    ...routes,
    ...localizeRoutes(routes, i18n.language),
    { path: '*', element: <div>Error 404</div> },
  ]);
};
