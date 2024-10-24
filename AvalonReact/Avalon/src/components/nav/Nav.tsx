import React from "react"
import './Nav.css'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { scrollToSection } from "../../utils/smoothscroll";


const Nav: React.FC = () => {
    return (
        <>
            <nav>

<input type="checkbox" id="check" />
<label htmlFor="check" className="checkbtn" >
<FontAwesomeIcon icon={faBars} className='fas fa-bars' />
</label>
<label className="logo">Avalon</label>
<ul>
    <li>Home</li>
    <li id="vip"><a href="aulas.html">VIP</a></li>
    <li onClick={() => scrollToSection('tracker')}>Servers</li>
    <li><a href="#">Weapon Skins</a></li>
</ul>

</nav>
        </>
    )
}

export default Nav;



