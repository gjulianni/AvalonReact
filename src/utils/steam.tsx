import React, { useEffect } from "react";

interface DashboardData {
  error?: string;
  avatar: string;
  username: string;
}

const SteamInfo: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/AvalonReact/Avalon/src/backend/steamauth/dashboard.php', {
          credentials: 'include'  // Habilitar envio de cookies
        });


        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
    
        const data: DashboardData = await response.json();
        if (data.error) {
          console.log('Error:', data.error);
          const btnLogin = document.getElementById('btn-login-steam');
          if (btnLogin) {
            btnLogin.innerHTML = '<p>Error loading dashboard data.</p>';
          }
        } else {

          const botaoAccount = document.querySelector('.btn-login-steam') as HTMLElement;
          if (botaoAccount) {
            botaoAccount.removeAttribute('href');
            botaoAccount.style.paddingRight = '30px';
            botaoAccount.innerHTML = `
              <div class="infos">
                <img src="${data.avatar}" style="width: 45px; height: 45px; border-radius: 50px; position: relative; right: 3.2%;" alt="Avatar"/>
               <span class="username">${data.username}</span>
              </div>
              <a href="http://localhost/AvalonReact/Avalon/src/backend/steamauth/logout.php" style="color: red; font-weight: 300; text-decoration: none; margin-left: 10px;">Logout</a>
            `;
          }
        }
      } catch (error) {
        console.error('Error fetching the dashboard data:', error);
        const dashboard = document.getElementById('dashboard');
        if (dashboard) {
          dashboard.innerHTML = '<p>Error fetching data.</p>';
        }
      }
    };

    fetchData();
  }, []);

  return null;
};

export default SteamInfo;