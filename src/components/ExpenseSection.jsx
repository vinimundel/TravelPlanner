import React, { useState } from 'react';
import ExpenseCard from './ExpenseCard';
import AddExpenseForm from './AddExpenseForm';
import ItineraryView from './ItineraryView';
import '../styles/ExpenseSection.css';

// Icons
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const Icons = {
    Grid: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
    List: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
};

function ExpenseSection({ expenses, tripDetails, addExpense, toggleExpense, deleteExpense }) {
    const [showForm, setShowForm] = useState(false);
    const [viewMode, setViewMode] = useState('board'); // 'board' or 'itinerary'

    return (
        <div className="expense-section">
            <div className="section-header">
                <div className="header-left">
                    <h2>Expenses & Activities</h2>
                    <div className="view-toggles">
                        <button
                            className={`view-btn ${viewMode === 'board' ? 'active' : ''}`}
                            onClick={() => setViewMode('board')}
                            title="Board View"
                        >
                            <Icons.Grid />
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'itinerary' ? 'active' : ''}`}
                            onClick={() => setViewMode('itinerary')}
                            title="Itinerary View"
                        >
                            <Icons.List />
                        </button>
                    </div>
                </div>

                {!showForm && (
                    <button className="add-btn" onClick={() => setShowForm(true)}>
                        <PlusIcon /> Add Card
                    </button>
                )}
            </div>

            {showForm && (
                <AddExpenseForm
                    tripDetails={tripDetails}
                    onAdd={(expense) => {
                        addExpense(expense);
                        setShowForm(false);
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {viewMode === 'board' ? (
                <div className="expenses-grid">
                    {expenses.length > 0 ? (
                        expenses.map(expense => (
                            <ExpenseCard
                                key={expense.id}
                                expense={expense}
                                tripDetails={tripDetails}
                                onToggle={toggleExpense}
                                onDelete={deleteExpense}
                            />
                        ))
                    ) : (
                        !showForm && <div className="empty-state">No expenses added yet. Click "Add Card" to start planning.</div>
                    )}
                </div>
            ) : (
                <ItineraryView
                    expenses={expenses}
                    tripDetails={tripDetails}
                    toggleExpense={toggleExpense}
                    deleteExpense={deleteExpense}
                />
            )}
        </div>
    );
}

export default ExpenseSection;
