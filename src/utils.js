export const dateGetter = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day},${date},${month},${year}`;
};


//!Becarefull how to hide your api keys.
// const API_KEY= 'some1randome2api3key4like5this6just7try8it9out10your11self12replacing13the14exact15places16with17a18real19one'
// const axios=require("axios")
// for(let i=0;i<10;i++){ //this makes a get request to the below stated api 10 times if you encrease the number to million times then it crushes the api with overloaded request in a short time.
//     axios.get(
//         `http://someapi.weatherstack.com/current?access_key=${API_KEY}&query=New%20%York&forecast_`,(err,res)=>console.log(err||res.statusCode))
    
// }