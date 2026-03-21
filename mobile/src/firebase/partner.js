import {
  doc, setDoc, getDoc, updateDoc,
  collection, query, where, getDocs,
  onSnapshot, serverTimestamp, deleteDoc,
} from 'firebase/firestore'
import { db } from './config.js'
import { state } from '../main.js'

// ── Generate an invite code for the current user ──────────────────────────
// Stored in: invites/{code} → { ownerUid, expiresAt }
export async function generateInviteCode(uid) {
  // Reuse existing unexpired code if one exists
  const existing = await getExistingCode(uid)
  if (existing) return existing

  const code = randomCode()
  const expiresAt = Date.now() + 48 * 60 * 60 * 1000 // 48 h

  await setDoc(doc(db, 'invites', code), {
    ownerUid: uid,
    expiresAt,
    createdAt: serverTimestamp(),
  })

  return code
}

// ── Accept a partner's invite code ───────────────────────────────────────
export async function linkWithCode(myUid, code) {
  const inviteRef  = doc(db, 'invites', code)
  const inviteSnap = await getDoc(inviteRef)

  if (!inviteSnap.exists())              throw new Error('Code not found')
  const { ownerUid, expiresAt } = inviteSnap.data()
  if (Date.now() > expiresAt)            throw new Error('Code has expired')
  if (ownerUid === myUid)               throw new Error("That's your own code!")

  // Link both users to each other
  await Promise.all([
    updateDoc(doc(db, 'users', myUid),    { partnerId: ownerUid }),
    updateDoc(doc(db, 'users', ownerUid), { partnerId: myUid }),
  ])

  // Update local state
  state.user.partnerId = ownerUid

  // Clean up invite
  await deleteDoc(inviteRef)
}

// ── Listen for partner accepting our invite ───────────────────────────────
// Returns an unsubscribe function.
export function listenForPartnerLink(uid, onLinked) {
  const userRef = doc(db, 'users', uid)
  return onSnapshot(userRef, (snap) => {
    const partnerId = snap.data()?.partnerId
    if (partnerId) {
      state.user.partnerId = partnerId
      onLinked(partnerId)
    }
  })
}

// ── Helpers ───────────────────────────────────────────────────────────────
async function getExistingCode(uid) {
  const q    = query(collection(db, 'invites'), where('ownerUid', '==', uid))
  const snap = await getDocs(q)
  for (const d of snap.docs) {
    const { expiresAt, ownerUid } = d.data()
    if (Date.now() < expiresAt && ownerUid === uid) return d.id
  }
  return null
}

function randomCode() {
  const words  = ['MOON','STAR','ROSE','SAGE','DAWN','SOUL','FIRE','MIST','DUSK','LOVE']
  const word   = words[Math.floor(Math.random() * words.length)]
  const digits = String(Math.floor(1000 + Math.random() * 9000))
  return `${word}-${digits}`
}
