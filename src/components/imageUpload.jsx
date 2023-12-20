import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseconfig';
import { v4 } from 'uuid';


const UpImage = ({ handleImage }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [status, setStatus] = useState(false);

  const uploadImage = async (e) => {
    setStatus(true)
    e.preventDefault();
    try {
      if (imageUpload === null) return;

      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload);

      let imageUrl = null;
      await getDownloadURL(imageRef).then((data) => {
        setStatus(false)
        imageUrl = data;
      });

      handleImage(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImageUpload(selectedImage);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} placeholder="upload" />
      {status &&
        <div class="spinner-border text-info fs-1" role="status">
        </div>
      }
      <button className="btn btn-secondary btn-lg btn-block text-info" onClick={uploadImage}>Upload Image</button>
    </div>
  );
};

export default UpImage;