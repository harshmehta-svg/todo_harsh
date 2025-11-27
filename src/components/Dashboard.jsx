import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get('/api/data');
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const result = await axios.post('/api/data', data);
      console.log(result);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('name', { required: true })}
          placeholder="Name"
          className="block w-full p-2 mb-4 border border-gray-400 rounded-lg"
        />
        {errors.name && <p className="text-red-500">Name is required</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>
      <ul>
        {data.map((item) => (
          <li key={item.id} className="mb-4">
            <Link to={`/details/${item.id}`} className="text-lg font-bold">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Dashboard.propTypes = {
  // propTypes here
};

export default Dashboard;