import Tuits from "../tuits";
import * as service from "../../services/dislikes-service";
import { useEffect, useState } from "react";


const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuis] = useState([]);
    const findTuitsDislike = () => service.findAllTuitsDislikedByUser("me")
        .then((tuits) => setDislikedTuis(tuits));

    useEffect(findTuitsDislike, []);

    return (
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsDislike} />
        </div>
    );
};
export default MyDislikes;