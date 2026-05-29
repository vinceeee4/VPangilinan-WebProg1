import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';
import RoleBasedDashboard from './components/RoleBasedDashboard';
import UsersPage from './pages/DashboardPages/UsersPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import DashArticlesPage from './pages/DashboardPages/DashArticlesPage';
import ArticleSelectionsPage from './pages/DashboardPages/ArticleSelectionsPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute';

const routes = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'signin',
        element: <SignInPage />
      },
      {
        path: 'signup',
        element: <SignUpPage />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardLayout><RoleBasedDashboard /></DashboardLayout></ProtectedRoute>,
    errorElement: <NotFoundPage />
  },
  {
    path: '/dashboard/articles',
    element: <ProtectedRoute allowedRoles={['admin', 'editor']}><DashboardLayout><DashArticlesPage /></DashboardLayout></ProtectedRoute>,
    errorElement: <NotFoundPage />
  },
  {
    path: '/dashboard/users',
    element: <ProtectedRoute roles={['admin']}><DashboardLayout><UsersPage /></DashboardLayout></ProtectedRoute>,
    errorElement: <NotFoundPage />
  },
  {
    path: '/dashboard/reports',
    element: <ProtectedRoute allowedRoles={['admin', 'editor', 'user']}><DashboardLayout><ReportsPage /></DashboardLayout></ProtectedRoute>,
    errorElement: <NotFoundPage />
  },
  {
    path: '/dashboard/article-selections',
    element: <ProtectedRoute allowedRoles={['admin']}><DashboardLayout><ArticleSelectionsPage /></DashboardLayout></ProtectedRoute>,
    errorElement: <NotFoundPage />
  },
  {
    path: '/',
    element: <Layout />,
    // Error element
    errorElement: <NotFoundPage />,
    children: [{
      // Path declaration
      path: '/',
      element: <HomePage />
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/articles',
      element: <ArticleListPage />
    },
    {
      path: '/articles/:name', // -->articles/learn-react
      element: <ArticlePage />
    }
    ]
  }
]

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
