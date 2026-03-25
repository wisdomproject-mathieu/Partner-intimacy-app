import { create } from 'zustand';
import firestore from '@react-native-firebase/firestore';

export interface WeatherMood {
  id: string;
  icon: string;
  label: string;
}

interface WeatherEntry {
  mood: string;
  icon: string;
  date: string;
}

interface WeatherState {
  myMood: WeatherEntry | null;
  partnerMood: WeatherEntry | null;
  loading: boolean;

  setMyMood: (mood: WeatherEntry | null) => void;
  setPartnerMood: (mood: WeatherEntry | null) => void;
  setLoading: (loading: boolean) => void;

  submitMood: (coupleCode: string, uid: string, mood: WeatherMood) => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  myMood: null,
  partnerMood: null,
  loading: false,

  setMyMood: (mood) => set({ myMood: mood }),
  setPartnerMood: (mood) => set({ partnerMood: mood }),
  setLoading: (loading) => set({ loading }),

  submitMood: async (coupleCode, uid, mood) => {
    const today = new Date().toISOString().split('T')[0];
    await firestore()
      .collection('couples')
      .doc(coupleCode)
      .collection('realtime')
      .doc('weather')
      .set(
        {
          [uid]: {
            mood: mood.id,
            icon: mood.icon,
            date: today,
          },
        },
        { merge: true }
      );
  },
}));

/**
 * Subscribe to weather real-time updates
 */
export function subscribeToWeather(coupleCode: string, myUid: string, partnerUid: string) {
  return firestore()
    .collection('couples')
    .doc(coupleCode)
    .collection('realtime')
    .doc('weather')
    .onSnapshot((doc) => {
      if (!doc.exists) return;
      const data = doc.data()!;
      const store = useWeatherStore.getState();

      if (data[myUid]) {
        store.setMyMood(data[myUid] as WeatherEntry);
      }
      if (data[partnerUid]) {
        store.setPartnerMood(data[partnerUid] as WeatherEntry);
      }
    });
}
