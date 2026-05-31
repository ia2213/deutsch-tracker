import { useState } from 'react';
import { useProgress } from '../hooks/useProgress.js';
import DayTracker from './DayTracker.jsx';
import Heatmap from './Heatmap.jsx';

function Dashboard({ user }) {
  const {
    userData, days, loading,
    setStartDate, updateTask, completeDay,
    getPhase, getWeek, getLevel, getStreakCount, getWeeklyProgress
  } = useProgress(user.uid);

  const [dateInput, setDateInput] = useState('');

  if (loading) return <div className="loading"><div className="spinner"></div></div>;

  if (!userData?.startDate) {
    return (
      <div className="setup-page">
        <div className="setup-card">
          <h2>&#x1F4C5; Startdatum w&#xE4;hlen</h2>
          <p>W&#xE4;hle das Datum, an dem du mit dem Lernen begonnen hast oder beginnen m&#xF6;chtest.</p>
          <input
            type="date"
            className="date-input"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <button
            className="btn-primary"
            onClick={() => dateInput && setStartDate(dateInput)}
            disabled={!dateInput}
          >
            Tracker starten
          </button>
        </div>
      </div>
    );
  }

  const currentDay = userData.currentDay || 1;
  const phase = getPhase(currentDay);
  const week = getWeek(currentDay);
  const level = getLevel(phase);
  const streak = getStreakCount();
  const weeklyProgress = getWeeklyProgress();
  const totalCompleted = Object.values(days).filter(d => d.completed).length;
  const overallProgress = Math.round((currentDay / 168) * 100);

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">&#x1F525;</div>
          <div className="stat-value">{streak}</div>
          <div className="stat-label">Streak (Tage)</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">&#x1F4C5;</div>
          <div className="stat-value">Tag {currentDay}</div>
          <div className="stat-label">von 168</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">&#x1F4DA;</div>
          <div className="stat-value">Woche {week}/24</div>
          <div className="stat-label">Phase {phase} &mdash; {level}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">&#x2705;</div>
          <div className="stat-value">{weeklyProgress}%</div>
          <div className="stat-label">diese Woche</div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span>Gesamtfortschritt</span>
          <span className="progress-pct">{overallProgress}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${overallProgress}%` }}></div>
        </div>
        <div className="progress-labels">
          <span>A1</span><span>A2-B1</span><span>B2</span>
        </div>
      </div>

      <DayTracker
        dayNumber={currentDay}
        phase={phase}
        dayData={days[String(currentDay)]}
        onTaskUpdate={(key, val) => updateTask(currentDay, key, val)}
        onCompleteDay={() => completeDay(currentDay)}
      />

      <Heatmap days={days} currentDay={currentDay} />
    </div>
  );
}

export default Dashboard;
