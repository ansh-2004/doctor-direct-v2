import React, { useState } from 'react';

const BMICalculator = () => {
  const [gender, setGender] = useState('female');
  const [age, setAge] = useState(20);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(55);
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);
  };

  return (
    <div className="flex gap-4 p-6 max-w-4xl mx-auto">
      {/* Left Panel - Calculator */}
      <div className="flex-1 bg-white rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-6">BMI Calculator</h1>
        
        {/* Gender Selection */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setGender('female')}
            className={`flex-1 p-4 rounded-lg border-2 ${
              gender === 'female' ? 'border-pink-400 bg-pink-50' : 'border-gray-200'
            }`}
          >
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-pink-400 flex items-center justify-center text-white text-2xl">♀</div>
            <div className="text-center">Female</div>
          </button>
          
          <button
            onClick={() => setGender('male')}
            className={`flex-1 p-4 rounded-lg border-2 ${
              gender === 'male' ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-400 flex items-center justify-center text-white text-2xl">♂</div>
            <div className="text-center">Male</div>
          </button>
        </div>

        {/* Age Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 bg-gray-100 rounded-lg"
          />
        </div>

        {/* Height Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Height:</label>
          <div className="relative">
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-2 bg-gray-100 rounded-lg"
            />
            <span className="absolute right-3 top-2 text-gray-500 text-sm">
              (centimeters)
            </span>
          </div>
        </div>

        {/* Weight Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Weight:</label>
          <div className="relative">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 bg-gray-100 rounded-lg"
            />
            <span className="absolute right-3 top-2 text-gray-500 text-sm">
              (kilograms)
            </span>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateBMI}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Calculate
        </button>
      </div>

      {/* Right Panel - Result */}
      {bmi && (
        <div className="flex-1 bg-white rounded-lg p-6 shadow-md flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-4">
            {bmi < 18.5 ? 'Underweight' :
             bmi < 25 ? 'Normal weight' :
             bmi < 30 ? 'Overweight' : 'Obese'}
          </h2>
          
          <div className="w-16 h-16 mb-4">
            💪
          </div>
          
          <div className="text-6xl font-bold mb-4">{bmi}</div>
          
          <p className="text-center text-gray-600">
            Maintaining a healthy weight is important for your heart health.
          </p>

          <button className="mt-6 flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Share my BMI
          </button>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;