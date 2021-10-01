import React, { useState } from "react";

import styles from "../../styles/imageUpload.module.css";

const ImageUpload = ({ title, callBack }) => {
  const [finallyImg, setFinalyImg] = useState();

  const uploadImg = (file) => {
    const data = new FormData();
    data.append("file", file);

    fetch("/uploadImage", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((img) => {
        console.log(img);
        setFinalyImg(img);
        callBack(img.secure_url);
      });
  };

  return (
    <div className="column centered">
      <h3>{title}</h3>
      <input type="file" onChange={(e) => uploadImg(e.target.files[0])} />
    </div>
  );
};

export default ImageUpload;
