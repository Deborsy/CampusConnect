"use client";

import React, { useState, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '@/app/Firebase/config';
import Loader from '../../components/Loader';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Use string | null
    const [fullname, setFullname] = useState('');
    const [completedChallenges, setCompletedChallenges] = useState([]);

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser(currentUser);
            setDisplayName(currentUser.displayName || '');
            setEmail(currentUser.email || '');
            fetchFirestoreData(currentUser.uid);
        } else {
            setLoading(false); // Set loading to false when no user
        }

    }, []);

    const fetchFirestoreData = async () => { // Add type to uid
        try {
            const userDoc = doc(db, 'Students', uid);
            const docSnap = await getDoc(userDoc);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setFullname(userData.fullname || '');
                setPhoneNumber(userData.phoneNumber || '');
            } else {
                setError('Profile data not found in Firestore.');
            }
        } catch (err) {
            setError('Error fetching profile data: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
        setIsChanged(true);
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        setError(null);

        try {
            if (user) {
                await updateProfile(user, {
                    displayName: displayName,
                });
                if (user.email !== email) {
                    await user.updateEmail(email);
                }

                await updateDoc(doc(db, 'Students', user.uid), {
                    fullname: fullname,
                    phoneNumber: phoneNumber,
                });
                setIsChanged(false);
            }
        } catch (err) {
            setError('Failed to update profile: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const isSaveDisabled = () => {
        return loading || !isChanged;
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="error">{error}</div>; // Use the className directly
    }

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="profileContainer"> {/* Use the className directly */}
            <div className="profileHeader"> {/* Use the className directly */}
                <div>
                    <h2>Welcome, {fullname || displayName || email}</h2>
                </div>
            </div>

            <div className="infoSection"> {/* Use the className directly */}
                {/* Add info section content if needed */}
            </div>

            <div className="formSection"> {/* Use the className directly */}
                <div className="inputGroup"> {/* Use the className directly */}
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        value={fullname}
                        onChange={(e) => handleInputChange(e, setFullname)}
                        placeholder="Full Name"
                    />
                </div>

                <div className="inputGroup"> {/* Use the className directly */}
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => handleInputChange(e, setEmail)}
                        placeholder="Email"
                    />
                </div>

                <div className="inputGroup"> {/* Use the className directly */}
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => handleInputChange(e, setPhoneNumber)}
                        placeholder="Phone Number"
                    />
                </div>

                <div className="buttonGroup"> {/* Use the className directly */}
                    <button className="cancelButton">Cancel</button> {/* Use the className directly */}
                    <button
                        className="saveButton" {/* Use the className directly */}
                        onClick={handleUpdateProfile}
                        disabled={isSaveDisabled()}
                    >
                        {loading ? 'Updating...' : 'Save changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
