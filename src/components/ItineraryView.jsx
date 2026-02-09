import React from 'react';
import ExpenseCard from './ExpenseCard';
import '../styles/ItineraryView.css';

function ItineraryView({ expenses, tripDetails, toggleExpense, deleteExpense, days }) {
    // Group expenses by Day
    const groupedExpenses = {};

    // Initialize days
    const totalDays = parseInt(tripDetails.days) || 1;
    for (let i = 1; i <= totalDays; i++) {
        groupedExpenses[i] = [];
    }

    // Sort expenses into days
    expenses.forEach(expense => {
        const day = expense.day || 1;
        if (!groupedExpenses[day]) groupedExpenses[day] = [];
        groupedExpenses[day].push(expense);
    });

    // Sort each day by time
    Object.keys(groupedExpenses).forEach(day => {
        // Sort entire array by time for now to keep them ordered if they become timed
        groupedExpenses[day].sort((a, b) => {
            const timeA = a.startTime || a.time || '23:59';
            const timeB = b.startTime || b.time || '23:59';
            return timeA.localeCompare(timeB);
        });
    });

    const renderDayContent = (dayExpenses) => {
        const timedExpenses = dayExpenses.filter(e => e.startTime || e.time);
        const untimedExpenses = dayExpenses.filter(e => !e.startTime && !e.time);

        return (
            <>
                <div className="day-timeline">
                    {timedExpenses.length > 0 ? (
                        timedExpenses.map(expense => (
                            <div key={expense.id} className="timeline-item">
                                <div className="timeline-time">
                                    {expense.startTime || expense.time}
                                    {expense.endTime && ` - ${expense.endTime}`}
                                </div>
                                <div className="timeline-content">
                                    <ExpenseCard
                                        expense={expense}
                                        tripDetails={tripDetails}
                                        onToggle={toggleExpense}
                                        onDelete={deleteExpense}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        untimedExpenses.length === 0 && <div className="empty-day">No plans yet</div>
                    )}
                </div>

                {untimedExpenses.length > 0 && (
                    <div className="day-untimed">
                        <h4>Other Activities</h4>
                        <div className="untimed-list">
                            {untimedExpenses.map(expense => (
                                <ExpenseCard
                                    key={expense.id}
                                    expense={expense}
                                    tripDetails={tripDetails}
                                    onToggle={toggleExpense}
                                    onDelete={deleteExpense}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="itinerary-view">
            {Object.keys(groupedExpenses).map(day => (
                <div key={day} className="day-column glass-panel">
                    <div className="day-header">
                        <h3>Day {day}</h3>
                        <span className="day-count">{groupedExpenses[day].length} Activities</span>
                    </div>
                    {renderDayContent(groupedExpenses[day])}
                </div>
            ))}
        </div>
    );
}

export default ItineraryView;
