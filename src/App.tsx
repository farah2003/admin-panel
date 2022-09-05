import { useContext } from 'react';
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
import UserContext from './context/userContext/userContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Charts />} />
          <Route path="view-kits" element={<ViewKits />} />
          <Route path="add-kits" element={<AddKits />} />
          <Route path="change-password" element={<ChangePassword />} />
          {user.userRoleId === 1 && (
            <Route path="add-admin" element={<AddAdmin />} />
          )}
        </Route>

        <Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
