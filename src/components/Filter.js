const Filter = ({ launches, setFilteredLaunches, setCurrentPage }) => {

    const handleFilter = (e) => {


        if (e.target.value === 'all') {

            setCurrentPage(1);
            setFilteredLaunches(launches);

        }
        else if (e.target.value === 'success') {
            setCurrentPage(1);
            let successfulLaunches = launches.filter(launch => launch.launchStatus === 'success');

            setFilteredLaunches(successfulLaunches);

        }
        else if (e.target.value === 'failed') {
            setCurrentPage(1);
            let failedLaunches = launches.filter(launch => launch.launchStatus === 'failed');

            setFilteredLaunches(failedLaunches);
        }
    }


    return (
        <div className="filter-container">
            <div className="filter">
                <label htmlFor="launch-filter"><i className='bx bx-filter-alt'></i></label>

                <select id="launch-filter" onChange={handleFilter}>
                    <option value="all">All Launches</option>
                    <option value="success">Successful Launches</option>
                    <option value="failed">Failed Launches</option>
                </select>
            </div>

        </div>
    );
}

export default Filter;