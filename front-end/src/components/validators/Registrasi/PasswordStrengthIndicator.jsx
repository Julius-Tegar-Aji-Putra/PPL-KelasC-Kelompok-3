import React, { useState, useEffect } from 'react';

const PasswordStrengthIndicator = ({ value, onChange, placeholder = "********", inputClass = "py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-md sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" }) => {
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState('Empty');
  const [rules, setRules] = useState({
    minLength: false,
    lowercase: false,
    uppercase: false,
    numbers: false,
    specialChars: false,
  });
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const checkStrength = (password) => {
    const newRules = {
      minLength: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      specialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setRules(newRules);
    const score = Object.values(newRules).filter(Boolean).length;
    setStrength(score);
    const levels = ['Empty', 'Weak', 'Medium', 'Strong', 'Very Strong', 'Super Strong'];
    setLevel(levels[score] || 'Empty');
  };

  useEffect(() => {
    checkStrength(value);
  }, [value]);

  const getBarClasses = (index) => {
    if (index < strength) return 'bg-gray-500 opacity-100';
    return 'bg-gray-200 opacity-50';
  };

  return (
    <div className="max-w-sm">
      <div className="flex items-center mb-2 relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${inputClass} pr-12 flex-1`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 flex items-center justify-center text-gray-400 hover:text-gray-600 z-10"
        >
          {showPassword ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
      {isFocused && (
        <div className="flex mt-2 -mx-1">
          {[0, 1, 2, 3, 4].map((index) => (
            <div key={index} className={`h-2 flex-auto rounded-full mx-1 ${getBarClasses(index)}`}></div>
          ))}
        </div>
      )}

      {isFocused && (
        <div className="mb-3">
          <div>
            <span className="text-sm text-gray-800">Level:</span>
            <span className="text-sm font-semibold text-gray-800 ml-1">{level}</span>
          </div>

          <h4 className="my-2 text-sm font-semibold text-gray-800">
            Your password must contain:
          </h4>

          <ul className="space-y-1 text-sm text-gray-500">
            <li className={`flex items-center gap-x-2 ${rules.minLength ? 'text-green-500' : 'text-red-500'}`}>
              {rules.minLength ? (
                <svg className="shrink-0 size-4 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg className="shrink-0 size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              )}
              Minimum number of characters is 8.
            </li>
            <li className={`flex items-center gap-x-2 ${rules.lowercase ? 'text-green-500' : 'text-red-500'}`}>
              {rules.lowercase ? (
                <svg className="shrink-0 size-4 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg className="shrink-0 size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              )}
              Should contain lowercase.
            </li>
            <li className={`flex items-center gap-x-2 ${rules.uppercase ? 'text-green-500' : 'text-red-500'}`}>
              {rules.uppercase ? (
                <svg className="shrink-0 size-4 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg className="shrink-0 size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              )}
              Should contain uppercase.
            </li>
            <li className={`flex items-center gap-x-2 ${rules.numbers ? 'text-green-500' : 'text-red-500'}`}>
              {rules.numbers ? (
                <svg className="shrink-0 size-4 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg className="shrink-0 size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              )}
              Should contain numbers.
            </li>
            <li className={`flex items-center gap-x-2 ${rules.specialChars ? 'text-green-500' : 'text-red-500'}`}>
              {rules.specialChars ? (
                <svg className="shrink-0 size-4 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg className="shrink-0 size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              )}
              Should contain special characters.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;