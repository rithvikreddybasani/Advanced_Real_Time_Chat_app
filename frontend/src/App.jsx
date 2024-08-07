import { useEffect, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';

import { bgImages } from './shared/data/index.js';
// updating 
import { useAuthContext } from './shared/context/AuthContext';
import Toast from './components/ui/Toast.jsx';

const HomePage = lazy(() => import('./pages/home/HomePage'));
const LoginPage = lazy(() => import('./pages/login/LoginPage'));
const SignupPage = lazy(() => import('./pages/signup/SignupPage'));
const UpdateProfilePage = lazy(() => import('./pages/update/UpdateProfilePage'));
const UserInfoPage = lazy(() => import('./pages/user/UserInfoPage'));
const LocationPage = lazy(() => import('./pages/location/LocationPage'));
const ShareLocationPage = lazy(() => import('./pages/location/ShareLocationPage'));
const NotFoundPage = lazy(() => import('./pages/notfound/NotFoundPage'));

function App() {
  const { authUser } = useAuthContext();

  useEffect(() => {
    const savedBg = localStorage.getItem('bg');
    const defaultBg = bgImages[0].img;
    const bgToSet = savedBg || defaultBg;

    document.body.style = `background: linear-gradient(to top, rgba(0, 0, 0, 0.384) 50%, transparent),
    url(${bgToSet}) center center / cover fixed no-repeat`;
  }, []);

  return (
    <>
      <Suspense
        fallback={
          <div className='flex items-center justify-center'>
            <p className='loading loading-ring loading-lg'></p>
          </div>
        }
      >
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={authUser ? <HomePage /> : <Navigate to='/login' />} />
            <Route path='/login' element={authUser ? <Navigate to='/' /> : <LoginPage />} />
            <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignupPage />} />
            <Route path='/update/:id' element={authUser ? <UpdateProfilePage /> : <SignupPage />} />
            <Route path='/users/:id' element={authUser ? <UserInfoPage /> : <SignupPage />} />
            <Route path='/location/:id' element={authUser ? <LocationPage /> : <SignupPage />} />
            <Route
              path='/location/:id/share-location'
              element={authUser ? <ShareLocationPage /> : <SignupPage />}
            />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toast />
    </>
  );
}

export default App;
