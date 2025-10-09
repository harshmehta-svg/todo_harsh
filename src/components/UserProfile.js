// src/components/UserProfile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Spinner from './Spinner';
import Error from './Error';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchingFailed, setFetchingFailed] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchUserData = async () => {
      setFetchingFailed(false);
      try {
        setLoading(true);
        const response = await axios.get(`/api/users/${id}`);
        setUserData(response.data);
      } catch (error) {
        if (error.message.includes('Network Error')) {
          setFetchingFailed(true);
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [id]);

  if (loading) {
    return <Spinner />;
  } else if (error) {
    return <Error message={error} />;
  } else if (fetchingFailed) {
    return (
      <Error
        message="Failed to fetch user data. Please try again later."
        retryClick={() => {
          window.location.reload();
        }}
      />
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="bg-white p-4 rounded shadow-md">
          <Image
            src={`/api/images/users/${userData.id}`}
            width={50}
            height={50}
            className="rounded-full"
            alt="Profile Picture"
          />
          <h2 className="text-lg font-bold">{userData.name}</h2>
          <p className="text-gray-600">{userData.email}</p>
        </div>
      </div>
    );
  }
};

export default UserProfile;