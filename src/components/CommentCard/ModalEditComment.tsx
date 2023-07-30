// @ts-nocheck
import React, { FC, useEffect, useRef } from "react";
import NcModal from "components/NcModal/NcModal";
import SingleEditForm from "containers/PageSingle/SingleEditForm";
import { CommentType } from "./CommentCard";

export interface ModalEditCommentProps {
  comment: CommentType;
  show: boolean;
  onCloseModalEditComment: () => void;
}

const ModalEditComment: FC<ModalEditCommentProps> = ({
  comment,
  show,
  handleEditComment,
  onCloseModalEditComment,
}) => {
  const textareaRef = useRef(null);
 
  
  const { content, _id,post } = comment || {};

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          element.focus();
          element.setSelectionRange(
            element.value.length,
            element.value.length
          );
        }
      }, 400);
    }
  }, [show]);

  const renderContent = () => {
    return (
      <SingleEditForm
        className="mt-0"
        onClickCancel={onCloseModalEditComment}
        onClickSubmit={() => console.log(textareaRef.current?.value)}
        defaultValue={content}
        commentId={_id}
        handleEditComment={handleEditComment}
        post={post}
        textareaRef={textareaRef}
        rows={8}
      />
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalEditComment}
      contentExtraClass="max-w-screen-md"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle="Editing comment"
    />
  );
};

export default ModalEditComment;
