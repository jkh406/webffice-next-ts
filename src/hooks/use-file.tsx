import { useState } from "react";
import axios from "axios";

const useFileUploader = (uploadEndpoint : any) => {
  const [file, setFile]  : any = useState(null);

  const handleOnChange = (e : any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      throw new Error("No file selected");
    }

    const formData = new FormData();
    formData.append("myfile", file, file.name);

    try {
      const response = await axios.post(uploadEndpoint, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to upload file");
    }
  };

  return {
    file,
    handleOnChange,
    handleUpload,
  };
};

export default useFileUploader;