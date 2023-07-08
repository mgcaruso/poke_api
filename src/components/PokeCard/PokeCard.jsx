// import axios from 'axios';
// import { useEffect, useState } from "react";
import './pokeCard.css'
import { Card } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
// eslint-disable-next-line react/prop-types
const PokeCard = ({ poke, getImageType }) => {

    

    return (
        <Card
            bg="light"
            key="light"
            text="dark"
            style={{ width: '18rem' }}
            className="mb-2"
        >
            <Card.Header>
                {poke?.types.map((typeObj, i) => {
                    return (

                        <img className="image" key={i} style={{ height: "28px" }} src={getImageType(typeObj.type.name)} alt={typeObj.type.name} />
                    )
                })}
            </Card.Header>
            <Card.Body>
                <Card.Title> {poke?.name} </Card.Title>
                <Card.Text>

                </Card.Text>
                <section className='d-flex justify-content-between'>
                    <Image src={poke?.sprites.back_default}></Image>
                    <Image src={poke?.sprites.front_default}></Image>
                </section>
            </Card.Body>
        </Card>
    )
}

export default PokeCard;
