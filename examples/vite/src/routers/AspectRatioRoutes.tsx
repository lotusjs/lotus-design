import { Navigate } from 'react-router-dom'
import Basic from '@/pages/aspect-ratio/basic'
import type { RouteObject } from './types';

const AspectRatioRoutes: RouteObject = {
  path: '/aspect-ratio',
  children: [
    {
      path: '/aspect-ratio',
      element: <Navigate to="/aspect-ratio/basic"  />
    },
    {
      path: 'basic',
      element: <Basic />
    }
  ],
}

export default AspectRatioRoutes;
