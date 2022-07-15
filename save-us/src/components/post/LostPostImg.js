import React, { useState } from 'react';

function PostImg() {
  const [fileImage, setFileImage] = useState('');

  const saveFileImage = (event) => {
    setFileImage(URL.createObjectURL(event.target.files[0]));
  };

  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage('');
  };

  return (
    <>
      <div
        style={{ backgroundColor: '#efefef', width: '150px', height: '150px' }}
      >
        {fileImage && (
          <img alt="animal" src={fileImage} style={{ width: '100%' }} />
        )}
        {/* <div style={{ alignItems: 'center', justifyContent: 'center' }}></div> */}
      </div>
      <input type="file" name="imgFile" id="imgFile" onChange={saveFileImage} />
      <button type="button" onClick={deleteFileImage}>
        삭제
      </button>
    </>
  );
}

export default PostImg;
