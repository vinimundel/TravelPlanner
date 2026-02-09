import React, { useState, useEffect } from 'react';
import TripOverview from './components/TripOverview';
import ExpenseSection from './components/ExpenseSection';
import './App.css';

function App() {
  // Trip Details State
  const [tripDetails, setTripDetails] = useState({
    destinations: [],
    airport: '',
    days: '',
    date: '',
    totalBudget: 0,
    localCurrencyBudget: 0,
    homeCurrency: 'BRL',
    tripCurrency: 'ARS',
    exchangeRate: 0.005 // Default e.g. 1 ARS = 0.005 BRL
  });

  // Expenses State
  const [expenses, setExpenses] = useState([]);

  // Calculated State
  const [remainingBudget, setRemainingBudget] = useState(0);

  // Calculate remaining budget whenever expenses, totalBudget, or exchange rate changes
  useEffect(() => {
    const totalExpenses = expenses
      .filter(expense => expense.isSelected)
      .reduce((acc, curr) => {
        let costInHomeCurrency = curr.cost;
        if (curr.currency === tripDetails.tripCurrency) {
          costInHomeCurrency = curr.cost * tripDetails.exchangeRate;
        }
        return acc + costInHomeCurrency;
      }, 0);
    setRemainingBudget(tripDetails.totalBudget - totalExpenses);
  }, [tripDetails.totalBudget, tripDetails.exchangeRate, tripDetails.tripCurrency, expenses]);

  const addExpense = (expense) => {
    // Default new expenses to trip currency if not specified
    const newExpense = {
      ...expense,
      isSelected: true,
      currency: expense.currency || tripDetails.tripCurrency
    };
    setExpenses([...expenses, newExpense]);
  };

  const toggleExpense = (id) => {
    setExpenses(expenses.map(exp =>
      exp.id === id ? { ...exp, isSelected: !exp.isSelected } : exp
    ));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header className="app-header">
          <h1>Travel<span>Planner</span></h1>
          <p>Atacama first, Thailand/Berlin next.</p>
        </header>

        <main>
          <TripOverview
            tripDetails={tripDetails}
            setTripDetails={setTripDetails}
            remainingBudget={remainingBudget}
          />

          <ExpenseSection
            expenses={expenses}
            tripDetails={tripDetails}
            addExpense={addExpense}
            toggleExpense={toggleExpense}
            deleteExpense={deleteExpense}
          />
        </main>

        <footer className="app-footer">
          <p>© {new Date().getFullYear()} TravelPlanner. Tailandia 2026.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
