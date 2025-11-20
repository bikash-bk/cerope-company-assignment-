import React, { useEffect, useState } from 'react';
import { getMe, updateProfile } from '../api/auth';
import AvatarPicker from '../components/AvatarPicker';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null); 
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const u = await getMe();
        setUser(u);
        setForm({
          firstName: u.firstName || '',
          lastName: u.lastName || '',
          email: u.email || '',
          phone: u.phone || '',
          gender: u.gender || '',
          dob: u.dob ? new Date(u.dob).toISOString().slice(0,10) : '',
          avatar: u.avatar || ''
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const updateField = (key, val) => {
    setForm(prev => {
      const next = { ...prev, [key]: val };
      setIsDirty(true);
      return next;
    });
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedFile(reader.result);
      setIsDirty(true);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        gender: form.gender,
        dob: form.dob,
        avatar: uploadedFile || form.avatar || ''
      };
      const updated = await updateProfile(payload);
      setUser(updated);
      setForm({
        firstName: updated.firstName || '',
        lastName: updated.lastName || '',
        email: updated.email || '',
        phone: updated.phone || '',
        gender: updated.gender || '',
        dob: updated.dob ? new Date(updated.dob).toISOString().slice(0,10) : '',
        avatar: updated.avatar || ''
      });
      setUploadedFile(null);
      setEditing(false);
      setIsDirty(false);
      alert('Profile saved.');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (!user) return;
    setForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      gender: user.gender || '',
      dob: user.dob ? new Date(user.dob).toISOString().slice(0,10) : '',
      avatar: user.avatar || ''
    });
    setUploadedFile(null);
    setEditing(false);
    setIsDirty(false);
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const avatarSrc = uploadedFile
    ? uploadedFile
    : (form.avatar && (form.avatar.startsWith('http') || form.avatar.startsWith('data:')))
      ? form.avatar
      : (form.avatar ? `/avatars/${form.avatar}` : '/avatars/default.png');

  return (
    <div className="min-h-screen p-6 md:p-12 mt-[50px]" style={{ background: 'linear-gradient(180deg,#F9F1FF 0%, #FEFCFA 100%)' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="md:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold">Personal Details</h1>
              <p className="text-sm text-gray-500">Manage your profile information</p>
            </div>

            <div className="flex items-center gap-3">
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 rounded-full bg-black text-white text-sm shadow"
                >
                  Edit
                </button>
              )}

              {editing && (
                <>
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="px-4 py-2 rounded-full border border-gray-300 text-sm bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!isDirty || saving}
                    className={`px-4 py-2 rounded-full text-sm text-white ${(!isDirty || saving) ? 'bg-gray-400' : 'bg-black'} shadow`}
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm text-gray-700">First Name</label>
              <input
                value={form.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                disabled={!editing}
                className="mt-2 w-full rounded-xl px-4 py-3 border border-gray-300 bg-white/60 shadow-inner outline-none focus:ring-2 focus:ring-black/30 text-sm"
                placeholder="First name"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Last Name</label>
              <input
                value={form.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                disabled={!editing}
                className="mt-2 w-full rounded-xl px-4 py-3 border border-gray-300 bg-white/60 shadow-inner outline-none focus:ring-2 focus:ring-black/30 text-sm"
                placeholder="Last name"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Email ID</label>
              <input
                value={form.email}
                disabled
                className="mt-2 w-full rounded-xl px-4 py-3 border border-gray-200 bg-gray-50 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                disabled={!editing}
                className="mt-2 w-full rounded-xl px-4 py-3 border border-gray-300 bg-white/60 shadow-inner outline-none focus:ring-2 focus:ring-black/30 text-sm"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Gender</label>
              <div className="mt-2 flex items-center gap-4">
                <label className={`flex items-center gap-2 px-3 py-2 rounded-lg ${form.gender === 'male' ? 'bg-black/5' : ''}`}>
                  <input
                    type="radio"
                    name="gender"
                    checked={form.gender === 'male'}
                    onChange={() => updateField('gender', 'male')}
                    disabled={!editing}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Male</span>
                </label>

                <label className={`flex items-center gap-2 px-3 py-2 rounded-lg ${form.gender === 'female' ? 'bg-black/5' : ''}`}>
                  <input
                    type="radio"
                    name="gender"
                    checked={form.gender === 'female'}
                    onChange={() => updateField('gender', 'female')}
                    disabled={!editing}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Female</span>
                </label>

                <label className={`flex items-center gap-2 px-3 py-2 rounded-lg ${form.gender === 'other' ? 'bg-black/5' : ''}`}>
                  <input
                    type="radio"
                    name="gender"
                    checked={form.gender === 'other'}
                    onChange={() => updateField('gender', 'other')}
                    disabled={!editing}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Other</span>
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-700">Date of Birth</label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => updateField('dob', e.target.value)}
                disabled={!editing}
                className="mt-2 w-full rounded-xl px-4 py-3 border border-gray-300 bg-white/60 shadow-inner outline-none focus:ring-2 focus:ring-black/30 text-sm"
              />
            </div>

            <div></div>

            <div className="col-span-1 md:col-span-2 flex items-center justify-between mt-4">
              <div className="flex items-center gap-6">
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-yellow-50 shadow-sm bg-white">
                  <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                </div>

                <div className="flex flex-col gap-2">
                  {editing ? (
                    <>
                      <label className="text-sm text-gray-700">Change profile picture</label>
                      <div className="flex items-center gap-3">
                        <label className="px-3 py-2 bg-white border rounded-lg text-sm cursor-pointer shadow-sm">
                          Upload
                          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                        </label>

                        <div className="text-sm text-gray-500">or</div>

                        <div>
                          <AvatarPicker value={form.avatar} onChange={(v) => { updateField('avatar', v); }} />
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">PNG/JPG. Max 2MB recommended.</p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-600">Your profile picture is shown here. Click Edit to change it.</p>
                  )}
                </div>
              </div>

              <div className=" rounded-xl p-4 text-sm text-gray-700 shadow-sm w-44 text-center">
                <div className="font-semibold">Cerope Member</div>
                <div className="text-xs text-gray-500 mt-1">Joined {new Date(user.createdAt).toLocaleDateString()}</div>
                <div className="mt-3">
                  <button
                    onClick={() => alert('This could open subscription or settings')}
                    className="px-3 py-1 rounded-full bg-black text-white text-xs"
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="hidden md:flex md:flex-col items-center justify-start mt-12">
          <div className="w-[300px] ml-48 h-[400px] bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-md ">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mt-16 rounded-full overflow-hidden border-4 border-yellow-50 mb-3">
                <img src={avatarSrc} alt="avatar small" className="w-full h-full object-cover  " />
              </div>
              <div className="text-lg font-semibold">{user.name || form.firstName + ' ' + form.lastName}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>

            
          </div>

          
        </aside>
      </div>
    </div>
  );
}
