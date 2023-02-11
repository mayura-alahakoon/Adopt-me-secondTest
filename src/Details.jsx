import { useParams } from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";

const Details = () => {
    const { id } = useParams();
    const results = useQuery(["details", id], fetchPet)

    if (results.isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader">🌀</h2>
            </div>
        );
    }
    const pet = results.data.pets[0];
    return (
        <div className="details">
            <Carousel images={pet.images} />;
            <div>
                <h1>{pet.name}</h1>
                <h2>{`${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`}</h2>
                <button>Adopt {pet.name}</button>
                <p>{pet.description}</p>
                {
                    showModal ? 
                    (
                        <Modal>
                            <div>
                                <h1>Would you like to adopt {pet.name} ? </h1>
                                <div className="buttons">
                                    <button onClick={() => {
                                        setAdoptedPet(pet);
                                        navigate("/");
                
                                    }}>Yes</button>
                                    <button onClick={() => setShowModal(false)}>No</button>
                                </div>
                            </div>
                        </Modal>

                    ): null
                }

            </div>
        </div>
    )
}

export default Details;