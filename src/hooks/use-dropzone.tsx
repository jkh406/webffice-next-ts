import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { TextField } from '@mui/material';

function MyTextField(props : any) {

  const onDrop = useCallback((acceptedFiles : any) => {
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <TextField
        {...props}
        variant="outlined"
        placeholder="이미지를 드래그 앤 드롭하세요"
        fullWidth
        InputProps={{
          disableUnderline: true,
          style: { cursor: 'pointer' }
        }}
      />
    </div>
  );
}

export default MyTextField;