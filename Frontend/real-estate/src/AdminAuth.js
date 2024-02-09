// const getToken = () => {
//   const cookieValue = document.cookie.replace(
//     /(?:(?:^|.;\s)token\s*=\s*([^;]).$)|^.*$/,
//     "$1"
//   );
//   return cookieValue || null;
// };
const storedToken = () => {
  const storedToken = localStorage.getItem("token");

  if (storedToken) {
    const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
    const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
    //  const decodedToken = jwt.decode(storedToken);

    if (decodedToken && expirationTime > Date.now()) {
      console.log("Token is valid");
      return true;
    } else {
      console.error("Token is invalid or expired");
      localStorage.removeItem("token");
      return false;
    }
  } else {
    return false;
  }
};

// const isTokenExpired = () => {
//   const token = getToken();
//   console.log(getToken);

//   if (!token) {
//     return true;
//   }

//   const decodedToken = JSON.parse(atob(token.split(".")[1]));
//   const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds

//   return Date.now() >= expirationTime;
// };

export { storedToken };
