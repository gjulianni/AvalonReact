import React from 'react';
import './PlayerModels.css';


import image1 from '../../assets/models/image_1.png';
import image3 from '../../assets/models/image_3.png';
import image4 from '../../assets/models/image_4.png';
import image5 from '../../assets/models/image_5.png';
import image8 from '../../assets/models/image_8.png';
import image9 from '../../assets/models/image_9.png';
import image11 from '../../assets/models/image_11.png';
import image12 from '../../assets/models/image_12.png';
import image13 from '../../assets/models/image_13.png';


import GlobalStyles from '../../components/globalstyles/GlobalStyles';
import Nav from '../../components/nav/Nav';
import SteamAuth from '../../components/steam/SteamAuth';
import Footer from '../../components/footer/Footer';


interface CardProps {
  imageSrc: string;
  name: string;
}



const Card: React.FC<CardProps> = ({ imageSrc, name }) => {
  return (
    <div className="card-models">
      <img src={imageSrc} alt={name} />
      <p>{name}</p>
    </div>
  );
};

const GridLayout: React.FC = () => {
  // Array com os imports das imagens
  const imagePaths = [
    { src: image1, name: 'Furina' },
    { src: image3, name: 'Elysia' },
    { src: image4, name: 'Keqing' },
    { src: image5, name: 'Kafka' },
    { src: image8, name: 'Pyramid Head' },
    { src: image9, name: 'Gawr Gura' },
    { src: image11, name: 'TrollFace' },
    { src: image12, name: 'Carl Johnson' },
    { src: image13, name: 'Hunk' },
  ];

  return (
    <>
    
    <GlobalStyles />
    <Nav />
    <SteamAuth />


    <div className='models-title'>
        <h1>VIP Player Models</h1>
    </div>

    <div className="grid-container">
      {imagePaths.map((card, index) => (
        <Card key={index} imageSrc={card.src} name={card.name} />
      ))}
    </div>
    <Footer />
    </>
  );
};

export default GridLayout;