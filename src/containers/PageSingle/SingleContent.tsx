// @ts-nocheck
import React, { FC, useEffect, useRef,useState } from "react";
import Tag from "components/Tag/Tag";
import { SinglePageType } from "./PageSingle";
import SingleAuthor from "./SingleAuthor";
import SingleCommentForm from "./SingleCommentForm";
import SingleCommentLists from "./SingleCommentLists";
import SingleContentDemo from "./SingleContentDemo";
import { useLocation } from "react-router";
import parse from 'html-react-parser';



export interface SingleContentProps {
  data: SinglePageType;
}

const SingleContent: FC<SingleContentProps> = ({  dataContent }) => {

  const commentsRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
  const [postComments, setPostComments] = useState([]);
  const [postId, setPostId] = useState<CommentType[]>(null);


  useEffect(() => {
    if (!dataContent) {
      return;
    }

    setPostComments(dataContent.comments);
    setPostId(dataContent._id)
  }, [dataContent]);



  

  
  useEffect(() => {
    // SCROLL TO COMMENTS SECTION
    const commentsSection = document.getElementById("comments");
    if (location.hash === "#comments" && commentsSection) {
      commentsSection.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const handleAddComment = (newComment: CommentType) => {
    setPostComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = postComments.filter(
      (comment) => comment._id !== commentId
    );
    setPostComments(updatedComments);
  };
  
  const handleEditComment = (commentId, newContent) => {
    // Find the index of the comment to be updated
    const commentIndex = postComments.findIndex((comment) => comment._id === commentId);
  
    if (commentIndex === -1) {
      // Comment not found, handle the error or return
      return;
    }
  
    // Create a new array with the updated comment
    const updatedComments = [
      ...postComments.slice(0, commentIndex), // Elements before the updated comment
      {
        ...postComments[commentIndex], // Copy the existing comment object
        content: newContent, // Update the content property
      },
      ...postComments.slice(commentIndex + 1), // Elements after the updated comment
    ];
  
    // Update the state with the new array of comments
    setPostComments(updatedComments);
  };
  
  return (
    <div className="nc-SingleContent space-y-10">
      {/* ENTRY CONTENT */}
      <div
  id="single-entry-content"
  className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-invert"
  style={{ maxWidth: "100%", wordWrap: "break-word" }}
>
        {/* THIS IS THE DEMP CONTENT */}
        {/* IF YOUR DATA IS JSON, YOU CAN USE render with html-react-parser (https://www.npmjs.com/package/html-react-parser) */}
      
        {parse(`${dataContent.content}`)}

      </div>

      {/* TAGS 
      <div className="max-w-screen-md mx-auto flex flex-wrap">
        {tags.map((item) => (
          <Tag hideCount key={item.id} tag={item} className="mr-2 mb-2" />
        ))}
      </div>*/}

      {/*  <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
      <div className="max-w-screen-md mx-auto ">
        <SingleAuthor author={author} />
      </div> */}
     

      {/* COMMENT FORM */}
      <div
       id="comments" 
       ref={commentsRef}
        className="max-w-screen-md mx-auto pt-5"
      >
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
          Comments
        </h3>
        <SingleCommentForm
           onClickSubmit={handleAddComment}
           onClickCancel={() => {}}
          postId={dataContent._id}
        />
      </div>

     <div className="max-w-screen-md mx-auto">
        <SingleCommentLists handleEditComment={handleEditComment} handleDeleteComment={handleDeleteComment} postComment={postComments}  />
      </div> 

      
    </div>
  );
};

export default SingleContent;
