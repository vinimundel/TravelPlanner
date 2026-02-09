import React from 'react';
import '../styles/ExpenseCard.css';

const Icons = {
    Tour: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>,
    Transport: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="11" rx="2"></rect><circle cx="6" cy="17" r="2"></circle><circle cx="18" cy="17" r="2"></circle><path d="M5 6v-1a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1"></path></svg>,
    Flight: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>,
    Food: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><path d="M6 1v3"></path><path d="M10 1v3"></path><path d="M14 1v3"></path></svg>,
    Other: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
    Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
    Link: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
};

function ExpenseCard({ expense, tripDetails, onToggle, onDelete }) {
    const getIcon = (category) => {
        switch (category) {
            case 'Tour': return <Icons.Tour />;
            case 'Transport': return <Icons.Transport />;
            case 'Flight': return <Icons.Flight />;
            case 'Food': return <Icons.Food />;
            default: return <Icons.Other />;
        }
    };

    const handleAction = (e, action) => {
        e.stopPropagation();
        action();
    };

    // Currency Display Logic
    const displayCost = () => {
        const cost = parseFloat(expense.cost);
        const currency = expense.currency || tripDetails.tripCurrency;

        // If expense is in trip currency and it differs from home currency, show conversion
        if (currency === tripDetails.tripCurrency && tripDetails.tripCurrency !== tripDetails.homeCurrency) {
            const converted = cost * tripDetails.exchangeRate;
            return (
                <div className="price-container">
                    <span className="price-original">{currency} {cost.toLocaleString()}</span>
                    <span className="price-converted">≈ {tripDetails.homeCurrency} {converted.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
            );
        }

        // Otherwise just show the single price
        return <span className="price-tag">{currency} {cost.toLocaleString()}</span>;
    };

    return (
        <div
            className={`expense-card ${expense.isSelected ? 'selected' : 'deselected'}`}
            onClick={() => onToggle(expense.id)}
        >
            <div className="card-top">
                <div className="card-icon-small" data-category={expense.category}>
                    {getIcon(expense.category)}
                </div>
                {displayCost()}
            </div>

            <div className="card-body">
                <h3>{expense.title}</h3>
                {(expense.day || expense.startTime || expense.time) && (
                    <div className="card-meta">
                        {expense.day && <span className="meta-day">Day {expense.day}</span>}
                        {(expense.startTime || expense.time) && (
                            <span className="meta-time">
                                {' @ '}
                                {expense.startTime || expense.time}
                                {expense.endTime ? ` - ${expense.endTime}` : ''}
                            </span>
                        )}
                    </div>
                )}
            </div>

            <div className="card-actions-hover">
                {expense.link && (
                    <a
                        href={expense.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-btn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Icons.Link />
                    </a>
                )}
                <button
                    className="icon-btn delete"
                    onClick={(e) => handleAction(e, () => onDelete(expense.id))}
                >
                    <Icons.Trash />
                </button>
            </div>
        </div>
    );
}

export default ExpenseCard;
