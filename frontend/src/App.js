import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import Error from './pages/error';

function App() {
  return <Router>
    
    <Routes path='/'>
      <Route index element={<Home/>} />
      <Route path='/login' element={<Login/>} />

      <Route path="*" element={<Error/>}/>
    </Routes>

  </Router>
}

export default App;
