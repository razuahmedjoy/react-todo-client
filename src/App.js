import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddTask from './pages/Home/AddTask';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Footer from './partials/Footer';
import Header from './partials/Header';
import{ Toaster } from 'react-hot-toast';
import RequireAuth from './pages/Login/RequireAuth';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>}></Route>
        <Route path="/add-task" element={<RequireAuth><AddTask /></RequireAuth>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      <Toaster />
      <Footer />

    </div>
  );
}

export default App;
