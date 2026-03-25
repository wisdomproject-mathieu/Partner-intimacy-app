import firestore from '@react-native-firebase/firestore';

/**
 * Generate a couple code: first 2 chars of name (uppercase) + 4 random alphanumeric
 */
function generateCode(name: string): string {
  const prefix = name.substring(0, 2).toUpperCase();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let suffix = '';
  for (let i = 0; i < 4; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return prefix + suffix;
}

/**
 * Create a couple code with Firestore transaction for uniqueness guarantee
 */
export async function createCoupleCode(uid: string, name: string): Promise<string> {
  const db = firestore();
  let code = '';
  let attempts = 0;

  while (attempts < 10) {
    code = generateCode(name);
    const ref = db.collection('couples').doc(code);

    try {
      await db.runTransaction(async (tx) => {
        const doc = await tx.get(ref);
        if (doc.exists) {
          throw new Error('collision');
        }
        tx.set(ref, {
          user1: uid,
          user1Name: name,
          user2: null,
          user2Name: null,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      });

      // Update user doc with couple code
      await db.collection('users').doc(uid).update({
        coupleCode: code,
      });

      return code;
    } catch (e: any) {
      if (e.message === 'collision') {
        attempts++;
        continue;
      }
      throw e;
    }
  }

  throw new Error('Failed to generate unique couple code after 10 attempts');
}

/**
 * Join an existing couple using a code
 */
export async function joinCouple(uid: string, name: string, code: string): Promise<void> {
  const db = firestore();
  const ref = db.collection('couples').doc(code);

  await db.runTransaction(async (tx) => {
    const doc = await tx.get(ref);
    if (!doc.exists) {
      throw new Error('Invalid couple code');
    }
    const data = doc.data()!;
    if (data.user2) {
      throw new Error('This couple code is already paired');
    }
    if (data.user1 === uid) {
      throw new Error('Cannot pair with yourself');
    }

    tx.update(ref, {
      user2: uid,
      user2Name: name,
    });
  });

  // Update both users
  const coupleDoc = await ref.get();
  const data = coupleDoc.data()!;

  await Promise.all([
    db.collection('users').doc(uid).update({
      coupleCode: code,
      partnerId: data.user1,
    }),
    db.collection('users').doc(data.user1).update({
      partnerId: uid,
    }),
  ]);
}
