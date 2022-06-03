import AppRoutes from './AppRoutes';
import Navbar from './components/Navbar';
import './stylesheets/App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
