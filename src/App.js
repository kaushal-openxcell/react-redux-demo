import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import './App.css';

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Navbar } from './components/common/Navbar';
import { Home} from './page/Home';
import { Login } from './page/Login';
import { Register } from './page/Register';
import { ForgotPassword } from './page/ForgotPassword';
import { VerifyOtp } from './page/VerifyOtp';
import { ResetPassword } from './page/ResetPassword';

import { Dashboard } from './page/Dashboard';

import { ROUTER } from './constants';
import { Profile } from './page/Profile';
import { ChangePassword } from './page/ChangePassword';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#fff',
      contrastText: '#fff',
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
  },
})


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Navbar />
          <div style={{ minHeight:'calc(100vh - 70px)' }}>
            <Routes>
              <Route path={ ROUTER.HOME } element={<Home />} />
              <Route path={ ROUTER.LOGIN } element={<Login />} />
              <Route path={ ROUTER.REGISTRATION } element={<Register />} />
              <Route path={ ROUTER.PASSWORD.FORGOT } element={<ForgotPassword />} />
              <Route path={ ROUTER.PASSWORD.VERIFY } element={<VerifyOtp />} />
              <Route path={ ROUTER.PASSWORD.RESET } element={<ResetPassword />} />
              <Route path={ ROUTER.DASHBOARD } element={<Dashboard />} />
              <Route path={ ROUTER.PROFILE } element={<Profile />} />
              <Route path={ ROUTER.PASSWORD.CHANGE } element={<ChangePassword />} />
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
