import React, { useEffect } from "react";

interface DashboardData {
  error?: string;
  avatarmedium: string | null; 
  personaname: string | null;   
}

const SteamInfo: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://avalonservers.site/backend/steamauth/userInfo.php`, {
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
          // Verificar se personaname e avatarmedium são válidos
          if (data.personaname && data.avatarmedium) {
            const botaoAccount = document.querySelector('.btn-login-steam') as HTMLElement;
          if (botaoAccount) {
            botaoAccount.removeAttribute('href');
            botaoAccount.style.paddingRight = '5px';
            botaoAccount.innerHTML = `
                <div class="btn-avatar">
                    <img src="${data.avatarmedium}" alt="Avatar"/>
                </div>
                <div class="btn-content">
                    <span class="username">${data.personaname}</span>
                </div>
                <a href="https://avalonservers.site/backend/index.php?logout" style="color: red; font-weight: 300; text-decoration: none; margin-left: 10px;">Logout</a>
              `;
              botaoAccount.addEventListener('mouseleave', () => {
                botaoAccount.scrollLeft = 0; 
            });
            }
          } else {
            
            // console.log('User is not logged in. Keeping the button unchanged.');
          }
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  return null;
};

export default SteamInfo;