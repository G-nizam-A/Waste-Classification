import React, { useState } from 'react';
import axios from 'axios';
import { FaHourglassStart } from "react-icons/fa";
import { Logo } from '../assets';

const RealTimeDetection = () => {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const startRealTimeProcessing = async () => {
    setIsLoading(true);
    setIsRunning(true);
    try {
      const response = await axios.post('http://localhost:8000/real-time');
      console.log('result', response)
      if (!response.data.status) {
        throw Error('Internal Server Error');
      }

      setStatus(response.data.message);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsRunning(false);
      setStatus('Error occurred while starting real-time processing');
      console.error('Error:', error);
    }
  };

  const stopRealTimeProcessing = async () => {
    setIsLoading(true);
    setIsRunning(false);
    try {
      const response = await axios.post('http://localhost:8000/stop-real-time');
      if (response.status !== 200) {
        throw Error('Internal Server Error');
      }

      setIsLoading(false);
      setStatus(response.data.message);
    } catch (error) {
      setIsLoading(false);
      setIsRunning(false);
      setStatus('Error occurred while stopping real-time processing');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center  space-y-6 bg-gray-100 px-4 sm:flex-col sm:space-x-6 sm:space-y-0 overflow-hidden">
        <div>
            <img src={Logo} className="top-4 left-4 sm:top-6 sm:left-6 mx-auto w-24" />
            <h1 className="text-gray-900 text-3xl font-bold mb-2">Real-Time Detection Control</h1>
          </div>
      {/* <h1>Real-Time Detection Control</h1> */}
        <div className="w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-md">
          <FaHourglassStart className={`mx-auto mt-8 h-12 w-12 ${isRunning ? 'text-green-500 animate-spin_360' : 'text-red-500'}`} />
          <h1 className="mt-2 text-center text-2xl font-bold text-gray-500">
          {isLoading ? 'Loading...' : status}
          </h1>
          <p className="my-4 text-center text-sm text-gray-500">
            {isRunning ? 'Running...' : 'Stopped'}
          </p>
          <div className="space-x-4 bg-gray-100 py-4 text-center">
            <button  onClick={startRealTimeProcessing} disabled={isLoading} className=" hover:scale-105 hover:shadow-xl inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-white shadow-md duration-75">
              Start
            </button>
            <button onClick={stopRealTimeProcessing} disabled={isLoading} className=" duration-300 hover:scale-105 hover:shadow-xl inline-block rounded-md bg-red-500 px-10 py-2 font-semibold text-white shadow-md ">
              Stop
            </button>
          </div>
        </div>
      </div>
    </>

  );
};

export default RealTimeDetection;
