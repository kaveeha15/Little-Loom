import '../css/signIn.css';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        alert('This account has been deleted.');
        await auth.signOut(); // Sign out from Firebase Auth
        return;
      }

      const role = userDoc.data().role || null;
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/products');
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user in Firestore if doesn't exist
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          createdAt: new Date(),
          role: 'user'
        });
      }

      navigate('/products');
    } catch (error) {
      alert('Google Sign-In failed: ' + error.message);
    }
  };

  return (
    <div className="signInContainer">
      <form onSubmit={handleSignIn}>
        <div className="signInForm">
          <div className="signInHeading">
            <h2>Sign In</h2>
            <h4>Welcome back! Please log in</h4>
          </div>
          <div className="inputContainer">
            <input type="text" name="email" placeholder="E-mail" required />
            <input type="password" name="password" placeholder="Password" required />
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
              <p>Sign In</p>
            </button>

            <h5 className="loginLink">
              Don't have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/signUp'); }}>
                Sign up here
              </a>
            </h5>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
