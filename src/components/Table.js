import TableRow from "./TableRow";
import Loading from "./Loading";
import Error from "./Error";

const Table = ({ launches, setSelectedLaunch, loading }) => {


    if (loading) {
        return <Loading />
    }
    return (
        <div className="table-container">
            <table className="table">
                <thead className="table-header">
                    <tr>
                        <th>No:</th>
                        <th>Launched (UTC)</th>
                        <th>Location</th>
                        <th>Mission</th>
                        <th>Orbit</th>
                        <th>Launch Status</th>
                        <th>Rocket</th>
                    </tr>

                </thead>

                <tbody>

                    {!launches ? <Error /> :
                        launches.map((launch) => {

                            return <TableRow key={launch.id}
                                id={launch.id}
                                no={launch.no}
                                launched={launch.launched}
                                location={launch.location}
                                mission={launch.mission}
                                orbit={launch.orbit}
                                launchStatus={launch.launchStatus}
                                rocketName={launch.rocketName}
                                setSelectedLaunch={setSelectedLaunch} />
                        })
                    }
                </tbody>

            </table>

        </div >
    )
}

export default Table;