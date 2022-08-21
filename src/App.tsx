import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Dashboard } from './components';
import { LoginPage } from './pages';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<h1>charts</h1>} />
          <Route path="view-kits" element={<h1>view-kits</h1>} />
          <Route path="add-kits" element={<h1>add-kits</h1>} />
          <Route path="reset-password" element={<h1>reset-password</h1>} />
          <Route path="add-admin" element={<h1>add-admin</h1>} />
          <Route path="logout" element={<h1>logout</h1>} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
