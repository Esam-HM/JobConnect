

// url = 'http://192.168.137.111:8000/'
// let url ='http://192.168.1.39:8000/';
let url ='http://192.168.1.27:8000/';


document.addEventListener("DOMContentLoaded",async  function(event) {
  
    
  event.preventDefault()  
  
  company_id = JSON.parse(localStorage.getItem('log_in_info')).idno;//get the company id

    //get the company data
	fetch(url + 'company/'+company_id.split(" ")[0], {
		method: 'get',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {
			if (response.status == 200) {

        
			} else {
				console.log(response.text().then(function (text) { alert(text) }));
			}

			return response.json();
		}).then(data => {
        
        //the email
        let email = document.getElementById("email");//the email text field
        email.value = JSON.parse(localStorage.getItem("log_in_info")).email;//get the email from the local storage 
        email.disabled = true;//show the email

        //the password
        let password = document.getElementById("password");//the password text field
        password.value = "**********";//show the password
        password.disabled = true;//show the password field


        //the name
        let name = document.getElementById("name");
        name.value = data[0].cname;

        //the phone
        let phone = document.getElementById("phone");
        phone.value = data[0].phone;
        phone.disabled = true;

        //the address
        let address = document.getElementById("city");
        address.value = data[0].address;

		}).catch((error) => {
			console.error('Error:', error);
			// Handle errors here, e.g., show error message to the user
		});

});


//to update the company profile 
//this function is called when the user click on the update button
function updateCompanyProfile() {
  const company_id = JSON.parse(localStorage.getItem('log_in_info')).idno.split(" ")[0];
  const urlToUpdate = url + 'company/' + company_id;

  // Get the updated name and address from the form inputs
  const updatedName = document.getElementById("name").value;//get the updated name
  const updatedAddress = document.getElementById("city").value;//get the updated address



  // Create the data object that will be sent in the request body
  const dataToSend = {
      cname: updatedName,
      address: updatedAddress
  };

  console.log(dataToSend);

  fetch(urlToUpdate, {
      method: 'PUT', // Use 'PUT' method for update operations
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend) // Convert the dataToSend object into a JSON string
  })
  .then(response => {
      if (response.status === 200) {
          
          alert("Profile updated successfully!");
          location.href='./company-home.html';


          return response.json(); // Parse JSON only if response is OK
      } else {
          response.text().then(function (text) { 
              alert(text);
              throw new Error('Update failed'); // Throw an error to be caught by the catch block
          });
      }
  })
  .then(data => {
      console.log(data);
      // Handle the successful response here
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}


//to log out from profile page
document.getElementsByClassName("log-out")[0].addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "./login.html";
});















































































// // abdo complete the code here please if needed
// // company_profile.js
// url = 'http://192.168.137.111:8000/';
// const getData = async (url) => {
//     const response = await fetch(url + 'company/' + JSON.parse(localStorage.getItem('log_in_info')).idno);
//     const data = await response.json();
//     return data;
// }

// document.addEventListener("DOMContentLoaded", function () {
//     // Retrieve form data when the page loads
//     const registrationForm = document.getElementById("registrationForm");
  
//     registrationForm.addEventListener("submit", function (event) {
//       event.preventDefault();
  
//       // Retrieve form data
//       const name = registrationForm.elements["cName"].value;
//       const email = registrationForm.elements["email"].value;
//       const password = registrationForm.elements["passw"].value;
//       const phone = registrationForm.elements["phone"].value;
//       const address = registrationForm.elements["address"].options[
//         registrationForm.elements["address"].selectedIndex
//       ].text;
  
//       // Create profile page content
//       const profileContent = `
//         <div>
//           <h2>${name}</h2>
//           <p>Email: ${email}</p>
//           <p>Phone: ${phone}</p>
//           <p>Address: ${address}</p>
//         </div>
//       `;
  
//       // Append profile content to the body of the profile page
//       document.body.innerHTML += profileContent;
//     });
//   });

// user_profile.js
// const url = 'http://192.168.137.111:8000/';

// const getData = async (url) => {
//   const response = await fetch(url + 'company/' + JSON.parse(localStorage.getItem('log_in_info')).idno);
//   const data = await response.json();
//   return data;
// }

// document.addEventListener("DOMContentLoaded", async function () {
//   const registrationForm = document.getElementById("registrationForm");

//   // Fetch existing data and populate the form if it exists
//   const existingData = await getData(url);
//   if (existingData) {
//     registrationForm.elements["cName"].value = existingData.name;
//     registrationForm.elements["email"].value = existingData.email;
//     registrationForm.elements["passw"].value = existingData.password;
//     registrationForm.elements["phone"].value = existingData.phone;
//     // You might need to adjust the code for the address depending on your data structure
    
//     registrationForm.elements["address"].value = existingData.address;
//   }

//   registrationForm.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const name = registrationForm.elements["cName"].value;
//     const email = registrationForm.elements["email"].value;
//     const password = registrationForm.elements["passw"].value;
//     const phone = registrationForm.elements["phone"].value;
//     const address = registrationForm.elements["address"].value;

//     const profileContent = `
//       <div>
//         <h2>${name}</h2>
//         <p>Email: ${email}</p>
//         <p>Phone: ${phone}</p>
//         <p>Address: ${address}</p>
//       </div>
//     `;

//     document.body.innerHTML = profileContent; // Override the existing content with the new profile content
//   });
// });
