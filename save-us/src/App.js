import { React } from 'react';
import './App.css';
import EditInfo from './components/mypage/EditInfo';
import Main from './pages/Main';

function App() {
  return (
    <div className="App">
      <Main />
      <EditInfo />
    </div>
  );
}

export default App;
