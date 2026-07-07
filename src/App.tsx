import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import HomePage from '@/pages/HomePage';
import DestinationPage from '@/pages/DestinationPage';
import DestinationDetailPage from '@/pages/DestinationDetailPage';
import AccommodationPage from '@/pages/AccommodationPage';
import FoodPage from '@/pages/FoodPage';
import SearchPage from '@/pages/SearchPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import UserDashboard from '@/pages/user/UserDashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import NotFoundPage from '@/pages/NotFoundPage';
import ManageDestinationsPage from '@/pages/admin/ManageDestinationsPage';
import ManageAccommodationsPage from '@/pages/admin/ManageAccommodationsPage';
import ManageRestaurantsPage from '@/pages/admin/ManageRestaurantsPage';
import ReviewModerationPage from '@/pages/admin/ReviewModerationPage';
import UsersManagementPage from '@/pages/admin/UsersManagementPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-slate-dark">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationPage />} />
          <Route path="/destinations/:id" element={<DestinationDetailPage />} />
          <Route path="/accommodations" element={<AccommodationPage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/destinations"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageDestinationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/accommodations"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageAccommodationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/restaurants"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageRestaurantsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute requiredRole="admin">
                <ReviewModerationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <UsersManagementPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
