

import '../css/signIn.css';
import { useNavigate } from 'react-router-dom';
//import { auth } from '../firebase/auth'; // adjust path if needed
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !email.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }

    if (!password || password.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    // TODO: Firebase email/password sign-in logic here
    navigate('/products');
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google Sign-In successful:', user);
      navigate('/products');
    } catch (error) {
      console.error('Google Sign-In error:', error.message);
      alert('Google Sign-In failed. Please try again.');
    }
  };

  return (
    <div className="signInContainer">
      <form onSubmit={handleSignIn}>
        <div className="signInForm">
          <div className="signInHeading">
            <h2>Sign In</h2>
            <h4>Enter your credentials to access your account</h4>
          </div>
          <div className="inputContainer">
            <input type="text" name="email" placeholder="E-mail" />
            <input type="password" name="password" placeholder="Password" />
          </div>

          <div className="seperator">
            <div className="hr"><hr /></div>
            <div className="seperatorText"><h4>OR CONTINUE WITH</h4></div>
            <div className="hr"><hr /></div>
          </div>

          <div className="btnContainer">
            <div className="gmailBtn" onClick={handleGoogleSignIn}>
              <div className="logo"><h4>G</h4></div>
              <div className="gText"><h5>Sign In With Google</h5></div>
            </div>

            <button type="submit" className="signInBtn">
              <p>Sign In</p>
            </button>
          </div>

          <h5 className="loginLink">
            Create a new account to get started{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>
              Click here
            </a>
          </h5>
        </div>
      </form>
    </div>
  );
};

export default SignIn;