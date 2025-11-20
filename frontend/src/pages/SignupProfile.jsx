import React from 'react';
import { useForm } from 'react-hook-form';
import AvatarPicker from '../components/AvatarPicker';
import { updateProfile } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function SignupProfile() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { firstName: '', lastName: '', avatar: '', dob: '' }
  });

  const avatar = watch('avatar');
  const uploadedFile = watch('uploadedFile'); 
  const dob = watch('dob');

  React.useEffect(() => {
  }, []);

  

  const onSubmit = async (data) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: data.uploadedFile || data.avatar,
        dob: data.dob
      };
      await updateProfile(payload); 
      navigate('/profile');
    } catch (err) {
      alert(err?.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-start justify-center pt-24 pb-12 px-6"
      style={{ background: 'linear-gradient(180deg,#F9F1FF 0%, #FEFCFA 100%)' }}
    >
      <div className="w-full max-w-6xl bg-white/60 backdrop-blur-sm rounded-3xl shadow-sm p-6 md:p-10 flex flex-col md:flex-row gap-8">

        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Set up your Profile</h1>
          <p className="text-gray-600 mb-6">Tell us a bit about you — this helps personalize your experience.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <input
                {...register('firstName', { required: 'First name is required' })}
                placeholder="Enter first name"
                className="w-full px-5 py-3 rounded-xl text-sm border border-gray-300 bg-white/60 shadow-inner outline-none focus:ring-2 focus:ring-black/30"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                {...register('lastName')}
                placeholder="Enter last name"
                className="w-full px-5 py-3 rounded-xl text-sm border border-gray-300 bg-white/60 shadow-inner outline-none focus:ring-2 focus:ring-black/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>

              <div className="flex items-center gap-4">
                <div>
                  <AvatarPicker
                    value={avatar}
                    onChange={(v) => setValue('avatar', v, { shouldDirty: true })}
                  />
                </div>

                
              </div>

              
              
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
              <input
                {...register('dob')}
                type="date"
                className="w-full px-5 py-3 rounded-xl text-sm border border-gray-300 bg-white/60 shadow-inner outline-none focus:ring-2 focus:ring-black/30"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-black text-white text-lg font-medium shadow-md hover:opacity-95 transition"
              >
                Continue
              </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center">
        <img src="/avatars/profile_setup.png" alt=""  className='rounded-3xl w-[350px]'/>
         
        </div>
      </div>
    </div>
  );
}
