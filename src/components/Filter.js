const Filter = ({ launches, setFilteredLaunches }) => {

    const handleFilter = (e) => {


        if (e.target.value === 'all') {

            setFilteredLaunches(launches);

        }
        else if (e.target.value === 'success') {

            let successfulLaunches = launches.filter(launch => launch.launchStatus === 'success');

            setFilteredLaunches(successfulLaunches);

        }
        else if (e.target.value === 'failed') {

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