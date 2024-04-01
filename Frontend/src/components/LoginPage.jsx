// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/signup', formData);
//       console.log('User logged in successfully');
//       // Redirect to home page after successful login
//       navigate('/home');
//     } catch (error) {
//       console.error('Error logging in:', error);
//     }
//   };


//   return (
//     <div id="login-page">
//       <div className="com-container">
//         <div className="content">
//           <header>
//             <h1>Comedify</h1>
//           </header>
//           <main>
//             <h2>Login to Comedify</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="username">Username:</label>
//                 <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password:</label>
//                 <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
//               </div>
//               <button type="submit">Login</button>
//             </form>
//             <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
