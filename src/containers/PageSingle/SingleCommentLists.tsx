// @ts-nocheck
import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import ButtonPrimary from "components/Button/ButtonPrimary";
import CommentCard, { CommentType } from "components/CommentCard/CommentCard";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

export interface SingleCommentListsProps {
  comments: CommentType[];
  postComment: CommentType[]; // Assuming postComment is an array of CommentType
}

const SingleCommentLists: FC<SingleCommentListsProps> = ({handleDeleteComment, postComment,handleEditComment }) => {
  const { user } = useContext(AuthContext);


 // Check if the user is logged in
 const isLoggedIn = user && user._id;




  // Check if the postComment prop is available or if comments are not fetched yet
  if (!postComment || postComment.length === 0) {
    return (
      <ul className="nc-SingleCommentLists space-y-5">
        <li>Aucun commentaire disponible</li>
        <ButtonPrimary className="dark:bg-primary-700 w-full">
        Voir tous les commentaires
        </ButtonPrimary>
      </ul>
    );
  }

  return (
    <ul className="nc-SingleCommentLists space-y-5">
      {postComment.length > 0 ? (
        postComment.map((comment) => (
          <li key={comment._id}>
            <CommentCard
              handleDeleteComment={handleDeleteComment}
              userId={isLoggedIn ? user._id : null}
              comment={comment}
              handleEditComment={handleEditComment}
            />
          </li>
        ))
      ) : (
        <li>Aucun commentaire disponible</li>
      )}

      <ButtonPrimary className="dark:bg-primary-700 w-full">
      Voir tous les commentaires
      </ButtonPrimary>
    </ul>
  );
};

export default SingleCommentLists;
