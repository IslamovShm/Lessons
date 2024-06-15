import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'

import Lessons from '../Lessons/Lessons'
import './App.module.css'
import routesConfig from '../../routes/routesConfig'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          {
            routesConfig.map((route, index) => (
              <Route 
                key={index}
                path={route.path}
                // exact={route.exact ? true : false}
                element={route.element}
              />
            ))
          }
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
