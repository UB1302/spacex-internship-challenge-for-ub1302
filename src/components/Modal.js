import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';


const Modal = ({ selectedLaunch, setSelectedLaunch }) => {


    const [data, setData] = useState(null);



    useEffect(() => {

        const fetch = async () => {
            let res = await axios.get(`https://api.spacexdata.com/v4/launches/${selectedLaunch}`);
            let { flight_number, date_utc, launchpad, name, payloads, success, upcoming, rocket, links, details } = res.data;
            const payloadId = payloads[0];

            const launchpadData = await axios.get(`https://api.spacexdata.com/v4/launchpads/${launchpad}`);
            const launchpadName = launchpadData.data.name;
            const payloadData = await axios.get(`https://api.spacexdata.com/v4/payloads/${payloadId}`);
            const orbitName = payloadData.data.orbit;
            const manufacturerName = payloadData.data.manufacturers[0];
            const nationalityName = payloadData.data.nationalities[0];
            const payloadType = payloadData.data.type;
            const rocketData = await axios.get(`https://api.spacexdata.com/v4/rockets/${rocket}`);
            const rocketName = rocketData.data.name;
            const rocketType = rocketData.data.type;





            let launch_state = null;
            if (success === false && upcoming === false) {
                launch_state = "failed";

            } else if (success === true) {
                launch_state = "success";

            } else if (upcoming === true) {
                launch_state = "upcoming";

            }

            setData({
                no: flight_number,
                launchDate: date_utc,
                location: launchpadName,
                missionName: name,
                orbit: orbitName,
                launchStatus: launch_state,
                rocketName: rocketName,
                rocketType: rocketType,
                missionPatch: links.patch.small,
                articleLink: links.article,
                wikipediaLink: links.wikipedia,
                youtubeLink: links.webcast,
                details: details,
                manufacturer: manufacturerName,
                nationality: nationalityName,
                payload_type: payloadType

            })

        }
        fetch();
        return () => { }


    }, [selectedLaunch])




    function handleClick(e) {
        if (e.target.classList.contains('backdrop')) {
            setSelectedLaunch(null);
        }
    }

    return (

        < motion.div className="backdrop" onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {data && <motion.div className="modal-container"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
            >

                <div className="modal">
                    <div className="modal-header">
                        <div className="modal-patch">
                            <img className="modal-patch-img" src={`${data.missionPatch}`} alt="mission patch" />
                        </div>
                        <div className="modal-brief">
                            <h3>{data.missionName}</h3>
                            <h5>{data.rocketName}</h5>
                            <p >
                                <span >Nasa</span>
                                <span className="modal-brief-icons"><a href={data.wikipediaLink} target="_blank" rel="noreferrer"><i className='bx bxl-wikipedia'></i></a></span>
                                <span className="modal-brief-icons"><a href={data.youtubeLink} target="_blank" rel="noreferrer"><i className='bx bxl-youtube' ></i></a></span>
                            </p>
                        </div>
                        <div className="modal-status">
                            <button className="status ">{data.launchStatus}</button>
                        </div>
                    </div>

                    <div className="modal-details">
                        <p>{data.details}.</p>
                    </div>

                    <div className="modal-about">


                        <ul className="modal-list">
                            <li className="modal-list-item"><div className="modal-list-item-title">Flight Number:-</div>  <div>{data.no}</div></li>
                            <li className="modal-list-item"><div className="modal-list-item-title">Mission Name:-</div>  <div>{data.missionName}</div></li>
                            <li className="modal-list-item"><div className="modal-list-item-title">Rocket Type:-</div>  <div>{data.rocketType}</div></li>
                            <li className="modal-list-item"><div className="modal-list-item-title">Rocket Name:-</div>  <div>{data.rocketName}</div></li>
                            <li className="modal-list-item"><div className="modal-list-item-title">Manufacturer:-</div>  <div>{data.manufacturer}</div></li>
                            <li className="modal-list-item"><div className="modal-list-item-title">Nationality:-</div>  <div>{data.nationality}</div></li>
                            <li className="modal-list-item"><div className="modal-list-item-title">Launch Date:-</div>  <div>{data.launchDate}</div></li>
                            <li className="modal-list-item"><div className="modal-list-item-title">Orbit:-</div>  <div>{data.payload_type}</div></li>
                            <li className="modal-list-item"><div className="modal-list-item-title">Launch Site:-</div>  <div>{data.location}</div></li>

                        </ul>
                    </div>
                </div>




            </motion.div>
            }
        </motion.div>


    )
}

export default Modal;