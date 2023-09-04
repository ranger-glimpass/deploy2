import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ onStartTrip }) {
    const navigate = useNavigate();
    return (
    <div>
      
      <button onClick={() => navigate('/in-trip')}>
      Start Trip
    </button>
    </div>
  );
}
export default Home;
