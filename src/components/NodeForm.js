import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NodeForm({ onStartWalking, onEndTrip }) {
    const navigate = useNavigate();
    const [nodeType, setNodeType] = useState('');
    const [property, setProperty] = useState('');
    const [nodeName, setNodeName] = useState('');
    const [actionType, setActionType] = useState('');

    const propertiesOptions = {
        "Shop": ["Shop", "Showroom", "FoodCourt", "ServiceCenter","Others"],
        "Checkpoint": ["Gate", "Lift", "BillBoard", "Pillars", "Fountains", "Attractions", "Others"]
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            nodeType,
            property,
            nodeName
        };

        if (actionType === "startWalking") {
            onStartWalking(formData);
            navigate("/compass"); // assuming "/compass" is the path to your compass page
        } else if (actionType === "endTrip") {
            onEndTrip();
            navigate("/trip"); // or redirect to wherever you want after ending the trip
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Type:</label>
                <select value={nodeType} onChange={(e) => setNodeType(e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="Shop">Shop</option>
                    <option value="Checkpoint">Checkpoint</option>
                </select>
            </div>

            {nodeType && (
                <div>
                    <label>Property:</label>
                    <select value={property} onChange={(e) => setProperty(e.target.value)}>
                        <option value="">Select Property</option>
                        {propertiesOptions[nodeType].map(prop => (
                            <option key={prop} value={prop}>{prop}</option>
                        ))}
                    </select>
                </div>
            )}

            <div>
                <label>Node Name:</label>
                <input
                    type="text"
                    value={nodeName}
                    onChange={(e) => setNodeName(e.target.value)}
                />
            </div>

            <div>
                <label>
                    <input
                        type="radio"
                        value="startWalking"
                        checked={actionType === "startWalking"}
                        onChange={(e) => setActionType(e.target.value)}
                    />
                    Start Walking
                </label>
                <label>
                    <input
                        type="radio"
                        value="endTrip"
                        checked={actionType === "endTrip"}
                        onChange={(e) => setActionType(e.target.value)}
                    />
                    End Trip
                </label>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

export default NodeForm;
