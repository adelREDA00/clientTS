// @ts-nocheck
import React, { FC, useRef, useState } from "react";
import Avatar from "components/Avatar/Avatar";
import NcDropDown from "components/NcDropDown/NcDropDown";
import CommentCardLikeReplyContainer from "containers/CommentCardLikeReplyContainer/CommentCardLikeReplyContainer";
import { PostAuthorType } from "data/types";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";
import SingleCommentForm from "containers/PageSingle/SingleCommentForm";
import ModalEditComment from "./ModalEditComment";
import ModalDeleteComment from "./ModalDeleteComment";
import ModalReportItem from "components/ModalReportItem/ModalReportItem";
import axios from 'axios';

import { useContext } from "react";
import { AuthContext } from "../../context/auth";



export interface CommentType {
  id: number;
  author: PostAuthorType;
  date: string;
  content: string;
  parentId: number | null;
  children?: CommentType[];
  like: {
    count: number;
    isLiked: boolean;
  };
}

export interface CommentCardProps {
  className?: string;
  comment: CommentType;
  size?: "large" | "normal";
}

const CommentCard: FC<CommentCardProps> = ({
  className = "",
  comment,
  userId,
  handleDeleteComment,
  handleEditComment,
  size = "large",
}) => {

  if (!comment) {
    return <div>No comment</div>;
  }
  const { user, _id, createdAt, content,post } = comment;


  
  const actions = [
    { id: "edit", name: "Edit", icon: "las la-edit" },
    { id: "delete", name: "Delete", icon: "las la-trash-alt" },
  ];

  const textareaRef = useRef(null);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { token } = useContext(AuthContext);

  const openReplyForm = () => {
    setIsReplying(true);
    setTimeout(() => {
      textareaRef.current && (textareaRef.current as any).focus();
    }, 100);
  };
  const closeReplyForm = () => {
    setIsReplying(false);
  };

  const openModalEditComment = () => setIsEditting(true);
  const closeModalEditComment = () => setIsEditting(false);

  const openModalReportComment = () => setIsReporting(true);
  const closeModalReportComment = () => setIsReporting(false);

  const openModalDeleteComment = () => setIsDeleting(true);
  const closeModalDeleteComment = () => setIsDeleting(false);

  const hanldeClickDropDown = (item: typeof actions[number]) => {
    if (item.id === "reply") {
      return openReplyForm();
    }
    if (item.id === "edit") {
      return openModalEditComment();
    }
    if (item.id === "report") {
      return openModalReportComment();
    }
    if (item.id === "delete") {
      return openModalDeleteComment();
    }
    return;
  };

  const renderCommentForm = () => {
    return (
      <SingleCommentForm
        textareaRef={textareaRef}
        onClickSubmit={(id) => {
          console.log(id);
        }}
        onClickCancel={closeReplyForm}
        className="flex-grow"
        commentId={id}
      />
    );
  };
 
  const handleDelete = async (e) => {
    e.preventDefault();


    const key = token; // Replace with your actual authentication token
    const config = {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    };
    
    try {

      const res = await axios.delete("/api/comments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { 
          userId: userId,
          postId: post,
          commentId:_id,
        }, // Pass the array of selected IDs in the request body
      });

      setIsDeleting(false)
      console.log('Comment deleted successfully!', res);
      handleDeleteComment(_id); // Pass the comment ID to the callback
      // Handle any further actions or UI updates after successful deletion
    } catch (error) {
      console.error('Failed to delete comment:', error);
      // Handle any error cases or display error messages
    }
  };

  
 
  

  

  return (
    <>
      <div
        className={`nc-CommentCard flex ${className}`}
        data-nc-id="CommentCard"
        data-comment-id={_id}
     
      >
        {  user?.username && (
    <Avatar
    imgUrl={"/assets/def1.jpg"}
    userName=   {user.username}
    sizeClass={`h-6 w-6 text-base ${
      size === "large" ? "sm:text-lg sm:h-8 sm:w-8" : ""
    }`}
  
    containerClassName="mt-4"
  />
        )

        }
      
        
    
        <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
          {/* AUTHOR INFOR */}
          <div className="relative flex items-center pr-6">
          {user?._id === userId && (
     <div className="absolute -right-3 -top-3">
     <NcDropDown
       className={`p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 ${twFocusClass()}`}
       data={actions}
       onClick={hanldeClickDropDown}
     />
   </div>
)}
        
            { user?.username && (
    <Link
    className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
    to={""}
  >
    {user.username}
  </Link>
            )
            }


{ comment && createdAt && (
   <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm pl-2">
   {createdAt.substring(0, 10)}
 </span>
 
            )
            }
            
            
      
          </div>

          {/* CONTENT */}


          { comment && content && (
      <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
      {content}
    </span>
            )
            }
         

          {/* ACTION LIKE REPLY */}
        
        </div>
      </div>

      {comment && content && user?._id === userId && (
  <ModalEditComment
    show={isEditting}
    handleEditComment={handleEditComment}
    commentId={_id}
    content={content}
    comment={comment}
    onCloseModalEditComment={closeModalEditComment}
  />
)}

{comment && user?._id === userId && (
  <ModalDeleteComment
    show={isDeleting}
    handleDelete={handleDelete}
    commentId={comment._id}
    onCloseModalDeleteComment={closeModalDeleteComment}
  />
)}
   
    </>
  );
};

export default CommentCard;