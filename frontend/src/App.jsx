import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const  App = () => {
  return (
    <div id='app' className='container mx-auto min-h-screen text-fontGray '>
      <Header />
      <Outlet /> 
      <Footer />
    </div>
  )
}

export default App;
