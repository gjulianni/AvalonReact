import React from "react";
import avalon from '../../assets/avalon.png';
import discord from '../../assets/dc1.png';
import steam from '../../assets/steam.png';
import yt from '../../assets/yt.png';
import './Footer.css'


const Footer: React.FC = () => {

    return (

        <div className="footer">
        <div className="footer-content">
            <img src={avalon} alt="Avalon Logo" id="avalonimg" />
            <div className="footer-links">
                <a href="https://discord.gg/q6CMdxZ9Rd" className="footer-link">
                    <img src={discord} alt="Discord Logo" id="discordimg" />
                    <p>Discord</p>
                </a>
                <a href="https://steamcommunity.com/groups/avalon_cs" className="footer-link">
                    <img src={steam} alt="Steam Logo" id="steamimg" />
                    <p>Grupo Steam</p>
                </a>
                <a href="https://www.youtube.com/@CS2ZEBR/videos" className="footer-link" target="_blank">
                    <img src={yt} alt="Steam Logo" id="steamimg" />
                    <p>YouTube</p>
                </a>
            </div>
        </div>
    </div>
    )
}

export default Footer;