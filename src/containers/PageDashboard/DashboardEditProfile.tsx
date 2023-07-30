// @ts-nocheck
import React, { useState ,useContext,useEffect} from "react";
import axios from "axios";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import { AuthContext } from "../../context/auth";
import TransitionAlerts from "components/TransitionAlerts";
import { useHistory } from 'react-router-dom';


const DashboardEditProfile = () => {
  let history = useHistory();
 
  //alert card
   const [openE, setOpenE] = useState(false);
   const handleCloseE = () => {
     setOpenE(!openE)
   };
   const handlePushToLogin = ()=>{
    dispatch({ type: "LOGOUT" });
    localStorage.setItem("token", null);
    localStorage.setItem("Id", null);
    history.push('/login')

} 
  const { token, user,dispatch } = useContext(AuthContext);

  const [firstName, setFirstName] = useState(user && user.username ? user.username : "");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(user && user.email ? user.email : "");

  const [passwordError, setPasswordError] = useState('');

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

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword)
    validatePassword(newPassword);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const key = token;
    const config = {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    };

    try {
      const res = await axios.put(`/api/users/${user._id} `, {
        username: firstName,
        email:email,
        password: newPassword,
      },config);

      console.log(res.data);
      setOpenE(true) // Handle the response as needed

    } catch (err) {
      console.error(err); // Handle the error as needed
    }
  };


  

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
       <TransitionAlerts text={"Votre compte a été mis à jour avec succès"} desc={"Maintenant, vous devez vous déconnecter et vous reconnecter pour que les modifications prennent effet"} btn={"Déconnexion"} openE={openE} handleCloseE={handleCloseE} handlePushToLogin={handlePushToLogin}  username={firstName} />
      <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <label className="block">
          <Label>Nom d'utilisateur</Label>
          <Input
            placeholder="Example Doe"
            type="text"
            className="mt-1"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
 
        <label className="block">
          <Label>Mot de passe</Label>
          <Input
            type="password"
            placeholder="***********"
            className="mt-1"
            value={newPassword}
            onChange={handlePasswordChange}
          />
           {passwordError && <div className="error">{passwordError}</div>}
        </label>
       
        <label className="block md:col-span-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="example@example.com"
            className="mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <ButtonPrimary className="md:col-span-2" type="submit">
        Edit profile
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default DashboardEditProfile;
