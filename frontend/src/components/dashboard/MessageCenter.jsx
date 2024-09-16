import React from 'react';
import { X, Send, MessageCircle } from 'lucide-react';

const MessageCenter = ({ selectedTab, setSelectedTab }) => {
  return (
    <>
      {selectedTab && (
        <div className="fixed bottom-20 right-10 bg-white p-6 rounded-lg shadow-lg w-96 mt-4 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="text-blue-500" size={24} />
              <h2 className="text-gray-800 text-xl font-semibold">How can we help?</h2>
            </div>
            <button
              onClick={() => setSelectedTab(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-gray-600 mb-4 text-sm">We usually respond in a few hours</p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <textarea
              placeholder="How can we help?"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition h-32 resize-none"
            />
            <button
            disabled
              // type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white w-full p-3 rounded-lg transition duration-200 ease-in-out flex items-center justify-center space-x-2"
            >
              <Send size={18} />
              <span>Send a message</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default MessageCenter;