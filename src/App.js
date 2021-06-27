import './App.css';
import { useEffect, useState } from 'react';
import useAPI from './hooks/useAPI';
import Table from './components/Table';
import Filter from './components/Filter';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
import Modal from './components/Modal';

function App() {

  const api = 'https://api.spacexdata.com/v3/launches';
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [launchesPerPage] = useState(10);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const { newDocuments } = useAPI(api);
  const [loading, setLoading] = useState(true)

  // loading data
  useEffect(() => {

    setLaunches(newDocuments);
    setFilteredLaunches(newDocuments);
    setLoading(false);

  }, [newDocuments]);


  // Get current posts
  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
  const currentLaunches = filteredLaunches.slice(indexOfFirstLaunch, indexOfLastLaunch);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <header className="title-container">
        <h1 className="title">SPACEX 🚀</h1>
      </header>
      <main className="main">

        <Filter launches={launches} setFilteredLaunches={setFilteredLaunches} setCurrentPage={setCurrentPage} />
        {loading ? <Loading /> : <Table launches={currentLaunches} setSelectedLaunch={setSelectedLaunch} loading={loading} />}
        <Pagination launchesPerPage={launchesPerPage} totalLaunches={filteredLaunches.length} paginate={paginate} />
        {selectedLaunch && <Modal selectedLaunch={selectedLaunch} setSelectedLaunch={setSelectedLaunch} />}

      </main>
    </div>
  );
}

export default App;
