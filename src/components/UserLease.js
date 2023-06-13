import React, { useState } from 'react';
import axios from 'axios';

const UserLease = () => {
  const [leaseFile, setLeaseFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setLeaseFile(file);
  };

  const handleUpload = async () => {
    if (!leaseFile) return;

    try {
      const formData = new FormData();
      formData.append('lease', leaseFile);

      await axios.post('/api/upload-lease', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadSuccess(true);
    } catch (error) {
      console.error('Error uploading lease:', error);
      setUploadSuccess(false);
    }
  };

  return (
    <div>
      <h2>Lease</h2>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Lease</button>
      </div>
      {uploadSuccess && <p>Lease uploaded successfully!</p>}
    </div>
  );
};

export default UserLease;
