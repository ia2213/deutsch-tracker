const RESOURCES = [
  // TIER 1 - Essential
  { name: 'Anki', category: 'SRS', tier: 1, free: true, url: 'https://apps.ankiweb.net', desc: 'Spaced repetition flashcards. Use German Core 2000 & 4000 Words decks. Enable FSRS algorithm.' },
  { name: 'Deutschegrammatik20', category: 'Grammar', tier: 1, free: true, url: 'https://deutschegrammatik20.de', desc: 'Most comprehensive free German grammar reference online.' },
  { name: 'DW Nicos Weg', category: 'Course', tier: 1, free: true, url: 'https://learngerman.dw.com', desc: 'Story-based A1-B2 course. Video + exercises. Follow Nico to Germany.' },
  { name: 'Easy German', category: 'YouTube', tier: 1, free: true, url: 'https://www.youtube.com/@EasyGerman', desc: 'Street interviews with dual subtitles. Authentic German.' },
  { name: 'iTalki', category: 'Speaking', tier: 1, free: false, price: '$8-15/hr', url: 'https://www.italki.com', desc: 'Book community tutors for conversation practice.' },
  { name: 'dict.cc', category: 'Dictionary', tier: 1, free: true, url: 'https://www.dict.cc', desc: 'Best German-English dictionary with usage notes and examples.' },
  { name: 'Leo.org', category: 'Dictionary', tier: 1, free: true, url: 'https://www.leo.org', desc: 'Nuanced usage + native speaker forum discussions.' },
  { name: 'Lingolia German', category: 'Grammar', tier: 1, free: true, url: 'https://deutsch.lingolia.com', desc: 'Targeted grammar exercises with immediate feedback.' },
  { name: 'Clozemaster', category: 'Practice', tier: 1, free: true, url: 'https://www.clozemaster.com', desc: 'Fill-in-the-blank sentences for intermediate learners.' },

  // TIER 2 - Supporting
  { name: 'Menschen A1-B1', category: 'Textbook', tier: 2, free: false, price: '€25-30', url: 'https://www.hueber.de/menschen', desc: 'Standard structured curriculum textbook.' },
  { name: 'Aspekte Neu B1+/B2', category: 'Textbook', tier: 2, free: false, price: '€30', url: 'https://www.klett-sprachen.de/aspekte-neu', desc: 'Intensive B2 preparation textbook.' },
  { name: 'Hammer\'s German Grammar', category: 'Reference', tier: 2, free: false, price: '€40', url: 'https://www.routledge.com', desc: 'Definitive English-language German grammar guide.' },
  { name: 'Slow German', category: 'Podcast', tier: 2, free: true, url: 'https://www.slowgerman.com', desc: 'Transcribed articles on culture and history for A2-B1.' },
  { name: 'Coffee Break German', category: 'Podcast', tier: 2, free: true, url: 'https://coffeebreaklanguages.com/coffeebreakgerman/', desc: 'Audio lessons for all levels A1-B2.' },
  { name: 'Tandem', category: 'Exchange', tier: 2, free: true, url: 'https://www.tandem.net', desc: 'Peer-to-peer language exchange app.' },
  { name: 'HelloTalk', category: 'Exchange', tier: 2, free: true, url: 'https://www.hellotalk.com', desc: 'Social app with built-in correction tools.' },
  { name: 'Forvo', category: 'Pronunciation', tier: 2, free: true, url: 'https://forvo.com', desc: 'Native speaker audio database for specific words.' },
  { name: 'DW Langsam', category: 'Listening', tier: 2, free: true, url: 'https://www.dw.com/de/deutsch-lernen/nachrichten/s-8030', desc: 'Daily news spoken slowly with transcripts for A2-B1.' },
  { name: 'Nachrichtenleicht', category: 'Reading', tier: 2, free: true, url: 'https://www.nachrichtenleicht.de', desc: 'Simplified weekly news reports at A2-B1 level.' },
  { name: 'Der Spiegel', category: 'Reading', tier: 2, free: true, url: 'https://www.spiegel.de', desc: 'Mainstream news for B1+ exposure.' },
  { name: 'ZDF Mediathek', category: 'TV', tier: 2, free: true, url: 'https://www.zdf.de', desc: 'Public German TV and documentaries with subtitles.' },
  { name: 'Glossika', category: 'Shadowing', tier: 2, free: false, price: '$30/mo', url: 'https://ai.glossika.com', desc: 'Structured audio for speaking rhythm and intonation.' },

  // TIER 3 - Advanced
  { name: 'Zeit Online', category: 'Reading', tier: 3, free: true, url: 'https://www.zeit.de', desc: 'Analytical news and cultural features for B2.' },
  { name: 'Goethe Institut', category: 'Exam Prep', tier: 3, free: true, url: 'https://www.goethe.de/de/spr/kup/prf/prf/b2/vob.html', desc: 'Official B2 practice exams (Modellsätze).' },
  { name: 'Dark', category: 'Film', tier: 3, free: false, price: 'Netflix', url: 'https://www.netflix.com', desc: 'High-level sci-fi series for immersion (use German subtitles).' },
  { name: 'Hueber Lektüren', category: 'Reading', tier: 3, free: false, price: '€8-12', url: 'https://www.hueber.de/lektueren', desc: 'Graded readers - adapted novels for learners.' },
  { name: 'Comprehensible German', category: 'YouTube', tier: 3, free: true, url: 'https://www.youtube.com/@ComprehensibleGerman', desc: 'Input-based lessons for B1/B2 using comprehension hypothesis.' },
  { name: 'German Frequency Dictionary', category: 'Vocabulary', tier: 3, free: false, price: '€15', url: 'https://mostusedwords.com', desc: 'Systematic 10k word list ranked by frequency.' },
];

function Resources() {
  const categories = [...new Set(RESOURCES.map(r => r.category))];
  const tiers = [1, 2, 3];

  const getByTier = (tier) => RESOURCES.filter(r => r.tier === tier);
  const getByCategory = (cat) => RESOURCES.filter(r => r.category === cat);

  return (
    <div className="resources">
      <h2 className="resources-title">📚 Ressourcen</h2>
      <p className="resources-subtitle">Alle Tools, Apps und Websites aus dem Ultimate Zero → B2 Guide</p>

      {tiers.map(tier => (
        <div key={tier} className="resources-tier">
          <div className="resources-tier-header">
            <span className="resources-tier-label">
              Tier {tier} — {tier === 1 ? 'Essentiel (Tag 1)' : tier === 2 ? 'Support' : 'Fortgeschritten'}
            </span>
            <span className="resources-tier-count">{getByTier(tier).length} ressources</span>
          </div>
          <div className="resources-grid">
            {getByTier(tier).map(resource => (
              <a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
              >
                <div className="resource-header">
                  <span className="resource-name">{resource.name}</span>
                  <div className="resource-badges">
                    <span className="resource-category">{resource.category}</span>
                    {resource.free ? (
                      <span className="resource-badge free">GRATIS</span>
                    ) : (
                      <span className="resource-badge paid">{resource.price}</span>
                    )}
                  </div>
                </div>
                <p className="resource-desc">{resource.desc}</p>
              </a>
            ))}
          </div>
        </div>
      ))}

      <div className="resources-footer">
        <p>💡 <strong>Tipp:</strong> Beginne mit allen Tier 1 Ressourcen. Füge Tier 2/3 hinzu, wenn du A2+ erreichst.</p>
        <p>❌ <strong>Vermeide:</strong> Duolingo (Fortschrittsillusion), Google Translate für ganze Sätze.</p>
      </div>
    </div>
  );
}

export default Resources;
