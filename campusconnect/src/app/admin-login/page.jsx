"use client";
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaGoogle, FaApple } from 'react-icons/fa';
import { auth, googleProvider } from "@/app/Firebase/firebase";
import { signInWithPopup, OAuthProvider } from "firebase/auth";
import { useRouter } from 'next/navigation';
import '../styles/signin.css';
import { useDispatch } from 'react-redux';
import { login } from '@/lib/features/authSlice'; // Import login action

const adminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const router = useRouter();

    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Set loading to true
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/admin-dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Set loading to false
        }
    };
    
    const handleGoogleSignIn = async () => {
        try {
          const userCredential = await signInWithPopup(auth, googleProvider);
          const user = userCredential.user;
          dispatch(login({ // Dispatch login action with user data
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }));
          router.push('/admin-dashboard');
        } catch (err) {
          setError(err.message);
        }
      };

      const handleAppleSignIn = async () => {
        try {
          const appleProvider = new OAuthProvider('apple.com');
          const userCredential = await signInWithPopup(auth, appleProvider);
          const user = userCredential.user;
          dispatch(login({ // Dispatch login action with user data
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }));
          router.push('/admin-dashboard');
        } catch (err) {
          setError(err.message);
        }
      };
  return (
    <>
        <div className="p-3 flex flex-row justify-between items-center w-full h-16 bg-green-800 ">
            <div className="text-white font-bold"><a href="/">CampusConnect</a></div>
        </div>
        <div className="box">
            <div className="container">
                <div className="signin-form">
                  <h1>Welcome Back!</h1>
                  <p className="subtitle">Sign in to your Admin account</p>

                  <form onSubmit={handleEmailSignIn} id="signInForm">
                    {error && <p className="error-message">{error}</p>}
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        placeholder="Enter your email"
                        required
                        disabled={loading} // Disable input when loading
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        placeholder="Enter your password"
                        required
                        disabled={loading} // Disable input when loading
                    />

                    <div className="form-footer">
                        <a href="/forgotpassword" id="forgotPassword">
                            Forgot Password?
                        </a>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                  <div className="divider">OR</div>

                  <div className="social-buttons">
                    <button className='social-btn google' onClick={handleGoogleSignIn}>
                      <FaGoogle size={20} color='red' />
                      <span style={{ marginLeft: '.5em' }}>Sign in with Google</span>
                    </button>

                    <button className='social-btn apple' onClick={handleAppleSignIn}>
                      <FaApple size={20} />
                      <span style={{ marginLeft: '.5em' }}>Sign in with Apple</span>
                    </button>
                  </div>

                  {error && <p className="error-message">{error}</p>}

                  <p className="signup-link">
                    Don't have an account? <a href="/admin-signup" id="signUpLink">Sign up here</a>
                  </p>
                  <p className="signup-link">
                    Are you a student? <a href="/" id="signUpLink">Login here</a>
                  </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default adminLogin