import Tuits from "../tuits";
import * as service from "../../services/dislikes-service";
import { useEffect, useState } from "react";


const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuis] = useState([]);
    const findTuitsDislike = () => service.findAllTuitsDislikedByUser("me")
        .then((tuits) => setDislikedTuis(tuits));

    useEffect(findTuitsDislike, []);
    console.log("disliked tuits");
    console.log(dislikedTuits.map(dislike => { return dislike.tuit }));

    return (
        <div>
            <h2>My Dislikes</h2>
            <Tuits
                tuits={dislikedTuits.map(dislike => { return dislike.tuit })}
                refreshTuits={findTuitsDislike} />
        </div>
    );
};
export default MyDislikes;