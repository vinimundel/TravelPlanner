import React, { useState } from 'react';
import '../styles/AddExpenseForm.css';

function AddExpenseForm({ onAdd, onCancel, tripDetails }) {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Tour',
        cost: '',
        currency: tripDetails.tripCurrency, // Default to trip currency
        day: '',
        startTime: '',
        endTime: '',
        link: ''
    });

    const categories = ['Tour', 'Transport', 'Flight', 'Food', 'Other'];
    const timeEnabledCategories = ['Tour', 'Transport', 'Flight'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.cost) return;

        onAdd({
            ...formData,
            id: Date.now(),
            cost: parseFloat(formData.cost),
            day: formData.day ? parseInt(formData.day) : null // Pass null if empty
        });

        setFormData({
            title: '',
            category: 'Tour',
            cost: '',
            currency: tripDetails.tripCurrency,
            day: '',
            startTime: '',
            endTime: '',
            link: ''
        });
    };

    return (
        <div className="add-expense-form glass-panel">
            <h3>Add New Expense</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group flex-2">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Museum Ticket"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group flex-1">
                        <label>Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group flex-1">
                        <label>Cost</label>
                        <div className="cost-input-group">
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                value={formData.cost}
                                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                                required
                            />
                            <select
                                value={formData.currency}
                                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                className="currency-select"
                            >
                                <option value={tripDetails.tripCurrency}>{tripDetails.tripCurrency}</option>
                                <option value={tripDetails.homeCurrency}>{tripDetails.homeCurrency}</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group flex-1">
                        <label>Day</label>
                        <input
                            type="number"
                            min="1"
                            max={tripDetails.days || 30}
                            placeholder="Day 1"
                            value={formData.day}
                            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                        />
                    </div>

                    {timeEnabledCategories.includes(formData.category) && (
                        <div className="form-group flex-2">
                            <label>Time (Start - End)</label>
                            <div className="time-input-group" style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="time"
                                    value={formData.startTime}
                                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                    aria-label="Start Time"
                                />
                                <input
                                    type="time"
                                    value={formData.endTime}
                                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                    aria-label="End Time"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="form-row">
                    <div className="form-group full-width">
                        <label>Link (Optional)</label>
                        <input
                            type="url"
                            placeholder="https://..."
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    {onCancel && <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>}
                    <button type="submit" className="btn-primary">Add Card</button>
                </div>
            </form>
        </div>
    );
}

export default AddExpenseForm;
