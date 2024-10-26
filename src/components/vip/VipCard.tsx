import avalon from '../../assets/avalon.png';
import './VipCard.css'; 
import GlobalStyles from '../globalstyles/GlobalStyles';
import Nav from '../nav/Nav';
import BenefitList from './benefit/BenefitList';
import SteamAuth from '../steam/SteamAuth';
import Footer from '../footer/Footer';

const VipCard = () => {
  const benefits = [
    "Skins de Personagem Exclusivas",
    "FOV: Ajuste do campo de visão",
    "Rainbow Color: Cores vibrantes para o seu personagem",
    "Slot Reservado: Garanta seu lugar no servidor",
    "Tag no nome da sua escolha no chat"
  ];

  return (
    <>
    <GlobalStyles />
    <Nav />
    <SteamAuth />

   
    <section className='vip-container'>
    <h1 id='vip-title-h1'>VIP</h1>
    <div id="card-vip">
      <div className="card-vip-content">
        <img src={avalon} id="img-vip-avalon" alt="VIP Avalon" />
        <div className="vipcard-titles">
          <h2 id="title-vip">VIP Avalon</h2>
          <p id="description-vip">
            Adquirindo o VIP, você ganha os seguintes benefícios e ajuda no crescimento do servidor e da comunidade:
          </p>
        </div>
      </div>
      <BenefitList benefits={benefits} marker="⭐" />
      <p id="price-vip">Preço do VIP: <strong>3.00 USD</strong></p>
      <form  id='buy-button-vip' action='https://avalon-community-store.tebex.io/'>
      <button id="buy-button-vip">Comprar VIP</button>
      </form>
    </div>
    </section>
    <Footer />
    </>
  );
};

export default VipCard;