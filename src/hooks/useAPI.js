import { useState, useEffect } from "react";
import axios from 'axios';

const useAPI = (api) => {

    const [newDocuments, setNewDocuments] = useState([]);

    useEffect(() => {
        const fetch = async () => {

            const res = await axios.get(api);
            let documents = res.data;

            const newData = await Promise.all(documents.map(async (doc) => {
                const { id, flight_number, date_utc, launchpad, name, success, upcoming, rocket, payloads } = doc;
                const payloadId = payloads[0];


                const launchpadData = await axios.get(`https://api.spacexdata.com/v4/launchpads/${launchpad}`);
                const launchpadName = launchpadData.data.name;
                const rocketData = await axios.get(`https://api.spacexdata.com/v4/rockets/${rocket}`);
                const rocketName = rocketData.data.name;
                const payloadData = await axios.get(`https://api.spacexdata.com/v4/payloads/${payloadId}`);
                const orbitName = payloadData.data.orbit;


                let launch_state = null;
                if (success === false && upcoming === false) {
                    launch_state = "failed";
                } else if (success === true) {
                    launch_state = "success";
                } else if (upcoming === true) {
                    launch_state = "upcoming";
                }


                return {
                    id: id,
                    no: flight_number,
                    launched: date_utc,
                    location: launchpadName,
                    mission: name,
                    orbit: orbitName,
                    launchStatus: launch_state,
                    rocketName: rocketName

                }
            }))

            setNewDocuments(newData);
        }
        fetch();


    }, [api])

    return { newDocuments };
}


export default useAPI;