import { useState, useEffect } from "react";
import axios from 'axios';

const useAPI = (api) => {

    const [newDocuments, setNewDocuments] = useState([]);

    useEffect(() => {
        const fetch = async () => {

            const res = await axios.get(api);
            let documents = res.data;
            documents.pop();

            const newData = documents.map(doc => {
                let { flight_number, launch_date_utc, launch_site, mission_name, launch_success, rocket } = doc;
                if (launch_success) {
                    launch_success = "success"
                } else {
                    launch_success = "failed"
                }
                return {
                    no: flight_number,
                    launched: launch_date_utc,
                    location: launch_site.site_name,
                    mission: mission_name,
                    orbit: rocket.second_stage.payloads[0].orbit,
                    launchStatus: launch_success,
                    rocketName: rocket.rocket_name,

                }
            })

            setNewDocuments(newData);
        }
        fetch();


    }, [api])


    return { newDocuments };
}


export default useAPI;