// @ts-nocheck
import React, { FC,useState, } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import Textarea from "components/Textarea/Textarea";
import axios from 'axios';

import { useContext } from "react";
import { AuthContext } from "../../context/auth";

export interface SingleCommentFormProps {
  className?: string;
  commentId?: number;
  onClickSubmit: (id?: number) => void;
  onClickCancel: (id?: number) => void;
  textareaRef?: React.MutableRefObject<null>;
  defaultValue?: string;
  rows?: number;
}

const SingleCommentForm: FC<SingleCommentFormProps> = ({
  className = "mt-5",
  commentId,
  onClickSubmit,
  onClickCancel,
  textareaRef,
  rows = 4,
  postId
}) => {
  const { token,user } = useContext(AuthContext);


  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

      const key = token; // Replace with your actual authentication token
      const config = {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      };

      try {
            // Send a POST request to create a new comment
      const response = await axios.post(`https://apiblognode.onrender.com/api/comments/${postId}/comments`, {
        content,
        userId:user._id,
      },config);
      setContent('')
        console.log('comment successfully!',response);
       onClickSubmit(response.data.comment); //Invoke the onClickSubmit callback with the new comment
      } catch (err) {
        console.log(err);
      }
  
     
      

    
  };



  



  return (
    <form action="#" className={`nc-SingleCommentForm ${className}`}>
      <Textarea
        placeholder="Ajouter à la discussion"
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required={true}
        rows={rows}
      />
      <div className="mt-2 space-x-3">
        <ButtonPrimary onClick={handleSubmit} type="submit">
        Soumettre
        </ButtonPrimary>
        <ButtonSecondary type="button" >
        Annuler
        </ButtonSecondary>
      </div>
    </form>
  );
};

export default SingleCommentForm;
