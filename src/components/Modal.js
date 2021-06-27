import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';


const Modal = ({ selectedLaunch, setSelectedLaunch }) => {


    const [data, setData] = useState(null);


    useEffect(() => {

        const fetch = async () => {
            let res = await axios.get(`https://api.spacexdata.com/v3/launches?flight_number=${selectedLaunch}`);
            let { flight_number, launch_date_utc, launch_site, mission_name, launch_success, rocket, links, details } = res.data[0];
            if (launch_success) {
                launch_success = "success"
            } else {
                launch_success = "failed"
            }
            setData({
                no: flight_number,
                launchDate: launch_date_utc,
                location: launch_site.site_name,
                missionName: mission_name,
                orbit: rocket.second_stage.payloads[0].orbit,
                launchStatus: launch_success,
                rocketName: rocket.rocket_name,
                rocketType: rocket.rocket_type,
                missionPatch: links.mission_patch_small,
                articleLink: links.article_link,
                wikipediaLink: links.wikipedia,
                youtubeLink: links.video_link,
                details: details,
                manufacturer: rocket.second_stage.payloads[0].manufacturer,
                nationality: rocket.second_stage.payloads[0].nationality,
                payload_type: rocket.second_stage.payloads[0].payload_type

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
                            <button className="status">{data.launchStatus}</button>
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