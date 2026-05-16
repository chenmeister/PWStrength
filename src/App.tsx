import { ChangeEvent, useState } from 'react';

const STRENGTH_LABELS       = ['', 'Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_BAR_COLORS   = ['', 'bg-red-400', 'bg-orange-400', 'bg-amber-400', 'bg-lime-400', 'bg-emerald-400'];
const STRENGTH_TEXT_COLORS  = ['', 'text-red-500', 'text-orange-500', 'text-amber-500', 'text-lime-600', 'text-emerald-600'];

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="w-5 h-5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="w-5 h-5">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className="w-3 h-3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [isTwelveChar, setIsTwelveChar]         = useState(false);
  const [isOneLower, setIsOneLower]             = useState(false);
  const [isOneUpper, setIsOneUpper]             = useState(false);
  const [isOneDigit, setIsOneDigit]             = useState(false);
  const [isOneSpecialChar, setIsOneSpecialChar] = useState(false);

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const p = e.target.value;
    setIsTwelveChar(p.length >= 12);
    setIsOneLower(/[a-z]/.test(p));
    setIsOneUpper(/[A-Z]/.test(p));
    setIsOneDigit(/[0-9]/.test(p));
    setIsOneSpecialChar(/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/.test(p));
  };

  const requirements = [
    { met: isTwelveChar,     label: 'At least 12 characters' },
    { met: isOneLower,       label: 'At least 1 lowercase letter' },
    { met: isOneUpper,       label: 'At least 1 uppercase letter' },
    { met: isOneDigit,       label: 'At least 1 numerical number' },
    { met: isOneSpecialChar, label: 'At least 1 special character' },
  ];

  const metCount = requirements.filter(r => r.met).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-sky-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-100 border border-indigo-50 overflow-hidden">

          {/* Colorful top bar */}
          <div className="h-1.5 bg-gradient-to-r from-violet-400 via-indigo-400 to-sky-400" />

          <div className="p-8">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-indigo-200 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="w-8 h-8">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Password Strength</h1>
              <p className="text-gray-400 text-sm mt-1">See how secure your password really is</p>
            </div>

            {/* Input */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Enter your password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  aria-label="Enter a password:"
                  onChange={handlePassword}
                  placeholder="Type your password here…"
                  className="w-full text-gray-800 placeholder-gray-300 bg-gray-50 rounded-xl px-4 py-3 pr-12 border-2 border-gray-200 focus:bg-white focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all text-sm"
                />
                <button
                  id="togglePW"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-indigo-500 transition-colors p-1 rounded-lg hover:bg-indigo-50"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Strength meter */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Strength</span>
                {metCount > 0 && (
                  <span
                    data-testid="strength-label"
                    className={`text-xs font-bold uppercase tracking-wide ${STRENGTH_TEXT_COLORS[metCount]}`}
                  >
                    {STRENGTH_LABELS[metCount]}
                  </span>
                )}
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                      i < metCount ? STRENGTH_BAR_COLORS[metCount] : 'bg-gray-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-2xl border border-gray-100 p-5">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Password has:
              </h2>
              <ul id="requirements" className="space-y-3">
                {requirements.map(({ met, label }) => (
                  <li
                    key={label}
                    className={`flex items-center gap-3 text-sm font-medium transition-all duration-200 ${
                      met ? 'text-emerald-600' : 'text-gray-400'
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                        met
                          ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-200'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {met ? <CheckIcon /> : <span className="w-1.5 h-1.5 rounded-full bg-gray-400 block" />}
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
