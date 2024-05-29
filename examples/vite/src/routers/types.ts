import type { NonIndexRouteObject } from 'react-router-dom';

export interface Meta {}

export interface RouteObject extends Omit<NonIndexRouteObject, 'children'> {
  meta?: Meta;
  children?: RouteObject[];
}
