import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function App({ Component, pageProps }) {
  return <>
        <Component {...pageProps} />
        <ToastContainer
            position={'bottom-center'}
            autoClose={5000} pauseOnFocusLoss={true}
            closeOnClick={false}
        />
  </>
}
