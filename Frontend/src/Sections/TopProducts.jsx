import React from 'react';
import pickleData from '../data/productDetails.js'; // adjust the path if needed

const TopRated = () => {
  // Sort by rating descending and take top 3
  const topPickles = [...pickleData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div>
      <h2>Top Rated Pickles</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {topPickles.map(pickle => (
          <div key={pickle.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <img src={pickle.images[0]} alt={pickle.name} style={{ width: '100%' }} />
            <h3>{pickle.name}</h3>
            <p>Price: ₹{pickle.price}</p>
            <p>Rating: {pickle.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRated;
