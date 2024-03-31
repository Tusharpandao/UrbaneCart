import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'

const Layout = ({children}) => {
  return (
    <div><NavBar/>

    <div className='content'>
    {children}

    </div>
    
    <Footer/>
    </div>
  )
}

export default Layout