import axios from "axios";

const BASEURL = "http://localhost:8800/api";

 const user = JSON.parse(localStorage.getItem("user"));
 console.log(user);

  // const currentUser = user && JSON.parse(user);
  //  console.log(currentUser)

  const TOKEN =  user?.accessToken;
   //console.log(TOKEN);

 //const  TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWMxNjZiZWI0MTE0MDUzODMxNDU1MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NjQzNDk3NCwiZXhwIjoxNjc2ODY2OTc0fQ.rsHuzgh1yPw-syVFW6MJaYKBBUCgIiLNL6Qfvq-EXLQ";

 export const publicRequest = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});



export const userRequest = axios.create({
    baseURL: BASEURL,
    withCredentials: true,
    headers: { token: `Bearer ${TOKEN}`}
})