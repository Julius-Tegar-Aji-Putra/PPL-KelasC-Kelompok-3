import React, { useState } from 'react';

const PhotoUploadValidator = ({ onChange, label = "Upload Foto Diri", inputClass = "py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-md sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 2048 * 1024; // 2MB

      if (!allowedTypes.includes(selectedFile.type)) {
        setError('File harus JPEG, PNG, atau JPG');
        setFile(null);
        onChange(null);
        return;
      }
      if (selectedFile.size > maxSize) {
        setError('File maksimal 2MB');
        setFile(null);
        onChange(null);
        return;
      }
      setError('');
      setFile(selectedFile);
      onChange(selectedFile);
    }
  };

  return (
    <div className="max-w-sm">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <p className="text-xs text-gray-500 mb-2">Ukuran file maksimal 2MB</p>
      <input
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        onChange={handleFileChange}
        className={inputClass}
      />
      {file && !error && (
        <div className="mt-2 flex items-center gap-x-2">
          <svg className="shrink-0 size-4 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span className="text-sm text-green-500">File valid: {file.name}</span>
        </div>
      )}
      {error && (
        <div className="mt-2 flex items-center gap-x-2">
          <svg className="shrink-0 size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
          <span className="text-sm text-red-500">{error}</span>
        </div>
      )}
    </div>
  );
};

export default PhotoUploadValidator;