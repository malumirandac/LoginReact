import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = 'session';

export async function saveSessionToStorage(user: { id: string; email: string; token: string }) {
  try { await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user)); }
  catch (e) { console.log('saveSessionToStorage error', e); }
}

export async function loadSessionFromStorage() {
  try {
    const raw = await AsyncStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { console.log('loadSessionFromStorage error', e); return null; }
}

export async function clearSessionFromStorage() {
  try { await AsyncStorage.removeItem(SESSION_KEY); }
  catch (e) { console.log('clearSessionFromStorage error', e); }
}