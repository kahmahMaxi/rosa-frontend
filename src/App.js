import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store';
// import { WalletContextProvider } from './utilities/WalletProvider';
// components
import Sidebar from './components/sidebar';
import Header from './components/header';
import ToastGeneral from './components/toast';
import Loading from './components/loading';

// pages
import AuthPage from './pages/auth/authpage';
import SignIn from './pages/auth/signin';
import SignUp from './pages/auth/signup';
import Home from './pages/home';
import Wellness from './pages/wellness';
import Insights from './pages/insights';
import Connect from './pages/connect';
import Profile from './pages/profile';
import RightBar from './components/rightbar';
import Crisis from './pages/crisis';

// styles
import './styles/main.css'
import './styles/auth.css'
import './styles/sidebar.css'
import './styles/rightbar.css'
import './styles/flex-system.css'
import './styles/grid-system.css'
import './styles/text.css'
import './styles/spacing.css'
import './styles/responsive.css'
import './styles/effect.css'
import './styles/moodring.css'
import './styles/wellness-score.css'


// custom_-_js_-_files
import './scripts/main';

function App() {

  
  return (
    <Provider store={store}>

      {/* <WalletContextProvider> */}
          
        <BrowserRouter>
          <div className="tech-container flex row">

            <Loading />

            <ToastGeneral />

            <Sidebar />

            <div className="main-screen">
              <Header />

              <Routes>

                <Route 
                  index
                  path='/'
                  element={<Home />}
                />

                {/* auths */}
                <Route 
                  index
                  path='/auth'
                  element={<AuthPage />}
                />
                {/* <Route 
                  index
                  path='/signin'
                  element={<SignIn />}
                />
                <Route 
                  index
                  path='/signup'
                  element={<SignUp />}
                /> */}
                {/* auths */}

                <Route 
                  index
                  path='/wellness'
                  element={<Wellness />}
                />
                <Route 
                  index
                  path='/insights'
                  element={<Insights />}
                />
                <Route 
                  index
                  path='/connect'
                  element={<Connect />}
                />
                <Route 
                  index
                  path='/profile'
                  element={<Profile />}
                />
                <Route 
                  index
                  path='/crisis'
                  element={<Crisis />}
                />

              </Routes>
            </div>

            <RightBar />

          </div>

      </BrowserRouter>

    {/* </WalletContextProvider> */}

  </Provider>
  );
}

export default App;
