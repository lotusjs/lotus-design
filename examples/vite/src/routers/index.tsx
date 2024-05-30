import { createBrowserRouter, Navigate } from 'react-router-dom';
import ScrollAreaRoutes from './ScrollAreaRoutes'
import WatermarkRoutes from './WatermarkRoutes'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/scroll-area"  />
    },
    ScrollAreaRoutes,
    WatermarkRoutes,
  ],
  { basename: import.meta.env.BASE_URL }
)

export default router;
