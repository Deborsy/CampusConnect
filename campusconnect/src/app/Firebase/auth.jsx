"use client"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from './firebase';
import { login, logout } from '@/lib/features/authSlice';


export const setupAuthListener = (dispatch) => {
    const auth = getAuth(app);
        onAuthStateChanged(
            auth,
            (user) => {
            if (user) {
                if (user.uid) { // Check if user.uid exists
                    console.log('User is logged in:', user);
                    dispatch(login({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL || null,
                }));
            } else {
                console.log('User logged in, but uid not available yet.');
            }
            } else {
                console.log('User is logged out');
                dispatch(logout());
            }
        },
        (error) => {
            console.error('Firebase Auth Error:', error);
        }
    );
};


export const initializeAuthListener = (dispatch) => {
 setupAuthListener(dispatch);
};