// import { useEffect } from 'react';
// // import jwt_decode from 'jwt-decode';
// import * as jwt_decode from 'jwt-decode';
// // import { useHistory } from 'react-router-dom';   

// const tokenExpiryCheck = () => {
//     // const history = useHistory();

//     useEffect(() => {
//         const getTokenFromCookie = () => {
//             const token = document.cookie.split('; ').find(row => row.startsWith('token='));
//             return token ? token.split('=')[1] : null;
//         };

//         const removeTokenFromCookie = () => {
//             document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; SameSite=None';
//         };

//         const token = getTokenFromCookie();
//         if (token) {
//             const decodedToken = jwt_decode(token);
//             const currentTime = Date.now() / 1000;
//             const expiresIn = decodedToken.exp - currentTime;

//             if (expiresIn <= 0) {
//                 removeTokenFromCookie();
//                 Window.location.href('/');
//                 // history.push('/');
//             } else {
//                 const timeout = setTimeout(() => {
//                     removeTokenFromCookie();
//                     Window.location.href('/');
//                     // history.push('/');
//                 }, expiresIn * 1000);

//                 return () => clearTimeout(timeout); // Cleanup function
//             }
//         }
//     }, []); // history
// };

// export default tokenExpiryCheck;
