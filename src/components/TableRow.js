import { useEffect, useRef } from "react";



const TableRow = ({ no, launched, location, mission, orbit, launchStatus, rocketName, setSelectedLaunch }) => {

    const status = useRef();

    useEffect(() => {
        if (launchStatus === "success") {
            status.current.classList.add(true);
        } else if (launchStatus === "failed") {
            status.current.classList.add(false)
        }
        else {
            status.current.classList.add("upcoming");
        }


    }, [launchStatus])
    return (
        <tr onClick={() => setSelectedLaunch(no)}>
            <td>{no}</td>
            <td>{launched}</td>
            <td>{location}</td>
            <td>{mission}</td>
            <td>{orbit}</td>
            <td ><button className="status" ref={status}>{launchStatus}</button></td>
            <td>{rocketName}</td>
        </tr>
    )
}

export default TableRow;