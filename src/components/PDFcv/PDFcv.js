import React, { useState } from "react";

import Axios from "axios";
import { authHeader } from '../../_helpers';

const ImageUpload = () => {
  const [fileData, setFileData] = useState();

  const [images, setFile] = useState("");

  const handleFileChange = ({ target }) => {
    setFileData(target.files[0]);
    setFile(target.value);
  };
  var isReqDone = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("image", fileData);

   Axios.post('http://localhost:4000/api/image', formdata, {
             headers: authHeader()
    })
    .then(response => { 
      if(response.status == 200){alert('user do not exist')}
    
    })
    .catch(error => {
        console.log(error.response)
    });

  }

  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        value={images}
        name="file"
        accept="image/*"
        onChange={handleFileChange}
        placeholder="upload image"
        isRequired={true}
      />
      <button>submit</button>
    </form>
  );
};

export default ImageUpload;
