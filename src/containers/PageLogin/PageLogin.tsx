// @ts-nocheck
import LayoutPage from "components/LayoutPage/LayoutPage";
import React, { useContext,FC,useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import axios from 'axios';
import { AuthContext } from "../../context/auth.jsx";
import { useHistory  } from 'react-router-dom';



export interface PageLoginProps {
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

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  let history = useHistory ();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const { loading, error, user , dispatch} = useContext(AuthContext);



  
 



  
  

  const HandleUserinput = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setUsername(e.target.value)
  }

   const HandlePwinput = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value)
  }


  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("https://api-blog-ten.vercel.app/api/auth/connexion", {
        username,
        password,
      }, {
        headers: {
          Authorization: localStorage.getItem("token") // Send the token in the request headers
        }
      });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        dispatch({ type: "SET_TOKEN", payload: res.data.token });
        localStorage.setItem("token", res.data.token);
        if (res.data.countries.length === 0 && res.data.clubs.length === 0 && res.data.leagues.length === 0) {
          // First login, redirect to PickFav page
          history.push('/PickFav');
        } else {
          // Not the first login, redirect to home
          history.push('/');
        }
      
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: { message: "Nom d'utilisateur ou mot de passe incorrect" } });
    }
  };


  console.log(error);
  
  





  

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="Welcome to our blog Football Community"
        headingEmoji="🔑"
        heading="Connectez-vous "
      >
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
              nom d'utilisateur
              </span>
              <Input
                type="text"
                placeholder="nom d'utilisateur"
                className="mt-1"
                value={username}
                onChange={HandleUserinput }
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              mot de passe
                <NcLink to="/forgot-pass" className="text-sm">
                Mot de passe oublié ?
                </NcLink>
              </span>
              <Input  placeholder="***********" type="password" className="mt-1" value={password}
                onChange={HandlePwinput } />
            </label>
            <ButtonPrimary onClick={handleClick} >Connexion</ButtonPrimary>
          </form>

          
      {error && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <span style={{ color: "red" }}>{error.message}</span>
        </div>
      )}

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
          Vous n'avez pas de compte? {` `}
            <NcLink to="/signup">Créer un compte</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageLogin;
