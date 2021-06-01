import axios from 'axios';
import { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import { Fragment } from 'react';
import NavBar from '../components/NavBar';
import '../app.css';

function MyApp({ Component, pageProps }: AppProps) {
  const {pathname} = useRouter()
  const authRoutes = ['/register', '/login']
  const isAuthRoute = authRoutes.includes(pathname)

  axios.defaults.withCredentials = true
  axios.defaults.baseURL = 'http://localhost:4000' //change for production

//I'm gonna make this sidebar into a top nav anyways...
  return (
    <div>
      <Fragment>
        {!isAuthRoute && <NavBar />}
        <div>
          <Component {...pageProps} /> 
        </div>
      </Fragment>
    </div>
  )
}

export default MyApp;
