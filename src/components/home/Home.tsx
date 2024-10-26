import GlobalStyles from '../globalstyles/GlobalStyles';
import Snowfall from '../snowfall/Snowfall';
import Nav from '../nav/Nav';
import './Home.css'
import SteamAuth from '../steam/SteamAuth';
import Tracker from '../tracker/Tracker';
import ServerInfo from '../serverInfo/ServerInfo';
import Footer from '../footer/Footer';

export default function Home() {

    return (
        <>  
            
            <GlobalStyles />      
            <Nav />
            <SteamAuth />
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}>
            <Snowfall />  
        </div>


        <div className='container'> 
        <section className="content">
        <h1>AVALON</h1>
        <p>Servidores brasileiros de Counter-Strike 2</p>

        <form action="steam://connect/131.196.196.198:27200"> 
            <button type="submit" className="btn-conectar"><span></span>► Conectar</button>
            </form>
        </section>
        </div> 

        <Tracker />
        <ServerInfo />
        <Footer  />
        </>
    )
}