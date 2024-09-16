import React, { useContext } from 'react';
import { LoadingContext } from '../contexts/LoadingContext';
import { PuffLoader } from 'react-spinners';

const Loading = () => {
  const { isLoading } = useContext(LoadingContext);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-[300]">
      <PuffLoader color="#ff4500" size={60} />
    </div>
  );
};

export default Loading;
