import React from 'react';
import { useNavigate } from 'react-router-dom';

function InTrip() {
  const navigate = useNavigate();

  const handleAddNode = () => {
    navigate("/node-form");
  };

  const handleAddConnection = () => {
    // Logic for adding connection (if you decide to implement it)
  };

  return (
    <div>
      <button onClick={handleAddNode}>Add/Edit Node</button>
      <button onClick={handleAddConnection}>Add Connection</button>
    </div>
  );
}

export default InTrip;
