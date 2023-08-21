import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LandingPage from './LandingPage/LandingPage';
import Register from './Authentification/Register';
import Login from './Authentification/Login';
import Dashboard from './dashboards/Dashboard';
import Admin from './dashboards/Admin';
import BookPage from './Books/BookViewer';
import QuizPage from './Quiz/QuizViewer';
import ChildLogin from './Authentification/ChildLogin';
import StudentDashboard from './dashboards/Student';
import Booklist from './Books/BookList';
import BooklistByLevel from './Books/ReadingLevel';



function App() {
  const googleApiToken = import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN;
  return (
    <GoogleOAuthProvider clientId={googleApiToken}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='student-login' element={<ChildLogin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin' element={<Admin />} />
        <Route path="/bookpage/:id" element={<BookPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path='/student' element={<StudentDashboard />} />
        <Route path="/books/:readingLevel" element={<BooklistByLevel/>} />

      </Routes>
    </GoogleOAuthProvider>
  
  );
}

export default App;