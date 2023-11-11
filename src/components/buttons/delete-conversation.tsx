import React, { useState, FC } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import useToast from '../../providers/toast';
import apiClient from '../../api-client';

interface Props extends Omit<ButtonProps, 'onClick'> {
  id: string;
  onSuccess(): void;
}

const DeleteConversationButton: FC<Props> = function DeleteConversationButton({
  children,
  id,
  onSuccess,
  ...props
}) {
  const toast = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleClick() {
    setIsDeleting(true);
    await apiClient.delete(`/conversations/${id}`)
      .then(() => {
        onSuccess();
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Unable to delete conversation.');
      })
      .finally(() => {
        setIsDeleting(false);
      });
  }

  return (
    <Button
      type="button"
      variant="danger"
      size="sm"
      {...props}
      disabled={isDeleting}
      onClick={handleClick}
    >
      {children || <FaTrash />}
    </Button>
  );
};

export default DeleteConversationButton;
