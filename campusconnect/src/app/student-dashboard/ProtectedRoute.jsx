"use client";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const router = useRouter();
  const [firebaseAuthChecked, setFirebaseAuthChecked] = useState(false); // Add check state
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseAuthChecked(true); // Firebase auth check complete
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  useEffect(() => {
    console.log("ProtectedRoute: isAuthenticated (render):", isAuthenticated);

    if (firebaseAuthChecked && !isAuthenticated && !redirected) { 
      // Check Firebase and Redux
      router.push('/');
      setRedirected(true);
    }
  }, [isAuthenticated, router, firebaseAuthChecked]);

  if (!isAuthenticated || !firebaseAuthChecked) { 
    // Prevent rendering until check is complete
    return null;
  }

  console.log("ProtectedRoute: Rendering children");
  return children;
};

export default ProtectedRoute;