import { createBrowserRouter, Navigate } from 'react-router-dom';
import ScrollAreaRoutes from './ScrollAreaRoutes'
import WatermarkRoutes from './WatermarkRoutes'
import AspectRatioRoutes from './AspectRatioRoutes'
import DividerRoutes from './DividerRoutes'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/scroll-area"  />
    },
    ScrollAreaRoutes,
    WatermarkRoutes,
    AspectRatioRoutes,
    DividerRoutes,
  ],
  { basename: import.meta.env.BASE_URL }
)

export default router;
