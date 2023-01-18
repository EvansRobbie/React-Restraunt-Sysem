import './App.css';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Orders from './components/Orders';
import Pizza from './components/Pizza';

function App() {
  return (
    <div >
      <Navbar/>
      <Hero />
      <Pizza/>
      <Orders/>
    </div>
  );
}

export default App;
