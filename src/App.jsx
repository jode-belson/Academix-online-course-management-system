import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Core Layout & Utility Components
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute';
import MainLayout from './layouts/MainLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import CourseDetailPage from './pages/user/CourseDetailPage';
import SubscribedCourses from './pages/user/SubscribedCourses';
import UserReports from './pages/user/UserReports';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AddCoursePage from './pages/admin/AddCoursePage';
import ManageCoursesPage from './pages/admin/ManageCoursesPage';
import EditCoursePage from './pages/admin/EditCoursePage';
import SubscriberListPage from './pages/admin/SubscriberListPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';

function App() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '64px' }}> {/* This padding prevents content from being hidden under the fixed header */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/course/:courseId" element={<CourseDetailPage />} />

          {/* User Dashboard Routes (Nested inside MainLayout with Sidebar) */}
          <Route element={<PrivateRoute allowedRoles={['user']} />}>
              <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/dashboard/courses" element={<SubscribedCourses />} />
                  <Route path="/dashboard/reports" element={<UserReports />} />
              </Route>
          </Route>

          {/* Admin Dashboard Routes (Nested inside MainLayout with Sidebar) */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
               <Route element={<MainLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/add" element={<AddCoursePage />} />
                  <Route path="/admin/manage" element={<ManageCoursesPage />} />
                  <Route path="/admin/edit/:courseId" element={<EditCoursePage />} />
                  <Route path="/admin/subscribers" element={<SubscriberListPage />} />
                  <Route path="/admin/reports" element={<AdminReportsPage />} />
               </Route>
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;