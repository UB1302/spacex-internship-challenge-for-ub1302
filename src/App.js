
import './App.css';
import { useEffect, useState } from 'react';
import useAPI from './hooks/useAPI';
import Table from './components/Table';


function App() {

  const api = 'https://api.spacexdata.com/v3/launches';
  const [launches, setLaunches] = useState([]);
  const { newDocuments } = useAPI(api);

  // loading data
  useEffect(() => {

    setLaunches(newDocuments);

  }, [newDocuments]);

  return (
    <div className="App">
      <header className="title-container">
        <h1 className="title">SPACEX 🚀</h1>
      </header>
      <main className="main">


        <Table launches={launches} />


      </main>
    </div>
  );
}

export default App;
