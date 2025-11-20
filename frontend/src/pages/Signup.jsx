import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../utils/validation';
import { register as apiRegister } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch, setError } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onTouched'
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [serverError, setServerError] = React.useState('');
  const [pwdFocused, setPwdFocused] = React.useState(false); 

  const password = watch('password', '');
  const confirm = watch('confirmPassword', '');

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const res = await apiRegister({ name: data.name, email: data.email, password: data.password });
      localStorage.setItem('token', res.token);
      navigate('/signup-profile');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Registration failed';
      if (msg.toLowerCase().includes('already')) {
        setError('email', { type: 'server', message: msg });
      } else {
        setServerError(msg);
      }
    }
  };

  const checks = {
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    minLen: password.length >= 8
  };

  // show popover when user focuses password OR has typed anything
  const popoverVisible = pwdFocused || password.length > 0;

  return (
    <div
      className="min-h-screen w-full flex items-start justify-center pt-24 pb-12 px-6"
      style={{ background: 'linear-gradient(180deg,#F9F1FF 0%, #FEFCFA 100%)' }}
    >
      <div className="w-full max-w-6xl bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm p-8 md:p-12 flex flex-col md:flex-row items-start gap-8">

        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Set up Your Cerope Account</h1>
          <p className="text-gray-600 mb-6">Create your account to start your personalized fashion journey.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">

            <div>
              <input
                {...register('name')}
                placeholder="Name"
                className="w-full px-2 py-3 rounded-xl text-sm border border-gray-300 bg-white/60 shadow-inner outline-none focus:ring-2 focus:ring-black/40"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <input
                {...register('email')}
                placeholder="Email Address"
                className="w-full px-2 py-3 rounded-xl text-sm border border-gray-300 bg-white/60 shadow-inner outline-none focus:ring-2 focus:ring-black/40"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full px-2 py-3 rounded-xl text-sm border border-gray-300 bg-white/60 shadow-inner outline-none focus:ring-2 focus:ring-black/40"
                // onFocus={() => setPwdFocused(true)}
                // onBlur={() => {
                //   // hide on blur only if password is empty, otherwise keep showing (user typed)
                //   setPwdFocused(false);
                // }}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="absolute right-3 top-3 text-gray-600"
                aria-label="toggle password visibility"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>

              {popoverVisible && (
                <div
                  className="absolute left-0 top-full mt-3 z-50 w-80 bg-white rounded-lg shadow-lg p-4 text-sm"
                  role="status"
                >
                  <div className="font-medium mb-2">New Password must contain</div>

                  <div className="flex items-center gap-2">
                    <span className={checks.upper ? 'text-green-600' : 'text-red-500'}>
                      {checks.upper ? '✓' : '✗'}
                    </span>
                    <span className="text-gray-700">An Upper Case letter</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={checks.lower ? 'text-green-600' : 'text-red-500'}>
                      {checks.lower ? '✓' : '✗'}
                    </span>
                    <span className="text-gray-700">A lower case letter</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={checks.number ? 'text-green-600' : 'text-red-500'}>
                      {checks.number ? '✓' : '✗'}
                    </span>
                    <span className="text-gray-700">A number</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={checks.special ? 'text-green-600' : 'text-red-500'}>
                      {checks.special ? '✓' : '✗'}
                    </span>
                    <span className="text-gray-700">A special character</span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className={checks.minLen ? 'text-green-600' : 'text-red-500'}>
                      {checks.minLen ? '✓' : '✗'}
                    </span>
                    <span className="text-gray-700">At least 8 characters</span>
                  </div>
                </div>
              )}

              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="relative">
              <input
                {...register('confirmPassword')}
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="w-full px-2 py-3 rounded-xl text-sm border border-gray-300 bg-white/60 shadow-inner outline-none focus:ring-2 focus:ring-black/40"
                onFocus={() => {}}
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(s => !s)}
                className="absolute right-3 top-3 text-gray-600"
                aria-label="toggle confirm"
              >
                {showConfirm ? '🙈' : '👁️'}
              </button>

              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
              {confirm && confirm !== password && (
                <p className="text-red-500 text-sm mt-1">Passwords Don't Match.</p>
              )}
            </div>

            <div className="flex items-start gap-3">
              <label className="flex items-center gap-3">
                <input {...register('agree')} type="checkbox" className="w-4 h-4 rounded-sm" />
                <span className="text-gray-700">I agree to Cerope's Terms of Service &amp; Privacy Policy.</span>
              </label>
            </div>
            {errors.agree && <p className="text-red-500 text-sm mt-1">{errors.agree.message}</p>}

            {serverError && <p className="text-red-500 text-sm mt-1">{serverError}</p>}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2 rounded-full bg-black text-white text-lg font-medium shadow-md hover:opacity-95 transition"
              >
                Sign Up
              </button>
            </div>

            <div className="text-center text-sm text-gray-600 mt-4">
              Already a member? <Link to="/login" className="text-blue-600">Sign in</Link>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md">
            <img
              src="/avatars/profile.png"
              alt="hero"
              className="w-[400px] rounded-3xl shadow-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
