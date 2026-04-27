// let url ='http://192.168.1.39:8000/';
let url ='http://192.168.1.27:8000/';

//this function to show the registration options
document.addEventListener('DOMContentLoaded', function() {
    var registerLink = document.getElementById('registerLink');
    var registrationOptions = document.getElementById('registrationOptions');

    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        registrationOptions.classList.toggle('hidden');
    });
});

// Check if there is data in localStorage
// If there is, then the user is already logged in
if (localStorage.length > 0) {
    if(JSON.parse(localStorage.getItem('log_in_info'))!=null){
        if (JSON.parse(localStorage.getItem('log_in_info')).isuser == true) {
            location.href='../HTML/user_page.html';
        }else {
            location.href='../HTML/company-home.html';
        }
    }
    
}
else {
    console.log('localStorage is empty');
}




// url = 'http://192.168.137.111:8000/'
log_in_info=[]
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the default form submission

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch(url +'login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, passw: password })
        })
        .then(response => {
            if (response.status == 200) {
                
            }else{
                console.log(response.text().then(function(text){alert(text)}));
            }

            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            localStorage.setItem('log_in_info', JSON.stringify(data)); // Store data in localStorage
            
            if(data.isuser == true)
                location.href='./user_page.html';
            else
                location.href='./company-home.html';
              
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle errors here, e.g., show error message to the user
        });
    });
});

