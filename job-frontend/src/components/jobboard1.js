import React, { useState, useEffect } from 'react';
import './JobBoard.css';  // Import the CSS file for this component

const JobBoard = () => {
  // Define message translations for both languages (English and French)
  const messagesI18n = {
    en: {
      pageTitle: "Welcome to the Job Board",
      uniqueMessage: "Your career starts here!",
      description: "Find your dream job or post your job opening today!",
      registerBtn: "Register",
      loginBtn: "Login",
    },
    fr: {
      pageTitle: "Bienvenue sur le tableau d'emploi",
      uniqueMessage: "Votre carrière commence ici !",
      description: "Trouvez votre emploi de rêve ou publiez votre offre d'emploi aujourd'hui !",
      registerBtn: "S'inscrire",
      loginBtn: "Se connecter",
    },
  };

  // Define dynamic messages for both languages
  const messagesEn = [
    "Unlock your potential with us!",
    "Explore thousands of job opportunities!",
    "Join our community of successful professionals!",
    "Your dream job is just a click away!",
    "Empowering you to find the right job!",
  ];

  const messagesFr = [
    "Libérez votre potentiel avec nous !",
    "Explorez des milliers d'opportunités d'emploi !",
    "Rejoignez notre communauté de professionnels réussis !",
    "Votre emploi de rêve est à un clic de vous !",
    "Nous vous aidons à trouver le bon emploi !",
  ];

  // Set default language to English
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentMessages, setCurrentMessages] = useState(messagesEn);
  const [dynamicMessage, setDynamicMessage] = useState(messagesEn[0]);
  const [index, setIndex] = useState(0);

  // Function to toggle language between English and French
  const toggleLanguage = () => {
    if (currentLanguage === 'en') {
      switchLanguage('fr');
    } else {
      switchLanguage('en');
    }
  };

  // Function to switch language
  const switchLanguage = (language) => {
    if (messagesI18n[language]) {
      setCurrentLanguage(language);
      setCurrentMessages(language === 'fr' ? messagesFr : messagesEn);

      // Update page content based on the selected language
      document.getElementById('page-title').innerText = messagesI18n[language].pageTitle;
      document.getElementById('unique-message').innerText = messagesI18n[language].uniqueMessage;
      document.getElementById('description').innerText = messagesI18n[language].description;
      document.getElementById('register-btn').innerText = messagesI18n[language].registerBtn;
      document.getElementById('login-btn').innerText = messagesI18n[language].loginBtn;
    }
  };

  // Change dynamic message function to cycle through the dynamic messages
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicMessage(currentMessages[index]);
      setIndex((prevIndex) => (prevIndex + 1) % currentMessages.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentMessages, index]);

  return (
    <div className="container">
      <h1 id="page-title">Welcome to the Job Board</h1>

      {/* Dynamic Message Section */}
      <div className="dynamic-message">
        <p id="unique-message">{dynamicMessage}</p>
      </div>

      {/* Static Text Section */}
      <p id="description">Find your dream job or post your job opening today!</p>

      <div className="buttons">
        <a href="/register" className="btn" id="register-btn">
          Register
        </a>
        <a href="/login" className="btn" id="login-btn">
          Login
        </a>
      </div>

      {/* Language Switcher Button */}
      <div className="language-switcher">
        <button className="btn" id="language-btn" onClick={toggleLanguage}>
          Switch to {currentLanguage === 'en' ? 'French' : 'English'}
        </button>
      </div>
    </div>
  );
};

export default JobBoard;
