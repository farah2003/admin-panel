import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AddKits, LoginPage, ChangePassword } from './pages';
import { Dashboard } from './components';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<h1>charts</h1>} />
          <Route path="view-kits" element={<h1>view-kits</h1>} />
          <Route path="add-kits" element={<AddKits />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="add-admin" element={<h1>add-admin</h1>} />
          <Route path="logout" element={<h1>logout</h1>} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
