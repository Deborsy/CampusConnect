"use client";
import React, { useState } from 'react';
import { db } from '@/app/Firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

const NotificationForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const notificationsCollectionRef = collection(db, 'notifications');
      await addDoc(notificationsCollectionRef, {
        title: title,
        message: message,
        timestamp: new Date(), // Add a timestamp for ordering
      });
      setTitle('');
      setMessage('');
      setSuccessMessage('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      setErrorMessage('Failed to send notification. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className='p-12'>
        <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Send New Notification</h2>
            {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-3">{successMessage}</div>}
            {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                    Title:
                </label>
                <input
                    type="text"
                    id="title"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    disabled={sending}
                />
                </div>
                <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                    Message:
                </label>
                <textarea
                    id="message"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    required
                    disabled={sending}
                ></textarea>
                </div>
                <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={sending}
                >
                    {sending ? 'Sending...' : 'Send Notification'}
                </button>
                </div>
            </form>
            </div>
    </div>
  );
};

export default NotificationForm;