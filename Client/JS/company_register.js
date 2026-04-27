// url = 'http://192.168.137.111:8000/'
// let url ='http://192.168.1.39:8000/';
let url ='http://192.168.1.27:8000/';

log_in_info=[]
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');

    
    //get access to the form
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the default form submission

        const email = document.getElementById('email').value;
        const passw = document.getElementById('password').value;
        const cName = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('city').value;

        // Send the data using fetch()
        fetch(url +'company/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, passw: passw, cName: cName, phone: phone, address: address })
        })
        .then(response => {
            if (response.status == 200) {
                alert("User created successfully!");
                location.href='./logIn.html';
            }else{
                console.log(response.text().then(function(text){alert(text)}));
            }

            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            
            // Handle success here, e.g., redirect to another page or show user info
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle errors here, e.g., show error message to the user
        });
    });
});
