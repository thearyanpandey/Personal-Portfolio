import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearAllUserErrors } from "../../Store/slices/userSlice";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom'


const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, error, loading]);

  // const loginSignupHandler = () => {
  //   setIsLogin(!isLogin);
  // };

  return (
    <div style={{ backgroundPosition: '0% 50%' }} className="flex items-end justify-end min-h-screen bg-[url('https://images7.alphacoders.com/110/1104374.jpg')] bg-cover text-white">

      {/* Section 1 */}
      <div className=" pb-[115px] pr-[125px] flex flex-col justify-center items-center space-y-6">
        <h1 className="text-5xl font-bold">Happening now</h1>
        <h2 className="text-3xl font-bold">Join today.</h2>

        <form onSubmit={submitHandler} className="space-y-4 w-full max-w-sm">
          {!isLogin && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                placeholder="Name"
                className="w-full p-3 bg-gray-800 text-white rounded-full outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
              />
              <input
                type="text"
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                placeholder="Username"
                className="w-full p-3 bg-gray-800 text-white rounded-full outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
              />
            </>
          )}
          <input
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="Email"
            className="w-full p-3 bg-gray-800 text-white rounded-full outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Password"
            className="w-full p-3 bg-gray-800 text-white rounded-full outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 rounded-full text-white font-bold hover:bg-blue-600 transition"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="text-center text-gray-400">
          <Link to={'/password/forgot'}>Forgot Password?</Link>
          <Link ></Link>
          {/* <button onClick={loginSignupHandler} className="w-full p-3 border border-gray-400 rounded-full mt-4 text-white hover:bg-gray-800 transition">
          {isLogin ? "Create Account" : " Login"}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
