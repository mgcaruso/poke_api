import { Link as LinkRouter } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
    const links = [{ name: "Home", path: "/" }, { name: "About", path: "" }]
    return (
        <nav className='nav_container'>
            <ul>
                {links.map((item, index) =>
                    <li key={index}><LinkRouter className="link" to={item.path}>{item.name}</LinkRouter></li>)
                }

            </ul>
        </nav>
    )
}

export default Navbar
