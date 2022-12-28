import { Routes , Route } from 'react-router-dom';
import './App.css';
import CreatePost from './Components/CreatePost';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from './Components/Register';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route  exact path='/' element={<Register />} />
        <Route  exact path='/login' element={<Login />} />
        <Route  exact path='/navbar' element={<Navbar />} />
        <Route  exact path='/home' element={<Home />} />
        <Route  exact path='/createpost' element={<CreatePost />} />
      </Routes>
      
    </div>
  );
}

export default App;
