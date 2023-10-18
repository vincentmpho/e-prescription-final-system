import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className='ripple-background'>
      <div className='circle xxlarge shade1'></div>
      <div className='circle xlarge shade2'></div>
      <div className='circle large shade3'></div>
      <div className='circle mediun shade4'></div>
      <div className='circle small shade5'></div>
      <Component {...pageProps} />
    </div>
    
  );
}

export default MyApp;
