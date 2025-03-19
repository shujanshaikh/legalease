"use client";

import React, { useState } from 'react';
import { FaFire, FaQuestionCircle, FaListUl, FaBalanceScale } from 'react-icons/fa';

export default function DashBoard() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');

  const colors = {
    dark: '#FBF6EE',
    accent: '#7A3E3E',
    lightGray: '#754E1A',
    blue: '#4D55CC',
    ivory: '#482121',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative " style={{ backgroundColor: colors.ivory }}>
      {/* Navigation Bar */}
      <nav className="w-full p-6 shadow-lg flex items-center justify-between relative" style={{ backgroundColor: colors.dark }}>
        <div className="flex items-center space-x-4">
          <span className="text-3xl">⚖️</span>
          <h1 className="text-4xl font-bold" style={{ color: colors.ivory }}>
            Legal<span style={{ color: colors.accent }}>Ease</span>
          </h1>
        </div>
        <div className="flex items-center space-x-8 whitespace-nowrap ">
          {['Home', 'About', 'Brief Cases', 'Attorneys', 'Contact'].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 text-base font-bold transition-all duration-300 rounded-full ${
                activeTab === item.toLowerCase().replace(' ', '-')
                  ? 'bg-[#482121] text-white'
                  : ''
              }`}
              style={{
                color:
                  activeTab === item.toLowerCase().replace(' ', '-')
                    ? 'white'
                    : colors.ivory,
              }}
              onClick={() => setActiveTab(item.toLowerCase().replace(' ', '-'))}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="px-4 py-2 rounded-lg text-lg transition transform duration-100 hover:scale-110"
            style={{ backgroundColor: colors.accent, color: colors.dark }}
            onClick={() => {
              setShowAuthModal(true);
              setAuthMode('signin');
            }}
          >
            Sign In
          </button>
          <button
            className="px-4 py-2 rounded-lg text-lg border border-accent transition transform duration-100 hover:scale-110"
            style={{ backgroundColor: colors.accent, color: colors.dark }}
            onClick={() => {
              setShowAuthModal(true);
              setAuthMode('signup');
            }}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Right Side Buttons below nav bar */}
      <div className="fixed top-28 right-0 flex flex-col space-y-4 pr-2 translate-x-1/2">
        <button className="flex items-center space-x-4 bg-[#7A3E3E] text-white px-4 py-3 rounded-l-lg shadow-lg hover:translate-x-[-60px] transition-transform duration-300">
          <FaFire />
          <span>Hot Topics</span>
        </button>
        <button className="flex items-center space-x-4 bg-[#7A3E3E] text-white px-4 py-3 rounded-l-lg shadow-lg hover:translate-x-[-40px] transition-transform duration-300">
          <FaQuestionCircle />
          <span>FAQS</span>
        </button>
        <button className="flex items-center space-x-4 bg-[#7A3E3E] text-white px-4 py-3 rounded-l-lg shadow-lg hover:translate-x-[-50px] transition-transform duration-300">
          <FaListUl />
          <span>Sections</span>
        </button>
        <button className="flex items-center space-x-4 bg-[#7A3E3E] text-white px-4 py-3 rounded-l-lg shadow-lg hover:translate-x-[-40px] transition-transform duration-300">
          <FaBalanceScale />
          <span>Rights</span>
        </button>
      </div>

      {/* Hero Section */}
      {activeTab === 'home' && (
        <section
          className="flex-1 flex flex-col items-center justify-center text-center w-full px-6 py-32"
          style={{ backgroundColor: colors.dark }}
        >
          <div className="max-w-3xl">
            <h2 className="text-8xl font-bold mb-6" style={{ color: colors.accent }}>
              Legal Matters <span style={{ color: colors.ivory }}>DECODED.</span>
            </h2>
            <h3 className="text-4xl font-bold" style={{ color: colors.ivory }}>
              Empowering Justice <span style={{ color: colors.accent }}> One Case at a Time</span>
            </h3>
            {/* Chatbot Search Bar */}
            <div className="flex flex-col items-center justify-center mt-16 m">
              <div className="flex items-center justify-center p-6  w-full max-w-5xl mx-auto mb-12 ">
                <input
                  type="text"
                  placeholder="Ask our AI legal assistant..."
                  className="w-500 text-gray-900 bg-white  px-8 py-5 rounded-full focus:outline-none text-xl"
                />
                <button
                  className="ml-4 px-6 py-5 rounded-lg text-xl whitespace-nowrap transition transform duration-100 hover:scale-110"
                  style={{ backgroundColor: colors.accent, color: colors.dark }}
                >
                  Ask
                </button>
                <button
                  className="ml-4 px-6 py-5 rounded-lg text-xl whitespace-nowrap transition transform duration-100 hover:scale-110"
                  style={{ backgroundColor: colors.accent, color: colors.dark }}
                >
                  Upload Your Doc
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {activeTab === 'about' && (
        <section
          className="flex-1 flex flex-col items-center justify-center text-center w-full px-6 py-32"
          style={{ backgroundColor: colors.dark }}
        >
          <div className="max-w-3xl">
            <h2 className="text-6xl font-bold mb-6" style={{ color: colors.accent }}>
              About Us
            </h2>
            <p className="text-xl" style={{ color: colors.dark }}>
              At LegalEase, we strive to provide accessible and reliable legal assistance to individuals and
              businesses alike. Our platform leverages AI technology and experienced legal professionals to help
              you navigate complex legal matters efficiently and confidently.
            </p>
          </div>
        </section>
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">
              {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
            </h2>
            <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded-lg" />
            <input type="password" placeholder="Password" className="w-full p-3 mb-4 border rounded-lg" />
            <button
              className="w-full px-4 py-2 rounded-lg text-lg mb-4"
              style={{ backgroundColor: colors.accent, color: colors.dark }}
            >
              {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
            <p className="text-sm cursor-pointer" onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
              style={{ color: colors.blue }}
            >
              {authMode === 'signin'
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Sign In'}
            </p>
            <button className="mt-4 text-red-500" onClick={() => setShowAuthModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-12 text-center t-3xl" style={{ backgroundColor: colors.dark }}>
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6" style={{ color: colors.ivory }}>
            Legal<span style={{ color: colors.accent }}>Ease</span>
          </h3>
          <p style={{ color: colors.lightGray }}>
            Dedicated to providing exceptional legal services with integrity and professionalism.
          </p>
          <p className="mt-6" style={{ color: colors.lightGray }}>
            &copy; {new Date().getFullYear()} LegalEase. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

