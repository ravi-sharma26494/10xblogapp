import { Routes , Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Register from './Components/Register';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route  exact path='/' element={<Register />} />
        <Route  exact path='/navbar' element={<Navbar />} />
      </Routes>
      
    </div>
  );
}

export default App;
