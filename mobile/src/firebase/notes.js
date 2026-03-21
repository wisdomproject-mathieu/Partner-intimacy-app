import {
  collection, addDoc, query, where,
  orderBy, onSnapshot, serverTimestamp,
} from 'firebase/firestore'
import { db } from './config.js'

// ── Send a note ───────────────────────────────────────────────────────────
// Stored in: notes/{id} → { fromUid, toUid, text, glyph, color, createdAt, starred }
export async function sendNote(note) {
  await addDoc(collection(db, 'notes'), {
    ...note,
    createdAt: serverTimestamp(),
  })
}

// ── Real-time listener for notes ──────────────────────────────────────────
// isReceived = true  → notes TO me (fromUid == partner, toUid == me)
// isReceived = false → notes FROM me (fromUid == me, toUid == partner)
// Returns unsubscribe function.
export function listenToNotes(toUid, fromUid, isReceived, onUpdate) {
  const notesRef = collection(db, 'notes')

  const q = isReceived
    ? query(
        notesRef,
        where('toUid',   '==', toUid),
        where('fromUid', '==', fromUid),
        orderBy('createdAt', 'desc'),
      )
    : query(
        notesRef,
        where('fromUid', '==', fromUid),
        where('toUid',   '==', toUid),
        orderBy('createdAt', 'desc'),
      )

  return onSnapshot(q, (snap) => {
    const notes = snap.docs.map(d => ({
      id:  d.id,
      ...d.data(),
      // Firestore Timestamp → ms (may be null briefly on optimistic writes)
      createdAt: d.data().createdAt?.toMillis?.() ?? d.data().createdAt ?? null,
    }))
    onUpdate(notes)
  })
}
