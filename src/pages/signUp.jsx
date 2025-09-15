import '../css/signIn.css'
const SignUp = () => {




    return ( 
<div className="signInContainer">
    <div className="signInForm">
              <div className="signInHeading">
        <h2>Sign Up</h2>
        <h4>Create a new account to get started </h4>
    </div>
    <div className="inputContainer">
        <input type="text" name="email" placeholder="E-mail" />
        <input type="password" name="password" placeholder="Password" />
        <input type="password" name="password" placeholder="Confirm Password" />
    </div>
    <div className="seperator">
        <div className="hr"><hr/></div>
        <div className="seperatorText"><h4>OR CONTINUE WITH</h4></div>
        <div className="hr"><hr/></div>
    </div>
<div className="btnContainer">
    <div className="gmailBtn">
        <div className="logo"><h4>G</h4> </div>
        <div className="gText"><h5>Sign In With Google</h5></div>
    </div>
    <div className="signInBtn">
        <p>Sign In</p>
    </div>
</div>
<h5 className="loginLink">You  already have an account <a href="#">Click here</a></h5>
    </div>
  
</div>
     );
}
 
export default SignUp;