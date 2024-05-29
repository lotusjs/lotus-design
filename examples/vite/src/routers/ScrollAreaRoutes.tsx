import { Navigate } from 'react-router-dom'
import Basic from '@/pages/scroll-area/basic'
import Example1 from '@/pages/scroll-area/example1'
import type { RouteObject } from './types';

const ScrollAreaRoutes: RouteObject = {
  path: '/scroll-area',
  children: [
    {
      path: '/scroll-area',
      element: <Navigate to="/scroll-area/basic"  />
    },
    {
      path: 'basic',
      element: <Basic />
    },
    {
      path: 'example1',
      element: <Example1 />
    },
  ],
}

export default ScrollAreaRoutes;
