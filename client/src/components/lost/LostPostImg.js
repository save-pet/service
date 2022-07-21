import React, { useState } from 'react';
import PropTypes from 'prop-types';

function PostImg({ setImage }) {
  const [fileImage, setFileImage] = useState('');

  const saveFileImage = (event) => {
    setFileImage(URL.createObjectURL(event.target.files[0]));
    const uploadFile = event.target.files[0];
    console.log(uploadFile);
    setImage(uploadFile);
  };

  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage('');
  };

  return (
    <div className="flex items-center space-x-6">
      <div className="items-center">
        <div className="shrink-5 w-40 h-40 bg-slate-200">
          {fileImage && (
            <img
              alt="animal"
              src={fileImage}
              // style={{ width: '100%' }}
              className="object-cover"
            />
          )}
          {/* <div style={{ alignItems: 'center', justifyContent: 'center' }}></div> */}
        </div>
        <label htmlFor="imgFile" className="block">
          <input
            type="file"
            name="imgFile"
            id="imgFile"
            onChange={saveFileImage}
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-[#ffffff] file:text-[#ffa000]
            hover:file:bg-[#ffd149]
          "
          />
          <div>
            <button
              type="button"
              onClick={deleteFileImage}
              className="btn-light"
            >
              삭제
            </button>
          </div>
        </label>
      </div>
    </div>
  );
}
PostImg.propTypes = {
  setImage: PropTypes.string.isRequired,
};
export default PostImg;
