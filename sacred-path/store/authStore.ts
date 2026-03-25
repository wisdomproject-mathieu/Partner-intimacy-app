import { create } from 'zustand';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  coupleCode: string | null;
  partnerId: string | null;
}

interface AuthState {
  user: FirebaseAuthTypes.User | null;
  profile: UserProfile | null;
  loading: boolean;
  initialized: boolean;

  setUser: (user: FirebaseAuthTypes.User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: () => void;
  signOut: () => Promise<void>;

  // Computed
  isSignedIn: boolean;
  isPaired: boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  initialized: false,

  get isSignedIn() {
    return get().user !== null;
  },

  get isPaired() {
    return get().profile?.partnerId != null;
  },

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  setInitialized: () => set({ initialized: true, loading: false }),

  signOut: async () => {
    await auth().signOut();
    set({ user: null, profile: null });
  },
}));

/**
 * Initialize auth state listener — call once in root layout
 */
export function initAuthListener() {
  const unsubAuth = auth().onAuthStateChanged(async (user) => {
    const store = useAuthStore.getState();
    store.setUser(user);

    if (user) {
      // Listen to user profile
      const unsubProfile = firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot((doc) => {
          if (doc.exists) {
            const data = doc.data()!;
            useAuthStore.getState().setProfile({
              uid: user.uid,
              name: data.name || '',
              email: data.email || user.email || '',
              coupleCode: data.coupleCode || null,
              partnerId: data.partnerId || null,
            });
          }
          useAuthStore.getState().setInitialized();
        });

      return () => unsubProfile();
    } else {
      store.setProfile(null);
      store.setInitialized();
    }
  });

  return unsubAuth;
}
