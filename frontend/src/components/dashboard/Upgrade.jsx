import React, { useState, useEffect } from 'react';
import { FaCheck, FaMapMarkerAlt, FaEnvelope, FaSave } from 'react-icons/fa';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Upgrade = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [selectedPackage, setSelectedPackage] = useState('Small');
  const [activeTab, setActiveTab] = useState('plan');
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const packages = {
    Small: { label: 'Small', participants: 10, price: { monthly: 350, annual: 3500 } },
    Medium: { label: 'Medium', participants: 20, price: { monthly: 700, annual: 7000 } },
    Large: { label: 'Large', participants: 40, price: { monthly: 1400, annual: 14000 } },
    ExtraLarge: { label: 'Extra Large', participants: 100, price: { monthly: 3500, annual: 35000 } },
  };

  useEffect(() => {
    const fetchBillingInfo = async () => {
      setIsLoading(true);
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setBillingInfo(docSnap.data().billingInfo || {});
          }
        }
      } catch (err) {
        console.error('Error fetching billing info:', err);
        setError('Failed to load billing information. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBillingInfo();
  }, []);

  const handleBillingInfoChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        await setDoc(doc(db, 'users', user.uid), { billingInfo }, { merge: true });
        alert('Billing information saved successfully!');
      } else {
        throw new Error('No user logged in');
      }
    } catch (err) {
      console.error('Error saving billing info:', err);
      setError('Failed to save billing information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const renderPlanSelection = () => (
    <>
      <div className="mb-8 flex justify-center space-x-4">
        <button
          className={`px-6 py-2 rounded-full ${selectedPlan === 'monthly' ? 'bg-[#e86234] text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setSelectedPlan('monthly')}
        >
          Monthly
        </button>
        <button
          className={`px-6 py-2 rounded-full ${selectedPlan === 'annual' ? 'bg-[#e86234] text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setSelectedPlan('annual')}
        >
          Annual
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(packages).map(([key, pkg]) => (
          <div
            key={key}
            className={`p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
              selectedPackage === key ? 'border-[#e86234] bg-[#fff5f1]' : 'border-gray-200 hover:border-[#e86234]'
            }`}
            onClick={() => setSelectedPackage(key)}
          >
            <h3 className="font-bold text-xl mb-2">{pkg.label}</h3>
            <p className="text-gray-600 mb-4">{pkg.participants} Participants</p>
            <p className="text-2xl font-bold text-[#e86234]">
              ${pkg.price[selectedPlan]}
              <span className="text-sm font-normal text-gray-500">
                /{selectedPlan === 'monthly' ? 'mo' : 'yr'}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Plan Features</h2>
        <ul className="space-y-2">
          {[
            'Access to Beer Game simulations',
            'Customizable game parameters',
            'Real-time analytics and reporting',
            'Dedicated customer support',
            selectedPlan === 'annual' ? 'Two months free' : null
          ].filter(Boolean).map((feature, index) => (
            <li key={index} className="flex items-center">
              <FaCheck className="text-[#e86234] mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const renderBillingInfo = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Billing Information</h2>
      {isLoading ? (
        <p>Loading billing information...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={billingInfo.fullName}
              onChange={handleBillingInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e86234]"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={billingInfo.email}
                onChange={handleBillingInfoChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e86234]"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="address"
              name="address"
              value={billingInfo.address}
              onChange={handleBillingInfoChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e86234]"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={billingInfo.city}
              onChange={handleBillingInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e86234]"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
            <input
              type="text"
              id="state"
              name="state"
              value={billingInfo.state}
              onChange={handleBillingInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e86234]"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={billingInfo.zipCode}
              onChange={handleBillingInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e86234]"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={billingInfo.country}
              onChange={handleBillingInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e86234]"
              required
            />
          </div>
        </div>
        <div className="mt-6">
            <button
              type="button"
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center justify-center w-full px-4 py-2 bg-[#e86234] text-white rounded-md hover:bg-[#d55729] transition-colors duration-200"
            >
              {isLoading ? 'Saving...' : (
                <>
                  <FaSave className="mr-2" />
                  Save Billing Information
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Upgrade Your Plan</h1>
      
      <div className="mb-8 flex border-b">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'plan' ? 'text-[#e86234] border-b-2 border-[#e86234]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('plan')}
        >
          Choose Plan
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'billing' ? 'text-[#e86234] border-b-2 border-[#e86234]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('billing')}
        >
          Billing Information
        </button>
      </div>

      {activeTab === 'plan' ? renderPlanSelection() : renderBillingInfo()}

      {activeTab === 'plan' && (
        <div className="mt-8 text-center">
          <button 
            className="px-8 py-3 bg-[#e86234] text-white rounded-full text-lg font-medium hover:bg-[#d55729] transition-colors duration-200"
            onClick={() => setActiveTab('billing')}
          >
            Continue to Billing
          </button>
          <p className="mt-2 text-sm text-gray-600">30-day money-back guarantee</p>
        </div>
      )}
    </div>
  );
};

export default Upgrade;