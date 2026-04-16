import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Home, Bell, Edit2, Check, X } from 'lucide-react';

const ConsultantProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Consultant profile data
  const [profile, setProfile] = useState({
    name: 'Dr. Ananya Sharma',
    specialization: 'Clinical Dietician',
    bio: 'Helping clients achieve balanced nutrition with personalized meal plans.',
    experience: '10+ years experience',
    sessionPrice: '₹ 800',
    availability: [
      { day: 'Monday', time: '5-9 PM' },
      { day: 'Wednesday', time: '6-8 PM' }
    ]
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const handleEditStart = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvailabilityChange = (index, field, value) => {
    const newAvailability = [...editedProfile.availability];
    newAvailability[index] = { ...newAvailability[index], [field]: value };
    setEditedProfile(prev => ({
      ...prev,
      availability: newAvailability
    }));
  };

  const handleAddAvailability = () => {
    setEditedProfile(prev => ({
      ...prev,
      availability: [...prev.availability, { day: 'Friday', time: '10-2 PM' }]
    }));
  };

  const handleRemoveAvailability = (index) => {
    setEditedProfile(prev => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index)
    }));
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-300 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pink-200 rounded-full opacity-10 blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 bg-white bg-opacity-60 backdrop-blur-md border-b border-white border-opacity-20 px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <h1 className="text-xl font-bold text-purple-900">AURA</h1>
            <p className="text-xs text-purple-600">AI Life Co-Pilot</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative w-10 h-10 rounded-full bg-white text-purple-600 flex items-center justify-center hover:bg-purple-50">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
        >
          {/* Profile Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-purple-300 overflow-hidden shadow-lg"
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VLyhejvSTqdcWBtgneguG3aylLGjSl.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <h1 className="text-3xl font-bold text-purple-900 mb-2">{profile.name}</h1>
          </div>

          {/* Profile Details */}
          <div className="space-y-6">
            {/* Specialization */}
            <div>
              <label className="block text-lg font-semibold text-purple-900 mb-2">Specialization</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-purple-50 border-2 border-purple-200 text-purple-900 placeholder-purple-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              ) : (
                <div className="px-4 py-3 rounded-xl bg-purple-50 text-purple-800">
                  {profile.specialization}
                </div>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-lg font-semibold text-purple-900 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl bg-purple-50 border-2 border-purple-200 text-purple-900 placeholder-purple-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              ) : (
                <div className="px-4 py-3 rounded-xl bg-purple-50 text-purple-800">
                  {profile.bio}
                </div>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-lg font-semibold text-purple-900 mb-2">Experience</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-purple-50 border-2 border-purple-200 text-purple-900 placeholder-purple-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              ) : (
                <div className="px-4 py-3 rounded-xl bg-purple-50 text-purple-800">
                  {profile.experience}
                </div>
              )}
            </div>

            {/* Session Price */}
            <div>
              <label className="block text-lg font-semibold text-purple-900 mb-2">Session Price</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.sessionPrice}
                  onChange={(e) => handleInputChange('sessionPrice', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-purple-50 border-2 border-purple-200 text-purple-900 placeholder-purple-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              ) : (
                <div className="px-4 py-3 rounded-xl bg-purple-50 text-purple-800">
                  {profile.sessionPrice}
                </div>
              )}
            </div>

            {/* Availability */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-lg font-semibold text-purple-900">Availability</label>
                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={handleAddAvailability}
                    className="text-sm px-3 py-1 rounded-lg bg-purple-200 text-purple-700 hover:bg-purple-300 transition-colors"
                  >
                    + Add Slot
                  </motion.button>
                )}
              </div>
              <div className="space-y-2">
                {(isEditing ? editedProfile.availability : profile.availability).map((slot, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={slot.day}
                          onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)}
                          placeholder="Day"
                          className="flex-1 px-3 py-2 rounded-lg bg-purple-50 border-2 border-purple-200 text-purple-900 placeholder-purple-400 focus:outline-none focus:border-purple-500"
                        />
                        <input
                          type="text"
                          value={slot.time}
                          onChange={(e) => handleAvailabilityChange(index, 'time', e.target.value)}
                          placeholder="Time"
                          className="flex-1 px-3 py-2 rounded-lg bg-purple-50 border-2 border-purple-200 text-purple-900 placeholder-purple-400 focus:outline-none focus:border-purple-500"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => handleRemoveAvailability(index)}
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        >
                          <X size={18} />
                        </motion.button>
                      </>
                    ) : (
                      <div className="flex-1 px-4 py-3 rounded-xl bg-purple-50 text-purple-800">
                        {slot.day} {slot.time}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-purple-200">
            {isEditing ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveProfile}
                  className="flex-1 py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                  Save Profile
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEditCancel}
                  className="flex-1 py-3 rounded-full bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-all flex items-center justify-center gap-2"
                >
                  <X size={20} />
                  Cancel
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEditStart}
                  className="flex-1 py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Edit2 size={20} />
                  Edit Profile
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/consultant-flow')}
                  className="flex-1 py-3 rounded-full bg-purple-200 text-purple-700 font-semibold hover:bg-purple-300 transition-all"
                >
                  Back to Dashboard
                </motion.button>
              </>
            )}
          </div>

          {/* Success Message */}
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 rounded-lg bg-green-100 text-green-700 text-center font-semibold"
            >
              Profile saved successfully!
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 fixed bottom-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-md border-t border-white border-opacity-20"
      >
        <div className="max-w-4xl mx-auto px-6 py-3 flex justify-around items-center">
          <button
            onClick={() => navigate('/consultant-flow')}
            className="flex flex-col items-center gap-1 py-2 px-4 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <Home size={24} />
            <span className="text-xs font-semibold">Home</span>
          </button>
          <button
            onClick={() => navigate('/consultant-flow')}
            className="flex flex-col items-center gap-1 py-2 px-4 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <div className="relative">
              <div className="w-6 h-6 flex items-center justify-center">👥</div>
            </div>
            <span className="text-xs font-semibold">Consultant</span>
          </button>
          <button
            onClick={() => navigate('/trackers')}
            className="flex flex-col items-center gap-1 py-2 px-4 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <span className="text-xl">📊</span>
            <span className="text-xs font-semibold">Trackers</span>
          </button>
          <button
            onClick={() => navigate('/progress')}
            className="flex flex-col items-center gap-1 py-2 px-4 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <span className="text-xl">🏆</span>
            <span className="text-xs font-semibold">Progress</span>
          </button>
          <button
            disabled
            className="flex flex-col items-center gap-1 py-2 px-4 text-gray-400"
          >
            <span className="text-xl">🎯</span>
            <span className="text-xs font-semibold">Progress</span>
          </button>
          <button
            className="flex flex-col items-center gap-1 py-2 px-4 text-purple-700 font-semibold"
          >
            <span className="text-xl">👤</span>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </motion.div>

      {/* Bottom padding */}
      <div className="h-24"></div>
    </div>
  );
};

export default ConsultantProfile;
