import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  AddKits,
  LoginPage,
  ChangePassword,
  AddAdmin,
  Charts,
  ForgotPassword,
  ViewKits,
} from './pages';
import { Dashboard } from './components';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Charts />} />
          <Route path="view-kits" element={<ViewKits />} />
          <Route path="add-kits" element={<AddKits />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="add-admin" element={<AddAdmin />} />
          <Route path="logout" element={<h1>logout</h1>} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
