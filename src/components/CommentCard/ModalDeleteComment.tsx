// @ts-nocheck
import React, { FC, useEffect, useRef } from "react";
import NcModal from "components/NcModal/NcModal";
import { CommentType } from "./CommentCard";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";

export interface ModalDeleteCommentProps {
  commentId: CommentType["id"];
  show: boolean;
  onCloseModalDeleteComment: () => void;
}

const ModalDeleteComment: FC<ModalDeleteCommentProps> = ({
  commentId,
  show,
  handleDelete,
  onCloseModalDeleteComment,
}) => {
  const textareaRef = useRef(null);

  const handleClickSubmitForm = () => {
    console.log({ commentId });
  };

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
        }
      }, 400);
    }
  }, [show]);

  const renderContent = () => {
    return (
      <form >
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
        Supprimer le commentaire
        </h3>
        <span className="text-sm">
        Êtes-vous sûr de vouloir supprimer ce commentaire ? 
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={handleDelete} >
          Supprimer 
          </ButtonPrimary>
          <ButtonSecondary onClick={onCloseModalDeleteComment} type="button" >
          Annuler 
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalDeleteComment}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalDeleteComment;
