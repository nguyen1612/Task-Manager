import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import Error from './pages/error';
import Test from './pages/test';

function App() {
  return <Router>
    
    <Routes path='/'>
      <Route index element={<Home/>} />
      <Route path="/test" element={<Test/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />

      <Route path="*" element={<Error/>}/>
    </Routes>

  </Router>
}

export default App;