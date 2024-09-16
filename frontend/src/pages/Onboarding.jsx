import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeUserData } from "../store/reducers/userSlice";
import { auth } from "../../firebase.config";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaUserGraduate, FaSpinner } from "react-icons/fa";

const InputField = ({ icon: Icon, label, type, value, onChange, disabled }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full pl-10 pr-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          disabled ? "bg-gray-100" : ""
        }`}
        required
      />
    </div>
  </div>
);

const OnboardingForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(auth.currentUser?.email || "");
  const [role, setRole] = useState("student");
  const [isSubscribedToEmail, setIsSubscribedToEmail] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      console.error("User is not authenticated");
      return;
    }

    const userData = {
      uid: auth.currentUser.uid,
      name,
      email,
      role,
      isSubscribedToEmail,
      privacyAcceptee: privacyAccepted,
      plan: "free"
    };

    try {
      await dispatch(storeUserData(userData)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 px-4"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Complete Your Profile</h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center"
            >
              <p>{error}</p>
            </motion.div>
          )}

          <InputField
            icon={FaUser}
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputField
            icon={FaEnvelope}
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!!auth.currentUser?.email}
          />

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUserGraduate className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="appearance-none w-full pl-10 bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={isSubscribedToEmail}
                onChange={(e) => setIsSubscribedToEmail(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Subscribe to our email list</span>
            </label>
          </div>

          <div className="mb-6">
            <label className="inline-flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
                required
              />
              <span className="ml-2">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="inline-block animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Complete Onboarding"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingForm;