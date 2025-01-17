import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc, 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB0uI7TNtjQSWDI6x5O2kI_GEVyLvT3TyU",
  authDomain: "geometry-3d-explorer.firebaseapp.com",
  projectId: "geometry-3d-explorer",
  storageBucket: "geometry-3d-explorer.firebasestorage.app",
  messagingSenderId: "777249788173",
  appId: "1:777249788173:web:3f890c996a9b23ac442044"
};

// Initialize Firebase if not already initialized
let app;
let auth;
let db;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
    db = getFirestore(app);
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

// Menyimpan hasil quiz
export const saveQuizResult = async (userId, result) => {
  try {
    // Pastikan userEmail ada
    if (!result.userEmail) {
      console.error('User email is required');
      return false;
    }

    const userEmail = result.userEmail;
    const now = new Date().toISOString();

    // Reference ke dokumen user
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      // Update user yang sudah ada
      await updateDoc(userRef, {
        email: userEmail, // Tambahkan ini untuk memastikan email selalu ada
        quizHistory: [...(userDoc.data().quizHistory || []), result],
        'stats.totalQuizzes': (userDoc.data().stats?.totalQuizzes || 0) + 1,
        'stats.bestScore': Math.max(userDoc.data().stats?.bestScore || 0, result.score),
        lastUpdated: now
      });
    } else {
      // Buat user baru
      await setDoc(userRef, {
        email: userEmail,
        createdAt: now,
        lastUpdated: now,
        quizHistory: [result],
        stats: {
          totalQuizzes: 1,
          bestScore: result.score
        }
      });
    }

    // Update leaderboard
    const leaderboardRef = doc(db, 'leaderboard', userId);
    const leaderboardDoc = await getDoc(leaderboardRef);
    const currentBestScore = leaderboardDoc.exists() ? leaderboardDoc.data().bestScore : 0;

    const leaderboardData = {
      userId,
      email: userEmail,
      bestScore: Math.max(result.score, currentBestScore),
      totalQuizzes: userDoc.exists() ? 
        (userDoc.data().stats?.totalQuizzes || 1) : 1,
      lastUpdated: now
    };

    if (!leaderboardDoc.exists() || result.score > currentBestScore) {
      await setDoc(leaderboardRef, leaderboardData);
    } else {
      await updateDoc(leaderboardRef, {
        totalQuizzes: leaderboardData.totalQuizzes,
        lastUpdated: now
      });
    }

    return true;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    return false;
  }
};

// Mendapatkan leaderboard
export const getLeaderboard = async (limitCount = 10) => {
  try {
    const leaderboardRef = collection(db, 'leaderboard');
    const q = query(
      leaderboardRef,
      orderBy('bestScore', 'desc'),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
};

// Mendapatkan riwayat quiz user
export const getUserQuizHistory = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data().quizHistory || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching quiz history:", error);
    return [];
  }
};

// Mendapatkan statistik user
export const getUserStats = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data().stats || {};
    }
    return null;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return null;
  }
};

export { auth, db };