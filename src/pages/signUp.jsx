
import '../css/signIn.css';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
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

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
        role: 'user' // optional, can be admin
      });

      navigate('/products');
    } catch (error) {
      alert('Sign-Up failed: ' + error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: new Date(),
        role: 'user'
      });

      navigate('/products');
    } catch (error) {
      alert('Google Sign-Up failed: ' + error.message);
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
            <input type="text" name="email" placeholder="E-mail" required />
            <input type="password" name="password" placeholder="Password" required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
          </div>

          <div className="seperator">
            <div className="hr"></div>
            <div className="seperatorText"><h4>OR CONTINUE WITH</h4></div>
            <div className="hr"></div>
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
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/signIn'); }}>
              Click here
            </a>
          </h5>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
