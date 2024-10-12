import React, { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, googleProvider, firestore } from "../../../firebase.config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGoogle, FaSpinner } from "react-icons/fa";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signInGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result && result.user) {
        const userRole = await checkUserInFirestore(result.user.uid);
        if (userRole) {
          navigate(`/`);
        } else {
          navigate("/onboarding");
        }
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserInFirestore = async (uid) => {
    const studentDoc = doc(firestore, "students", uid);
    const instructorDoc = doc(firestore, "instructors", uid);
    const studentSnapshot = await getDoc(studentDoc);
    const instructorSnapshot = await getDoc(instructorDoc);
    if (studentSnapshot.exists()) {
      return "student";
    } else if (instructorSnapshot.exists()) {
      return "instructor";
    } else {
      return null;
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
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome to BeerGame</h2>
          <p className="text-center text-gray-600 mb-8">
            Sign in or create an account to get started
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={signInGoogle}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <FaGoogle className="mr-2" />
            )}
            {loading ? "Signing in..." : "Continue with Google"}
          </motion.button>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              By signing up, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
        <div className="bg-gray-50 px-8 py-4">
          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 font-medium hover:underline">Sign in</a>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignIn;