import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import image from "../assets/image/background.jpg";

const Home = () => {
  const messagesI18n = {
    en: {
      pageTitle: "Welcome to the Job Board",
      uniqueMessage: "Your career starts here!",
      description: "Find your dream job or post your job opening today!",
      registerBtn: "Register",
      loginBtn: "Login",
      aboutUsBtn: "About Us",
      multiLanguageBtn: "Language",
      dynamicMessages: [
        "Unlock your potential with us!",
        "Explore thousands of job opportunities!",
        "Join our community of successful professionals!",
        "Your dream job is just a click away!",
        "Empowering you to find the right job!",
      ],
    },
    fr: {
      pageTitle: "Bienvenue sur le tableau d'emploi",
      uniqueMessage: "Votre carrière commence ici !",
      description: "Trouvez votre emploi de rêve ou publiez votre offre d'emploi aujourd'hui !",
      registerBtn: "S'inscrire",
      loginBtn: "Se connecter",
      aboutUsBtn: "À propos de nous",
      multiLanguageBtn: "Langue",
      dynamicMessages: [
        "Libérez votre potentiel avec nous !",
        "Explorez des milliers d'opportunités d'emploi !",
        "Rejoignez notre communauté de professionnels réussis !",
        "Votre emploi de rêve est à un clic de vous !",
        "Nous vous aidons à trouver le bon emploi !",
      ],
    },
  };

  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentMessages, setCurrentMessages] = useState(messagesI18n.en.dynamicMessages);
  const [dynamicMessage, setDynamicMessage] = useState(messagesI18n.en.dynamicMessages[0]);
  const [index, setIndex] = useState(0);

  const toggleLanguage = () => {
    if (currentLanguage === 'en') {
      switchLanguage('fr');
    } else {
      switchLanguage('en');
    }
  };

  const switchLanguage = (language) => {
    if (messagesI18n[language]) {
      setCurrentLanguage(language);
      setCurrentMessages(messagesI18n[language].dynamicMessages);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicMessage(currentMessages[index]);
      setIndex((prevIndex) => (prevIndex + 1) % currentMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentMessages, index]);

  const { pageTitle, uniqueMessage, description, registerBtn, loginBtn, aboutUsBtn, multiLanguageBtn } =
    messagesI18n[currentLanguage];

  return (
    <div className="home-container">
      <h1 id="page-title" className="welcome-message">{pageTitle}</h1>

      <div className="dynamic-message">
        <p id="unique-message" className="space-animation">{dynamicMessage}</p>
      </div>

      <p id="description">{description}</p>

      <div className="button-card">
        <Link to="/login" className="btn card-btn">{loginBtn}</Link>
        <Link to="/register" className="btn card-btn">{registerBtn}</Link>
        <Link to="/about-us" className="btn card-btn">{aboutUsBtn}</Link>
        <button className="btn card-btn" onClick={toggleLanguage}>
          {multiLanguageBtn} ({currentLanguage === 'en' ? 'FR' : 'EN'})
        </button>
      </div>

      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
          }

          .home-container {
            background-image: url(${image});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height: 100vh; /* Full viewport height */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #fff; /* Text color for better contrast */
            text-align: center;
            padding: 20px;
          }

          .welcome-message {
            font-size: 3em;
            font-weight: bold;
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
          }

          .dynamic-message {
            font-size: 1.5em;
            margin: 20px 0;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
          }

          #description {
            font-size: 1.2em;
            margin-bottom: 30px;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
          }

          .button-card {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            background: rgba(0, 0, 0, 0.7);
            padding: 10px 20px;
            border-radius: 8px;
            gap: 10px;
          }

          .card-btn {
            background-color: #007bff;
            color: #fff;
            padding: 10px 15px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 1em;
            transition: transform 0.2s ease;
            margin: 5px;
          }

          .card-btn:hover {
            transform: scale(1.1);
          }

          .card-btn:last-child {
            border: 1px solid #fff;
            background-color: transparent;
            color: #fff;
          }

          .card-btn:last-child:hover {
            background-color: #fff;
            color: #007bff;
          }

          /* Responsive Design */

          @media (max-width: 768px) {
            .welcome-message {
              font-size: 2em;
            }

            .dynamic-message {
              font-size: 1.2em;
            }

            #description {
              font-size: 1em;
              margin-bottom: 20px;
            }

            .button-card {
              flex-direction: column;
              gap: 15px;
            }

            .card-btn {
              font-size: 0.9em;
              padding: 8px 12px;
            }
          }

          @media (max-width: 480px) {
            .welcome-message {
              font-size: 1.5em;
            }

            .dynamic-message {
              font-size: 1em;
            }

            #description {
              font-size: 0.9em;
            }

            .button-card {
              padding: 10px;
              gap: 10px;
            }

            .card-btn {
              font-size: 0.8em;
              padding: 8px 10px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
