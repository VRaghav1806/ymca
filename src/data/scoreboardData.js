export const initialScoreboardState = {
  year: '2026',
  title: 'BASKETBALL CHAMPIONSHIP',
  subtitle: 'FINALS',
  venue: 'YMCA ARENA',
  category: 'MEN OPEN',
  date: 'OCT 24, 2026',
  matches: Array.from({ length: 6 }, (_, i) => ({
    id: `match${i + 1}`,
    time: '10:00 AM',
    court: `COURT ${i % 2 === 0 ? 1 : 2}`,
    team1: '',
    team2: '',
    half1: '',
    half2: '',
    full1: '',
    full2: '',
    winner: ''
  }))
};
