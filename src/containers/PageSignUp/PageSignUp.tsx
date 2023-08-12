// @ts-nocheck
import React, { useState, FC } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import TransitionAlerts from "../../components/TransitionAlerts"
import { log } from "console";


export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  let history = useHistory();

  //alert card
  const [openE, setOpenE] = useState(false);
  const handleCloseE = () => {
    setOpenE(!openE)
  };

  const handlePushToLogin = ()=>{
      history.push('/login')
  
  } 
  //handling error
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Une erreur s est produite. Vérifiez que vous n utilisez pas déjà une adresse e-mail ou un nom d utilisateur utilisé auparavant.');

  const [success, setSuccess] = useState(false);
  //user
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    validateEmail();
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };


  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  




  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password.length === 0) {
      setPasswordError('Mot de passe requis');
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        'Le mot de passe doit contenir au moins 8 caractères, dont une lettre majuscule et un chiffre.'
      );
    } else {
      setPasswordError('');
    }
  };



  const handleClick = async (e) => {
    e.preventDefault();



    try {
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      setError(false)
      setSuccess(true)
      setOpenE(!openE)
      
    } catch (err) {
      setError(true)
      setErrorMsg(err.request.response)
    }

    
    
  };
  return (
    <div className={`nc-PageSignUp ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="Welcome to our blog Football Community"
        headingEmoji="🎉"
        heading="Rejoignez DzFoot"
      >
        <TransitionAlerts text={"Votre compte a été ouvert avec succès."} btn={"Se connecter"}  desc={"Bienvenue sur notre Blog ! "} openE={openE} handleCloseE={handleCloseE} handlePushToLogin={handlePushToLogin}  username={username} />
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OU
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Nom d'utilisateur
              </span>
              <Input
                onChange={handleUsernameChange}
                value={username}
                type="text"
                placeholder="nom"
                className="mt-1"
              />
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input onChange={handleEmailChange}
                value={email}
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
              {emailError && <span className="error">{emailError}</span>}
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
              Mot de passe
              </span>
              <Input 
                value={password}
                onChange={handlePasswordChange}
                type="password"
                placeholder="***********"
                className="mt-1"
              />
              {passwordError && <div className="error">{passwordError}</div>}
            </label>
            <ButtonPrimary onClick={handleClick} type="submit">Register</ButtonPrimary>
          </form>

          
      {error && errorMsg && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span style={{ color: 'red' }}> {errorMsg} </span>
        </div>
      )}

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Déjà inscrit(e) ?  {` `}
            <NcLink to="/login">Connexion</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageSignUp;
