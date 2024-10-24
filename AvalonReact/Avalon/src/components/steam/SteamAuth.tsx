import React from "react"
import './SteamAuth.css'
import SteamInfo from '../../utils/steam';

const SteamAuth: React.FC = () => {
    return (
        <>
           <div className="steamlogon">
            <a href="http://localhost/AvalonReact/Avalon/src/backend/steamauth/init-openId.php" className="btn-login-steam">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png" 
                    style={{ width: '30px', marginRight: '10px' }} />
                    <SteamInfo />
                <span className="btn-text">Login com Steam</span>
            </a>
        </div>
        </>
    )
}

export default SteamAuth;