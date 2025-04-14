"use client";

import { initializeAuthListener } from '@/app/Firebase/auth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    initializeAuthListener(dispatch);
  }, [dispatch]);

  return null; // This component doesn't render anything
}