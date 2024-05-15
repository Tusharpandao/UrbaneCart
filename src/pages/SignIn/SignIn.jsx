import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/login.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../FirebaseConfig/FirebaseConfig";

function SignIn() {
  let [signedUser, setSignedUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  
    
  
  let handleChange = (e) => {
    setSignedUser({ ...signedUser, [e.target.name]: e.target.value });
  };

  let handleSubmit = () => {
    // console.log(signedUser.email, "   ",signedUser.password ,"   ",signedUser.userName);
    if (!signedUser.email) {
      toast.error("Fill in email fields");
    } else if (!signedUser.password) {
      toast.error("Fill in password fields");
    } else {
      signInWithEmailAndPassword(auth, signedUser.email, signedUser.password)
        .then((userCredential) => {
          // Signed in
          const users = userCredential.user;
          setSignedUser({ ...signedUser, userName: users.displayName });
          
          toast.success(`${signedUser.userName} you are signed in successfully`)
          navigate("/")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    }
    
  };
  
  return (
    <>
      <section
        className="text-gray-600 body-font"
        style={{ backgroundImage: `url(${loginImage})` }}
      >
        <div className="container px-5 py-14 mx-auto flex flex-wrap items-center">
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 opacity-95  rounded-lg p-8 flex flex-col m-auto ">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Sign In
            </h2>

            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={signedUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={signedUser.password}
                onChange={handleChange}
              />
            </div>
            <button
              className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
              onClick={handleSubmit}
            >
              Sign In
            </button>
            <div className="mt-6 text-center">
              <div className="text-sm text-yellow-950">
                Don't have an account?{" "}
                <Link to="/signUp">
                  <span className="mr-10 text-base font-semibold hover:text-gray-900 cursor-pointer text-indigo-600 hover:underline">
                    Sign Up
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;
