const firebaseAdmin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const firebaseCreds = JSON.parse(process.env.FIREBASE_CREDENTIAL);
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseCreds),
});

const db = firebaseAdmin.firestore();

async function saveJobs(jobs) {
  const colRef = db.collection('jobs');
  const batch = db.batch();
  const createdAt = firebaseAdmin.firestore.FieldValue.serverTimestamp();

  jobs.forEach((job) => {
    batch.set(colRef.doc(), { ...job, createdAt });
  });

  await batch.commit();
}

async function getJobs({ startAfter, perPage, tag }) {
  const colRef = db.collection('jobs');
  let query = colRef.orderBy('createdAt').limit(perPage);

  if (tag) {
    query = query.where('tags', 'array-contains', tag);
  }

  if (startAfter) {
    const startAfterDoc = await colRef.doc(startAfter).get();
    query = query.startAfter(startAfterDoc);
  }

  const snapshot = await query.get();
  return snapshot.docs.map((currDoc) => ({ ...currDoc.data(), id: currDoc.id }));
}

module.exports = { saveJobs, getJobs };
