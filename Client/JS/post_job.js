// url = "http://192.168.137.111:8000/";
// let url ='http://192.168.1.39:8000/';

let url ='http://192.168.1.27:8000/';

document.addEventListener("DOMContentLoaded", function () {
    const jobForm = document.querySelector("form");

    jobForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("job-description").value;
        const job_type = document.getElementById("job-type").value;
        const field = document.getElementById("filter").value;
        const comID =JSON.parse(localStorage.getItem('log_in_info')).idno;
        if (!title || !description || !job_type || !field) {
            return alert("Please enter all fields");
        }
        if (comID == null) {
            return alert("Please login first");
        }
        const data = {comID,title,description,field,job_type};
        const response = await fetch(url + "job/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 200) {
            alert("Job posted successfully");
            location.href = "./company-home.html";
        }

    }
    );
});

//to logout from the log out page
document.getElementsByClassName("log-out")[0].addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "./login.html";
});
