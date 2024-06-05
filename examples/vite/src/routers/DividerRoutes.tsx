import { Navigate } from 'react-router-dom'
import Basic from '@/pages/divider/basic'
import type { RouteObject } from './types';

const DividerRoutes: RouteObject = {
  path: '/divider',
  children: [
    {
      path: '/divider',
      element: <Navigate to="/divider/basic"  />
    },
    {
      path: 'basic',
      element: <Basic />
    }
  ],
}

export default DividerRoutes;
