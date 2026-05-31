import { useState, useEffect } from 'react';
import {
  doc, getDoc, setDoc, collection,
  getDocs, updateDoc, serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase.js';

export function useProgress(uid) {
  const [userData, setUserData] = useState(null);
  const [days, setDays] = useState({});
  const [loading, setLoading] = useState(true);

  const userRef = doc(db, 'users', uid);

  const fetchData = async () => {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      setUserData(snap.data());
    }
    const daysSnap = await getDocs(collection(db, 'users', uid, 'days'));
    const daysMap = {};
    daysSnap.forEach(d => { daysMap[d.id] = d.data(); });
    setDays(daysMap);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [uid]);

  const setStartDate = async (date) => {
    await setDoc(userRef, { startDate: date, currentDay: 1, streak: 0 }, { merge: true });
    await fetchData();
  };

  const updateTask = async (dayNumber, taskKey, value) => {
    const dayRef = doc(db, 'users', uid, 'days', String(dayNumber));
    const snap = await getDoc(dayRef);
    if (snap.exists()) {
      await updateDoc(dayRef, { [`tasks.${taskKey}`]: value });
    } else {
      await setDoc(dayRef, {
        date: serverTimestamp(),
        completed: false,
        tasks: { [taskKey]: value }
      });
    }
    await fetchData();
  };

  const completeDay = async (dayNumber) => {
    const dayRef = doc(db, 'users', uid, 'days', String(dayNumber));
    const snap = await getDoc(dayRef);
    const existing = snap.exists() ? snap.data() : {};
    await setDoc(dayRef, { ...existing, completed: true, date: serverTimestamp() }, { merge: true });
    const newDay = Math.min(dayNumber + 1, 168);
    const newStreak = (userData?.streak || 0) + 1;
    await updateDoc(userRef, { currentDay: newDay, streak: newStreak });
    await fetchData();
  };

  const getPhase = (dayNumber) => {
    if (dayNumber <= 56) return 1;
    if (dayNumber <= 112) return 2;
    return 3;
  };

  const getWeek = (dayNumber) => Math.ceil(dayNumber / 7);

  const getLevel = (phase) => {
    if (phase === 1) return 'A1';
    if (phase === 2) return 'A2-B1';
    return 'B2';
  };

  const getStreakCount = () => {
    let streak = 0;
    const currentDay = userData?.currentDay || 1;
    for (let i = currentDay - 1; i >= 1; i--) {
      if (days[String(i)]?.completed) streak++;
      else break;
    }
    return streak;
  };

  const getWeeklyProgress = () => {
    const currentDay = userData?.currentDay || 1;
    const weekStart = Math.floor((currentDay - 1) / 7) * 7 + 1;
    let completed = 0;
    let total = 0;
    for (let i = weekStart; i < weekStart + 7 && i <= 168; i++) {
      total++;
      if (days[String(i)]?.completed) completed++;
    }
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return {
    userData, days, loading,
    setStartDate, updateTask, completeDay,
    getPhase, getWeek, getLevel, getStreakCount, getWeeklyProgress
  };
}
