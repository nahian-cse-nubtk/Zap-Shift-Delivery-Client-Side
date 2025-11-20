import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({reviewData}) => {
    const {userName,review,date}=reviewData;
    return (
    <div className="max-w-md bg-white rounded-3xl shadow-md p-8 border border-gray-100">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-teal-400 text-3xl mb-4" />

      {/* Text */}
      <p className="text-gray-600 leading-relaxed">
       {review}
      </p>

      {/* Divider */}
      <div className="border-b border-dashed border-teal-300 my-6"></div>

      {/* Profile Row */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-teal-800"></div>

        <div>
          <h3 className="text-teal-800 font-semibold text-lg">{userName}</h3>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>
      </div>
    </div>
    );
};

export default ReviewCard;