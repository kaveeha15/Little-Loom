
import '../css/signIn.css';
import { useNavigate } from 'react-router-dom';
//import { auth } from '../firebase/auth'; // adjust path if needed
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (!email.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // TODO: Firebase email/password sign-up logic here
    navigate('/products');
  };

  const handleGoogleSignUp = async () => {
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
      <form onSubmit={handleSignUp}>
        <div className="signInForm">
          <div className="signInHeading">
            <h2>Sign Up</h2>
            <h4>Create a new account to get started</h4>
          </div>
          <div className="inputContainer">
            <input type="text" name="email" placeholder="E-mail" />
            <input type="password" name="password" placeholder="Password" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" />
          </div>

          <div className="seperator">
            <div className="hr"><hr /></div>
            <div className="seperatorText"><h4>OR CONTINUE WITH</h4></div>
            <div className="hr"><hr /></div>
          </div>

          <div className="btnContainer">
            <div className="gmailBtn" onClick={handleGoogleSignUp}>
              <div className="logo"><h4>G</h4></div>
              <div className="gText"><h5>Sign In With Google</h5></div>
            </div>

            <button type="submit" className="signInBtn">
              <p>Sign Up</p>
            </button>
          </div>

          <h5 className="loginLink">
            You already have an account{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/signin'); }}>
              Click here
            </a>
          </h5>
        </div>
      </form>
    </div>
  );
};

export default SignUp;