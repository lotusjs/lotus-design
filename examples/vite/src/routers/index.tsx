import { createBrowserRouter, Navigate } from 'react-router-dom';
import ScrollAreaRoutes from './ScrollAreaRoutes'
import WatermarkRoutes from './WatermarkRoutes'

import AspectRatio from '@/pages/aspect-ratio/basic'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/scroll-area"  />
    },
    ScrollAreaRoutes,
    WatermarkRoutes,
    {
      path: '/aspect-ratio',
      element: <AspectRatio  />
    }
  ],
  { basename: import.meta.env.BASE_URL }
)

export default router;
