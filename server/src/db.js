const firebaseAdmin = require('firebase-admin');
const firebaseServiceAccount = require('../firebase.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
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
  return snapshot.docs.map((doc) => doc.data());
}

module.exports = { saveJobs, getJobs };
