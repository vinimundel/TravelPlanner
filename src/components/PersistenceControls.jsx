import React, { useRef } from 'react';
import '../styles/PersistenceControls.css';

const Icons = {
    Download: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
    Upload: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
    Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
};

function PersistenceControls({ tripDetails, expenses, onLoadPlan, onReset }) {
    const fileInputRef = useRef(null);

    const handleExport = () => {
        const data = {
            tripDetails,
            expenses,
            version: 1,
            exportedAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `travel-plan-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (data.tripDetails && data.expenses) {
                    onLoadPlan(data);
                } else {
                    alert('Invalid file format');
                }
            } catch (err) {
                console.error(err);
                alert('Failed to parse file');
            }
        };
        reader.readAsText(file);
        // Reset input so same file can be selected again
        e.target.value = '';
    };

    return (
        <div className="persistence-controls glass-panel compact">
            <div className="controls-group">
                <button className="control-btn" onClick={handleExport} title="Save Plan to File">
                    <Icons.Download /> Export Plan
                </button>
                <button className="control-btn" onClick={() => fileInputRef.current.click()} title="Load Plan from File">
                    <Icons.Upload /> Import Plan
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".json"
                    onChange={handleImport}
                />
            </div>
            <button className="control-btn danger" onClick={onReset} title="Clear All Data">
                <Icons.Trash /> Reset
            </button>
        </div>
    );
}

export default PersistenceControls;
