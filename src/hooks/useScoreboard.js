import { useState, useCallback, useMemo } from 'react';
import { initialScoreboardState } from '../data/scoreboardData';

export const useScoreboard = () => {
  const [history, setHistory] = useState([initialScoreboardState]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const currentScoreboard = useMemo(() => history[currentIndex], [history, currentIndex]);

  const updateScoreboard = useCallback((updater) => {
    setHistory((prevHistory) => {
      const current = prevHistory[currentIndex];
      const nextState = typeof updater === 'function' ? updater(current) : updater;
      
      const newHistory = prevHistory.slice(0, currentIndex + 1);
      newHistory.push(nextState);
      
      return newHistory;
    });
    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex]);

  const updateMatch = useCallback((index, matchUpdater) => {
    updateScoreboard((prev) => {
      const newMatches = [...prev.matches];
      const match = newMatches[index];
      const nextMatch = typeof matchUpdater === 'function' ? matchUpdater(match) : { ...match, ...matchUpdater };
      
      // Auto highlight winner logic
      if (nextMatch.full1 !== '' && nextMatch.full2 !== '') {
        const s1 = parseInt(nextMatch.full1, 10) || 0;
        const s2 = parseInt(nextMatch.full2, 10) || 0;
        if (s1 > s2 && nextMatch.team1) {
          nextMatch.winner = nextMatch.team1;
        } else if (s2 > s1 && nextMatch.team2) {
          nextMatch.winner = nextMatch.team2;
        } else if (s1 === s2) {
          nextMatch.winner = 'TIE';
        } else {
          nextMatch.winner = '';
        }
      } else {
        nextMatch.winner = '';
      }

      newMatches[index] = nextMatch;
      return { ...prev, matches: newMatches };
    });
  }, [updateScoreboard]);

  const undo = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const redo = useCallback(() => {
    setCurrentIndex((prev) => Math.min(history.length - 1, prev + 1));
  }, [history.length]);

  const resetForm = useCallback(() => {
    updateScoreboard(initialScoreboardState);
  }, [updateScoreboard]);

  const handleZoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.1, 2)), []);
  const handleZoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.1, 0.2)), []);
  const resetZoom = useCallback(() => setZoom(1), []);

  const addMatch = useCallback(() => {
    updateScoreboard((prev) => {
      const newIndex = prev.matches.length;
      const newMatch = {
        id: `match${Date.now()}`,
        time: '10:00 AM',
        court: `COURT ${newIndex % 2 === 0 ? 1 : 2}`,
        team1: '',
        team2: '',
        half1: '',
        half2: '',
        full1: '',
        full2: '',
        winner: ''
      };
      return { ...prev, matches: [...prev.matches, newMatch] };
    });
  }, [updateScoreboard]);

  const removeMatch = useCallback(() => {
    updateScoreboard((prev) => {
      if (prev.matches.length === 0) return prev;
      return { ...prev, matches: prev.matches.slice(0, -1) };
    });
  }, [updateScoreboard]);

  return {
    scoreboard: currentScoreboard,
    updateScoreboard,
    updateMatch,
    addMatch,
    removeMatch,
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
    resetForm,
    zoom,
    handleZoomIn,
    handleZoomOut,
    resetZoom,
  };
};
