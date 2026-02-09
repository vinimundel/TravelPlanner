import React, { useState } from 'react';
import '../styles/TripOverview.css';

// Simple SVG Icons
const Icons = {
    MapPin: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
    ),
    Calendar: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
    ),
    DollarSign: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
    ),
    Plane: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
    ),
    Plus: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    ),
    X: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    )
};

function TripOverview({ tripDetails, setTripDetails, remainingBudget }) {
    const [newDestination, setNewDestination] = useState('');

    const addDestination = (e) => {
        if (e.key === 'Enter' && newDestination.trim()) {
            setTripDetails({
                ...tripDetails,
                destinations: [...tripDetails.destinations, newDestination.trim()]
            });
            setNewDestination('');
        }
    };

    const removeDestination = (index) => {
        const updated = tripDetails.destinations.filter((_, i) => i !== index);
        setTripDetails({ ...tripDetails, destinations: updated });
    };

    const handleChange = (field, value) => {
        setTripDetails({ ...tripDetails, [field]: value });
    };

    return (
        <div className="trip-overview glass-panel">
            <div className="overview-header">
                <h2><Icons.Plane /> Trip Details</h2>
                <div className="budget-display">
                    <span>Remaining Budget:</span>
                    <span className={`amount ${remainingBudget < 0 ? 'negative' : ''}`}>
                        ${remainingBudget.toLocaleString()}
                    </span>
                </div>
            </div>

            <div className="overview-grid">
                {/* Destinations Input */}
                <div className="input-group full-width">
                    <label><Icons.MapPin /> Destinations</label>
                    <div className="tag-input-container">
                        {tripDetails.destinations.map((dest, index) => (
                            <span key={index} className="tag">
                                {dest}
                                <button onClick={() => removeDestination(index)}><Icons.X /></button>
                            </span>
                        ))}
                        <input
                            type="text"
                            placeholder="Add city & press Enter..."
                            value={newDestination}
                            onChange={(e) => setNewDestination(e.target.value)}
                            onKeyDown={addDestination}
                        />
                    </div>
                </div>

                {/* Airport */}
                <div className="input-group">
                    <label><Icons.Plane /> Airport</label>
                    <input
                        type="text"
                        placeholder="e.g. JFK"
                        value={tripDetails.airport}
                        onChange={(e) => handleChange('airport', e.target.value)}
                    />
                </div>

                {/* Date */}
                <div className="input-group">
                    <label><Icons.Calendar /> Start Date</label>
                    <input
                        type="date"
                        value={tripDetails.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                    />
                </div>

                {/* Duration */}
                <div className="input-group">
                    <label>Duration (Days)</label>
                    <input
                        type="number"
                        min="1"
                        placeholder="e.g. 7"
                        value={tripDetails.days}
                        onChange={(e) => handleChange('days', parseInt(e.target.value) || 0)}
                    />
                </div>

                {/* Total Budget */}
                <div className="input-group">
                    <label><Icons.DollarSign /> Total Budget ($)</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="0.00"
                        value={tripDetails.totalBudget}
                        onChange={(e) => handleChange('totalBudget', parseFloat(e.target.value) || 0)}
                    />
                </div>

                {/* Local Currency Budget (Optional) */}
                <div className="input-group">
                    <label>Budget (Local Currency)</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="e.g. € or £"
                        value={tripDetails.localCurrencyBudget}
                        onChange={(e) => handleChange('localCurrencyBudget', parseFloat(e.target.value) || 0)}
                    />
                </div>

                {/* Currency Settings */}
                <div className="input-group">
                    <label>Home Currency</label>
                    <input
                        type="text"
                        placeholder="e.g. BRL"
                        value={tripDetails.homeCurrency}
                        onChange={(e) => handleChange('homeCurrency', e.target.value.toUpperCase())}
                        maxLength={3}
                    />
                </div>

                <div className="input-group">
                    <label>Trip Currency</label>
                    <input
                        type="text"
                        placeholder="e.g. ARS"
                        value={tripDetails.tripCurrency}
                        onChange={(e) => handleChange('tripCurrency', e.target.value.toUpperCase())}
                        maxLength={3}
                    />
                </div>

                <div className="input-group">
                    <label>Exchange Rate (1 {tripDetails.tripCurrency || 'Unit'} = ? {tripDetails.homeCurrency || 'Unit'})</label>
                    <input
                        type="number"
                        min="0"
                        step="0.0001"
                        placeholder="0.005"
                        value={tripDetails.exchangeRate}
                        onChange={(e) => handleChange('exchangeRate', parseFloat(e.target.value) || 0)}
                    />
                </div>

            </div>
        </div>
    );
}

export default TripOverview;
