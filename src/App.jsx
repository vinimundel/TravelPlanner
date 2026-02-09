import React, { useState, useEffect } from 'react';
import TripOverview from './components/TripOverview';
import ExpenseSection from './components/ExpenseSection';
import PersistenceControls from './components/PersistenceControls';
import './App.css';

const STORAGE_KEY = 'travel_planner_data';

function App() {
  // Load initial state from local storage or default
  const loadInitialState = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    return null;
  };

  const initialState = loadInitialState();

  // Trip Details State
  const [tripDetails, setTripDetails] = useState(initialState?.tripDetails || {
    destinations: [],
    airport: '',
    days: '',
    date: '',
    totalBudget: 0,
    localCurrencyBudget: 0,
    homeCurrency: 'BRL',
    tripCurrency: 'ARS',
    exchangeRate: 0.005
  });

  // Expenses State
  const [expenses, setExpenses] = useState(initialState?.expenses || []);

  // Calculated State
  const [remainingBudget, setRemainingBudget] = useState(0);

  // Auto-Save to LocalStorage
  useEffect(() => {
    const dataToSave = { tripDetails, expenses };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [tripDetails, expenses]);

  // Calculate remaining budget
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
    const baseExpense = {
      ...expense,
      isSelected: true,
      currency: expense.currency || tripDetails.tripCurrency
    };

    if (!expense.day) {
      // Add for EVERY day
      const totalDays = parseInt(tripDetails.days) || 1;
      const dailyCost = baseExpense.cost / totalDays; // Divide total cost by days

      const newExpenses = [];
      for (let i = 1; i <= totalDays; i++) {
        newExpenses.push({
          ...baseExpense,
          id: Date.now() + i, // Ensure unique IDs
          day: i,
          cost: dailyCost // Set the split cost
        });
      }
      setExpenses([...expenses, ...newExpenses]);
    } else {
      // Add for specific day
      setExpenses([...expenses, baseExpense]);
    }
  };

  const toggleExpense = (id) => {
    setExpenses(expenses.map(exp =>
      exp.id === id ? { ...exp, isSelected: !exp.isSelected } : exp
    ));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const handleLoadPlan = (data) => {
    if (data.tripDetails) setTripDetails(data.tripDetails);
    if (data.expenses) setExpenses(data.expenses);
  };

  const handleResetPlan = () => {
    if (window.confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      setTripDetails({
        destinations: [],
        airport: '',
        days: '',
        date: '',
        totalBudget: 0,
        localCurrencyBudget: 0,
        homeCurrency: 'BRL',
        tripCurrency: 'ARS',
        exchangeRate: 0.005
      });
      setExpenses([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header className="app-header">
          <h1>Travel<span>Planner</span></h1>
          <p>Atacama first, Thailand/Berlin next.</p>
          <PersistenceControls
            tripDetails={tripDetails}
            expenses={expenses}
            onLoadPlan={handleLoadPlan}
            onReset={handleResetPlan}
          />
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
