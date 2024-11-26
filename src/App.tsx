import Home from './components/home/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerModels from './pages/models/PlayerModels';
import VipCard from './components/vip/VipCard';
import ServerModes from './components/server_modes/ServerModes';

function App() {

  return (
   <Router>
    <Routes>
      <Route path='/home'
      element={ <Home />   }
      />
      <Route path='/models'
      element={ <PlayerModels />   }
      />
      <Route path='/vip'
      element={ <VipCard />   }
      />
      <Route path='/servers'
      element={ <ServerModes />   }
      />

<Route path='*'
      element={ <Home />   }
      />
    </Routes>
   </Router>
  )
}

export default App;
