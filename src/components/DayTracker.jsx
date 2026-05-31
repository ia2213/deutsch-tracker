const TASKS = {
  1: [
    { key: 'anki_reviews', label: 'Anki Reviews', duration: '25 min', link: 'https://apps.ankiweb.net/' },
    { key: 'anki_new', label: 'Anki New Cards — German Core 2000', duration: '25 min', link: 'https://ankiweb.net/shared/info/1243825960' },
    { key: 'grammar_study', label: 'Grammar Study — Menschen A1', duration: '40 min', link: 'https://www.hueber.de/menschen' },
    { key: 'grammar_drills', label: 'Grammar Drills — Lingolia.de', duration: '30 min', link: 'https://deutsch.lingolia.com/' },
    { key: 'listening', label: 'Listening — DW Nicos Weg', duration: '30 min', link: 'https://www.dw.com/de/deutsch-lernen/nicos-weg/s-52684' },
    { key: 'output', label: 'Output — Journal entry (5 Sätze)', duration: '30 min', link: null },
    { key: 'immersion', label: 'Immersion — Easy German (passiv)', duration: '30 min', link: 'https://www.youtube.com/@EasyGerman' },
  ],
  2: [
    { key: 'anki_reviews', label: 'Anki Reviews', duration: '25 min', link: 'https://apps.ankiweb.net/' },
    { key: 'anki_new', label: 'Anki New Cards — 4000 Words by Frequency', duration: '25 min', link: 'https://ankiweb.net/shared/info/1107259680' },
    { key: 'grammar_study', label: 'Grammar Study — Aspekte A2/B1', duration: '40 min', link: 'https://www.klett-sprachen.de/aspekte-neu/r-1/248' },
    { key: 'grammar_drills', label: 'Grammar Drills — Clozemaster', duration: '30 min', link: 'https://www.clozemaster.com/' },
    { key: 'reading', label: 'Reading — Graded Readers', duration: '30 min', link: 'https://www.hueber.de/lektueren' },
    { key: 'listening', label: 'Listening — DW Langsam gesprochene Nachrichten', duration: '30 min', link: 'https://www.dw.com/de/deutsch-lernen/nachrichten/s-8030' },
    { key: 'output', label: 'Output — iTalki / Tandem / Journal', duration: '30 min', link: 'https://www.italki.com/' },
    { key: 'shadowing', label: 'Shadowing — Easy German (bekannte Clips)', duration: '20 min', link: 'https://www.youtube.com/@EasyGerman' },
  ],
  3: [
    { key: 'anki_reviews', label: 'Anki Reviews', duration: '25 min', link: 'https://apps.ankiweb.net/' },
    { key: 'anki_new', label: 'Anki New Cards — Refold DE deck', duration: '25 min', link: 'https://refold.la/' },
    { key: 'grammar_study', label: 'Grammar Study — Goethe B2 Modellsätze', duration: '40 min', link: 'https://www.goethe.de/de/spr/kup/prf/prf/b2/vob.html' },
    { key: 'reading', label: 'Reading — Spiegel / Zeit / Nachrichtenleicht', duration: '30 min', link: 'https://www.nachrichtenleicht.de/' },
    { key: 'listening', label: 'Listening — Dark (Netflix) / DW News', duration: '30 min', link: 'https://www.dw.com/de/themen/s-9077' },
    { key: 'essay', label: 'Essay Writing — Timed (30 min)', duration: '30 min', link: null },
    { key: 'shadowing', label: 'Shadowing — DW Radio clips', duration: '20 min', link: 'https://www.dw.com/de/themen/s-9077' },
    { key: 'exam_drills', label: 'Exam Drills — Goethe B2 past papers', duration: '30 min', link: 'https://www.goethe.de/de/spr/kup/prf/prf/b2/vob.html' },
  ],
};

function DayTracker({ dayNumber, phase, dayData, onTaskUpdate, onCompleteDay }) {
  const tasks = TASKS[phase] || TASKS[1];
  const taskValues = dayData?.tasks || {};
  const isCompleted = dayData?.completed || false;

  const completedCount = tasks.filter(t => taskValues[t.key]).length;
  const allDone = completedCount === tasks.length;

  return (
    <div className="day-tracker">
      <div className="day-header">
        <h2>Tag {dayNumber} / 168</h2>
        <span className="day-phase">Phase {phase}</span>
        {isCompleted && <span className="day-done-badge">✅ Abgeschlossen</span>}
      </div>
      <div className="tasks-progress">
        <div className="tasks-progress-bar">
          <div
            className="tasks-progress-fill"
            style={{ width: `${(completedCount / tasks.length) * 100}%` }}
          ></div>
        </div>
        <span className="tasks-count">{completedCount}/{tasks.length} Aufgaben</span>
      </div>
      <div className="tasks-list">
        {tasks.map(task => (
          <label key={task.key} className={`task-item ${taskValues[task.key] ? 'task-checked' : ''} ${isCompleted ? 'task-disabled' : ''}`}>
            <input
              type="checkbox"
              checked={!!taskValues[task.key]}
              onChange={(e) => !isCompleted && onTaskUpdate(task.key, e.target.checked)}
              disabled={isCompleted}
            />
            <div className="task-info">
              <span className="task-label">
                {task.link ? (
                  <a href={task.link} target="_blank" rel="noopener noreferrer">{task.label}</a>
                ) : task.label}
              </span>
              <span className="task-duration">{task.duration}</span>
            </div>
          </label>
        ))}
      </div>
      {!isCompleted && (
        <button
          className={`complete-day-btn ${allDone ? 'complete-day-ready' : ''}`}
          onClick={onCompleteDay}
        >
          ✅ Tag abschließen
        </button>
      )}
    </div>
  );
}

export default DayTracker;
