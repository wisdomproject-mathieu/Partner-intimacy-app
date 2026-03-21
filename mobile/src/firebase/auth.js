import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './config.js'

// ── Sign in with email/password ───────────────────────────────────────────
export async function signInWithEmail(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return buildUserProfile(cred.user)
}

// ── Sign in with Google ───────────────────────────────────────────────────
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  const cred = await signInWithPopup(auth, provider)
  return buildUserProfile(cred.user)
}

// ── Sign out ──────────────────────────────────────────────────────────────
export async function signOut() {
  await fbSignOut(auth)
}

// ── Get current session (resolves once auth state is known) ───────────────
export function getSession() {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      unsub()
      if (!fbUser) { resolve(null); return }
      resolve(await buildUserProfile(fbUser))
    })
  })
}

// ── Subscribe to auth changes ─────────────────────────────────────────────
export function onSessionChange(callback) {
  return onAuthStateChanged(auth, async (fbUser) => {
    if (!fbUser) { callback(null); return }
    callback(await buildUserProfile(fbUser))
  })
}

// ── Build / update user doc in Firestore ─────────────────────────────────
async function buildUserProfile(fbUser) {
  const ref     = doc(db, 'users', fbUser.uid)
  const snap    = await getDoc(ref)
  const stored  = snap.exists() ? snap.data() : {}

  if (!snap.exists()) {
    await setDoc(ref, {
      uid:         fbUser.uid,
      email:       fbUser.email || '',
      displayName: fbUser.displayName || '',
      photoURL:    fbUser.photoURL || '',
      partnerId:   null,
      createdAt:   serverTimestamp(),
    })
  }

  return {
    uid:         fbUser.uid,
    email:       fbUser.email || '',
    displayName: fbUser.displayName || stored.displayName || '',
    photoURL:    fbUser.photoURL   || stored.photoURL    || '',
    partnerId:   stored.partnerId  || null,
  }
}
