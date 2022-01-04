import React from 'react'
import { Switch, Route, BrowserRouter, Routes } from 'react-router-dom'
import Header from './Header'
import Pets from '../pages/Pets'

const App = () => (
  <BrowserRouter>
    <Header />
    <div>
      <Routes>
        <Route exact path="/" element={<Pets />} />
      </Routes>
    </div>
  </BrowserRouter>
)

export default App
