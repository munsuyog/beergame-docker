import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { checkUserSignedIn } from '../store/reducers/userSlice';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { user, loading, profileCompleted } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      // Dispatch the check only if user is not already available
      dispatch(checkUserSignedIn());
    }
  }, [dispatch, user]);

  // If loading is true, show a loading spinner or any loading component
  if (loading) {
    return <div>Loading...</div>; 
  }

  // If the check is complete and user is not signed in, navigate to sign-in page
  if (!user) {
    return <Navigate to="/signin" />;
  }

  // If the user's profile is incomplete, navigate to the onboarding page
  if (!profileCompleted) {
    return <Navigate to="/onboarding" />;
  }

  // Otherwise, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
