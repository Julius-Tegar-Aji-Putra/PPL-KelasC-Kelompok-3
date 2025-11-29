import React from 'react';

const EmailValidator = ({ value, onChange, placeholder = "email@contoh.com", inputClass = "py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-md sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" }) => {
  const isValid = value && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) && value.length <= 255;

  return (
    <div className="max-w-sm">
      <input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
        placeholder={placeholder}
      />
      {value && (
        <div className="mt-2 flex items-center gap-x-2">
          {isValid ? (
            <>
              <svg className="shrink-0 size-4 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span className="text-sm text-green-500">Email valid</span>
            </>
          ) : (
            <>
              <svg className="shrink-0 size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
              <span className="text-sm text-red-500">Email tidak valid</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailValidator;