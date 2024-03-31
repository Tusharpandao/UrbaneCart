import React from 'react'
import Layout from '../../components/Layout/Layout'
import Herosection from '../../components/Herosection/Herosection'
import Service from '../../components/Service/Service'
import Gallery from '../../components/Gallery/Gallery'

const Home = () => {
  return (<>
    <Layout>
      <Herosection/>
      <Service/>
      <Gallery/>
    </Layout>




    </>
  )
}

export default Home