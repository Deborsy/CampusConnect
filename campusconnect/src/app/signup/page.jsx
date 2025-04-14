"use client";
import React, { useState } from 'react';
import { auth, db } from "@/app/Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import '../styles/signup.css';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+234");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true); // Set loading to true

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "Students", user.uid), {
                fullname: fullname,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                phoneNumber: countryCode + phoneNumber,
                uid: user.uid,
            });
            setEmail("");
            setPassword("");
            setFullname("");
            setPhoneNumber("");
            router.push('/student-dashboard');
        } catch (error) {
            console.error("Error creating user:", error);
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage("Email address is already in use.");
            } else if (error.code === 'auth/weak-password') {
                setErrorMessage("Password should be at least 6 characters.");
            } else if (error.code === 'auth/invalid-email') {
                setErrorMessage("Invalid email address.");
            } else {
                setErrorMessage("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    return (
        <>
            <div className="p-3 flex flex-row justify-between items-center w-full h-16 bg-green-800 ">
                <div className="text-white font-bold"><a href="/">CampusConnect</a></div>
            </div>
            <div className='box'>
                <div className="signup-container">
                    <form id="signUpForm" onSubmit={handleSubmit}>
                        <h2>Create an Account</h2>

                        {errorMessage && <p className="error-message text-red-500">{errorMessage}</p>}

                        <div className="input-group">
                            <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} id="name" placeholder="Full Name" required disabled={loading}/>
                        </div>

                        <div className="input-group">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Email" required disabled={loading}/>
                        </div>

                        <div className="input-group">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Password" required disabled={loading}/>
                        </div>

                        <div className="input-group">
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="password" placeholder="Password" required disabled={loading}/>
                        </div>

                        <div className="phone-input">
                            <select id="country-code" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} required disabled={loading}>
                                <option value="+234">🇳🇬 (+234)</option>
                                <option value="+228">🇹🇬 (+228)</option>
                                <option value="+233">🇬🇭 (+233)</option>
                                <option value="+227">🇳🇪 (+227)</option>
                                <option value="+27">🇿🇦 (+27)</option>
                                <option value="+218">🇱🇾 (+218)</option>
                            </select>
                            <input id="phone-number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="tel" pattern="[0-9]{10}" placeholder="10-digit phone number" required disabled={loading}/>
                        </div>

                        <div className="input-group">
                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? "Signing up..." : "Sign Up"}
                            </button>
                        </div>

                        <p id="message"></p>

                        <div className="signin-link">
                            <p>Already have an account? <a href="/">Login here</a></p>
                        </div>

                        <div className="signin-link">
                            <p>Are you an Admin? <a href="/admin-signup">Signup here</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;