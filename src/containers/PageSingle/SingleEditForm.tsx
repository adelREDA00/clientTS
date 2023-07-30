// @ts-nocheck
import React, { FC,useState, } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import Textarea from "components/Textarea/Textarea";
import axios from 'axios';

import { useContext } from "react";
import { AuthContext } from "../../context/auth";

export interface SingleEditFormProps {
  className?: string;
  commentId?: number;
  onClickSubmit: (id?: number) => void;
  onClickCancel: (id?: number) => void;
  textareaRef?: React.MutableRefObject<null>;
  defaultValue?: string;
  rows?: number;
}

const SingleEditForm: FC<SingleEditFormProps> = ({
  className = "mt-5",
  onClickSubmit,
  onClickCancel,
  textareaRef,
  defaultValue ,
  rows = 4,
  handleEditComment,
  post,
  commentId
}) => {
  const { token,user } = useContext(AuthContext);


  const [content, setContent] = useState(defaultValue);
  const handleUpdate = async (e) => {
    e.preventDefault();

    
    try {

      const res = await axios.put("/api/comments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { 
          content:content,
          userId: user._id,
          postId: post,
          commentId:commentId,
        }, // Pass the array of selected IDs in the request body
      });
      
      console.log('Comment updated successfully!', res);
      onClickCancel()
      handleEditComment(commentId,content)
    } catch (error) {
      console.error('Failed to update comment:', error);
      // Handle any error cases or display error messages
    }
  };
  



  



  return (
    <form action="#" className={`nc-SingleCommentForm ${className}`}>
      <Textarea
        placeholder="Add to discussion"
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required={true}
        rows={rows}
      />
      <div className="mt-2 space-x-3">
        <ButtonPrimary onClick={handleUpdate} type="submit">
        Soumettre        </ButtonPrimary>
        <ButtonSecondary onClick={onClickCancel} type="button" >
        Annuler
        </ButtonSecondary>
      </div>
    </form>
  );
};

export default SingleEditForm;
