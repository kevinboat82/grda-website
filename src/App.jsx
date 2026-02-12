import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Media from './pages/Media';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import StoryPage from './pages/StoryPage';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/admin/Login';
import Signup from './pages/admin/Signup';
import Dashboard from './pages/admin/Dashboard';
import StoryEditor from './pages/admin/StoryEditor';
import ProjectEditor from './pages/admin/ProjectEditor';
import MediaManager from './pages/admin/MediaManager';
import MediaUpload from './pages/admin/MediaUpload';
import BoardMembers from './pages/BoardMembers';
import ExecutiveProfiles from './pages/ExecutiveProfiles';
import Directorates from './pages/Directorates';
import Units from './pages/Units';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <BackToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="about/board" element={<BoardMembers />} />
          <Route path="about/executives" element={<ExecutiveProfiles />} />
          <Route path="directorates" element={<Directorates />} />
          <Route path="units" element={<Units />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="services" element={<Services />} />
          <Route path="media" element={<Media />} />
          <Route path="contact" element={<Contact />} />
          <Route path="stories/:id" element={<StoryPage />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="stories/new" element={<StoryEditor />} />
          <Route path="stories/edit/:id" element={<StoryEditor />} />
          <Route path="projects/new" element={<ProjectEditor />} />
          <Route path="projects/edit/:id" element={<ProjectEditor />} />
          <Route path="media" element={<MediaManager />} />
          <Route path="media/upload" element={<MediaUpload />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
