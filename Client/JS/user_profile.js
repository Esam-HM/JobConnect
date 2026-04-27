// url = 'http://192.168.137.111:8000/';
// let url ='http://192.168.1.39:8000/';
let url ='http://192.168.1.27:8000/';


//this function to get the data of the user from the database
const getData = async (url) => {
    const response = await fetch(url + 'user/' + JSON.parse(localStorage.getItem('log_in_info')).idno);
    const data = await response.json();
    console.log(data);
    return data;
}
getData();


//to logout from the profile page
document.getElementsByClassName("log-out")[0].addEventListener("click", function () {
  localStorage.clear();
  location.href = "./logIn.html";
});


document.addEventListener("DOMContentLoaded", function () {
    
    //to access the form
    const userRegistrationForm = document.getElementById("userRegistrationForm");

    //this happens when the user clicks on the submit button
    userRegistrationForm.addEventListener("submit", function (event) {
      event.preventDefault();
      //const data = getData();
      
      //to get the data from the form
      const firstName = userRegistrationForm.elements["fname"].value;
      const lastName = userRegistrationForm.elements["lname"].value;
      const email = userRegistrationForm.elements["email"].value;
      const password = userRegistrationForm.elements["passw"].value;
      const phone = userRegistrationForm.elements["phone"].value;
      const address = userRegistrationForm.elements["address"].options[
        userRegistrationForm.elements["address"].selectedIndex
      ].text;
      const age = userRegistrationForm.elements["age"].value;
      
      
      const profileContent = `
        <div>
          <h2>${firstName} ${lastName}</h2>
          <p>Email: ${email}</p>
          <p>Phone: ${phone}</p>
          <p>Address: ${address}</p>
          <p>Age: ${age}</p>
        </div>
      `;
  
      document.body.innerHTML += profileContent;
    });
  });

  


function deleteAccount(){

  
  const id = JSON.parse(localStorage.getItem('log_in_info')).idno;  
  fetch(url +'user/'+id, {
    method: 'delete',
    headers: {
        'Content-Type': 'application/json'
    },
   
  })
  .then(response => {
      if (response.status == 200) {
          localStorage.clear();
          location.href='./logIn.html';
      }else{
          console.log(response.text().then(function(text){alert(text)}));
      }

      return response.json();
  })
  .then(data => {
      
      
    
        
  })
  .catch((error) => {
      console.error('Error:', error);
      // Handle errors here, e.g., show error message to the user
  });

}  