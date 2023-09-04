// src/App.js

import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';  // Assuming you have created a HomePage component
import NodeForm from './components/NodeForm';
import Compass from './components/Compass';
import InTrip from './components/InTrip';


function App() {
    const [formData, setFormData] = useState(null);

    const onStartWalking = (data) => {
        setFormData(data);  // store the form data to pass it to the Compass component
    };

    const onEndTrip = () => {
        // Handle end trip logic here
    };
    return (
        
        <div className="App">
            <header className="App-header">
            <h1>Glimpass</h1>
      <p>Follow the compass</p> <br></br>
            <Router>
            {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/in-trip">Trip</Link>
    </nav> */}
            <Routes>
            <Route path="/deploy2" element={<Home />}/>
                <Route path="/" element={<Home />}/>
                    {/* <Home /> */}
                
                <Route path="/node-form" element={<NodeForm onStartWalking={onStartWalking} onEndTrip={onEndTrip} />}/>
                    {/* <NodeForm onStartWalking={onStartWalking} onEndTrip={onEndTrip} /> */}

                <Route path="/compass" element={<Compass formData={formData}  />}/>
                    {/* Pass the form data to the Compass component */}
                    {/* <Compass formData={formData} /> */}

                <Route path="/in-trip" element={<InTrip />}/>
                    {/* Pass the form data to the Compass component */}
                    {/* <InTrip/> */}
            </Routes>
        </Router>
            </header>
        </div>
    );
}

export default App;
