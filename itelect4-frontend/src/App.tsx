import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SubmissionsPage from './pages/SubmissionsPage';
import SubmissionFormPage from './pages/SubmissionFormPage';
import ReviewPage from './pages/ReviewPage';

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<CoursesPage />} />
          <Route path="/courses/:code" element={<CourseDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/submissions" element={<SubmissionsPage />} />
            <Route path="/submissions/new" element={<SubmissionFormPage />} />
            <Route path="/review" element={<ReviewPage />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}