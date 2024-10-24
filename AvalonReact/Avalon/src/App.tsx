
import Home from './components/home/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
   <Router>
    <Routes>
      <Route path='/home'
      element={ <Home />   }
      />

<Route path='*'
      element={ <Home />   }
      />
    </Routes>
   </Router>
  )
}

export default App;
