import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const CommentForm = ({ onSubmit } : any) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e : any) => {
    e.preventDefault();
    onSubmit(comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="댓글 작성"
        multiline
        minRows={3}
        maxRows={10}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>작성</Button>
    </form>
  );
};

export default CommentForm;