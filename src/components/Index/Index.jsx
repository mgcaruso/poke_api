import { useEffect, useState } from 'react'
import PokeCard from '../PokeCard/PokeCard';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Select from 'react-select'
import './index.css'


const Index = () => {

    const [pokes, setPokes] = useState([]);
    const [filtered, setFiltered] = useState(null);
    const [input, setInput] = useState("");
    const [typeSelected, setTypeSelected] = useState("");

    const getPokemons = async () => {
        try {
            const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0");
            const data = await res.json();
            let promises = data.results.map(async (poke) => {
                const res = await fetch(poke.url);
                const data = res.json();
                return data;
            });
            await Promise.all(promises).then(res => setPokes(res)).catch(err => err.message);

        } catch (err) {
            console.log(err)
        }
    }

    //Function declarations :
    const getImageType = (type) => {
        switch (type) {
            case "fighing":
                return "https://archives.bulbagarden.net/media/upload/3/3b/Fighting_icon_SwSh.png";
            case "normal":
                return "https://archives.bulbagarden.net/media/upload/9/95/Normal_icon_SwSh.png";
            case "flying":
                return "https://archives.bulbagarden.net/media/upload/b/b5/Flying_icon_SwSh.png";
            case "poison":
                return "https://archives.bulbagarden.net/media/upload/8/8d/Poison_icon_SwSh.png";
            case "ground":
                return "https://archives.bulbagarden.net/media/upload/2/27/Ground_icon_SwSh.png";
            case "rock":
                return "https://archives.bulbagarden.net/media/upload/1/11/Rock_icon_SwSh.png";
            case "bug":
                return "https://archives.bulbagarden.net/media/upload/9/9c/Bug_icon_SwSh.png";
            case "ghost":
                return "https://archives.bulbagarden.net/media/upload/0/01/Ghost_icon_SwSh.png";
            case "steel":
                return "https://archives.bulbagarden.net/media/upload/0/09/Steel_icon_SwSh.png";
            case "fire":
                return "https://archives.bulbagarden.net/media/upload/a/ab/Fire_icon_SwSh.png";
            case "water":
                return "https://archives.bulbagarden.net/media/upload/8/80/Water_icon_SwSh.png";
            case "grass":
                return "https://archives.bulbagarden.net/media/upload/a/a8/Grass_icon_SwSh.png";
            case "electric":
                return "https://archives.bulbagarden.net/media/upload/7/7b/Electric_icon_SwSh.png";
            case "psychic":
                return "https://archives.bulbagarden.net/media/upload/7/73/Psychic_icon_SwSh.png";
            case "ice":
                return "https://archives.bulbagarden.net/media/upload/1/15/Ice_icon_SwSh.png";
            case "dragon":
                return "https://archives.bulbagarden.net/media/upload/7/70/Dragon_icon_SwSh.png";
            case "dark":
                return "https://archives.bulbagarden.net/media/upload/d/d5/Dark_icon_SwSh.png";
            case "fairy":
                return "https://archives.bulbagarden.net/media/upload/c/c6/Fairy_icon_SwSh.png ";
            default:
                return;
        }
    }

    const generateUniqueOptionTypes = (arr) => {
        let typesArray = arr.map((poke) => poke.types.map(type => type.type.name)).flat();
        let unique = new Set([...typesArray])
        let mapped = [...unique].map(item => ({ value: item, label: item, icon: getImageType(item) }))
        return mapped;
    }
    let options = generateUniqueOptionTypes(pokes);
    options = [{ value: "", label: "Clear filter", icon: "" }, ...options];

    const filterPokes = (inputValue, type) => {
        let filterTypes = pokes.filter(item => {
            for (let typeObj of item.types) {

                return typeObj.type.name === type
            }
        })

        let filteredInput = pokes.filter(item => {
            return item.name.startsWith(inputValue)
        })

        let arrP = [];
        for (let poke of pokes) {
            if (poke.name.startsWith(inputValue)) {
                for (let typeObj of poke.types) {
                    if (typeObj.type.name === type) {
                        arrP.push(poke);
                    }
                }
            }
        }

        if (inputValue && !type) { //if input has value
            setFiltered(filteredInput);
        } else if (!inputValue && type) {
            setFiltered(filterTypes);
        } else if (inputValue && type) {
            setFiltered(arrP);
        } else { //if neither has value
            setFiltered(pokes);
        }

    }


    useEffect(() => {
        //OPCION 1: Async
        getPokemons();
        // //OPCION 2: (Con fetch)
        // //PASO A PASO DEL FETCHING
        // fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0") //Devuelve un array con ojb estructura nombre y url
        // //paso a json
        //   .then(res => res.json()) 
        //   //trabajo con la respuesta
        //   .then(res => { 
        //     let promises = res.map(item => //hago un map sobre el array de resultados
        //       axios.get(item.url).then(res => res.data).catch(err => err) //hago una petición a la propiedad url de cada elemento. Al retornar el llamado a axios, esto me devuelve un array de promesas. (que debo resolver)
        //       );
        //     Promise.all(promises) //utilizo el método Promise all para iterear sobre la lista de promesas y resolverlas. Sigo com oun fetch comun 
        //       .then(data => setPokes(data)) //seteo la lista en Pokes
        //       .catch(err => console.error(err));
        //   })
        //   .catch(err => err.message)
    }, [])


    useEffect(() => {

        filterPokes(input, typeSelected)

    }, [pokes, input, typeSelected])

    console.log(pokes)

    // console.log(filtered);
    return (
        <main className="main min-vh-100 min-vh-100">
            <Form className='p-3 d-flex gap-3'>
                <InputGroup className="" >
                    <InputGroup.Text id="basic-addon1">🔎</InputGroup.Text>
                    <Form.Control onChange={(e) => setInput(e.target.value)}
                        placeholder="Search a Pokemon..."
                        aria-label="Search a Pokemon"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <Select
                    getOptionLabel={e => (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img style={{height: "25px"}} src={e.icon} alt={e.value} />
                            <span style={{ marginLeft: 15 }}>{[e.label.split("")[0].toUpperCase(),...e.label.slice(1)].join("")}</span>
                        </div>
                    )}
                    onChange={(e) => setTypeSelected(e.value)} className="w-50" options={options} />
            </Form>
            <section className='d-flex justify-content-evenly flex-wrap p-4 gap-3'>

                {filtered?.map((item, i) =>
                    <PokeCard key={i} poke={item} getImageType={getImageType} />
                )}
            </section>
        </main>
    )
}

export default Index;
