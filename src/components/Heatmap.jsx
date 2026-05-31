function Heatmap({ days, currentDay }) {
  const totalDays = 168;
  const cells = [];

  for (let i = 1; i <= totalDays; i++) {
    const dayData = days[String(i)];
    let status = 'future';
    if (i < currentDay) {
      status = dayData?.completed ? 'completed' : 'missed';
    } else if (i === currentDay) {
      status = 'current';
    }
    cells.push({ day: i, status });
  }

  const getColor = (status) => {
    switch (status) {
      case 'completed': return 'var(--success)';
      case 'missed': return '#3a1a1a';
      case 'current': return 'var(--accent-gold)';
      default: return 'var(--bg-card)';
    }
  };

  const weeks = [];
  for (let w = 0; w < 24; w++) {
    weeks.push(cells.slice(w * 7, w * 7 + 7));
  }

  return (
    <div className="heatmap">
      <h3>Kalender Fortschritt</h3>
      <div className="heatmap-legend">
        <span><span className="legend-dot" style={{background:'var(--success)'}}></span> Abgeschlossen</span>
        <span><span className="legend-dot" style={{background:'var(--accent-gold)'}}></span> Heute</span>
        <span><span className="legend-dot" style={{background:'#3a1a1a'}}></span> Verpasst</span>
        <span><span className="legend-dot" style={{background:'var(--bg-card)'}}></span> Zukunft</span>
      </div>
      <div className="heatmap-grid">
        {weeks.map((week, wi) => (
          <div key={wi} className="heatmap-week">
            <span className="heatmap-week-label">W{wi + 1}</span>
            <div className="heatmap-week-cells">
              {week.map(cell => (
                <div
                  key={cell.day}
                  className="heatmap-cell"
                  style={{ background: getColor(cell.status) }}
                  title={`Tag ${cell.day} — ${cell.status === 'completed' ? 'Abgeschlossen' : cell.status === 'missed' ? 'Verpasst' : cell.status === 'current' ? 'Heute' : 'Ausstehend'}`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Heatmap;
