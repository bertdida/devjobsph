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

async function getJobs() {
  const colRef = db.collection('jobs');
  const snapshot = await colRef.get();
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

module.exports = { saveJobs, getJobs };
