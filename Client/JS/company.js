// const url = 'http://192.168.137.111:8000/';
// let url ='http://192.168.1.39:8000/';
let url ='http://192.168.1.27:8000/';

//to show the content of the company page when the page is loaded
const getData = async (url) => {
    try {
        const response = await fetch(url + 'posts/' + JSON.parse(localStorage.getItem('log_in_info')).idno);
        const data = await response.json();
        console.log(data);

        // Display the data in the HTML document
        console.log(data)
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

getData(url);

//to logout from conmpany home page
document.getElementsByClassName("log-out")[0].addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "./login.html";
});

//to show the content of the company page
function displayData(data) {
    const jobListElement = document.getElementById("jobList");

    if (!jobListElement) {
        console.error('Element with ID "jobList" not found.');
        return;
    }
    function formatDate(dateString) {
        const publishDate = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return publishDate.toLocaleDateString('en-US', options);
    }
    // Clear previous content
    jobListElement.innerHTML = '';

    // Loop through each job entry and append it to the jobListElement

    //to show the list of the jobs
    data.forEach(job => {
        const jobItem = document.createElement('div');
        jobItem.innerHTML = `
            <h3>${job.title}</h3>
            <p>Description: ${job.description}</p>
            <p>Field: ${job.field}</p>
            <p>Job Type: ${job.job_type}</p>
            
            <p>Publish Date: ${formatDate(job.publish_date)}</p>
            <button id="popupLink"  onclick="showAppliers('${job.jid}')">Show The Appliers</button>
            
          
            <hr>
        `;
        jobListElement.appendChild(jobItem);

        // If there are appliers, add them to the jobItem
        if (job.appliers && job.appliers.length > 0) {
            const appliersTitle = document.createElement('h4');
            appliersTitle.textContent = 'Appliers:';
            jobItem.appendChild(appliersTitle);

            const appliersList = document.createElement('ul');
            job.appliers.forEach(applier => {
                const applierItem = document.createElement('li');
                applierItem.textContent = applier;
                appliersList.appendChild(applierItem);
            });
            jobItem.appendChild(appliersList);
        }
    });
}

//to show the appliers of the job
function showAppliers(jid) {

    document.getElementsByClassName('close')[0].onclick = function() {
        document.getElementById('popup').style.display = "none";
    }

    document.getElementById('popup').style.display = "block";
    document.getElementsByClassName("popup-content")[0].innerHTML = '<span class="close" id="closebtn" onclick="closepopup()">&times;</span>';

    fetch(url +'appliers/' + jid, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if (response.status == 200) {
                
        }else{
            console.log(response.text().then(function(text){alert(text)}));
        }

        return response.json();

    }).then(data => {

        pop_kart = document.getElementsByClassName("popup-content")[0];

        data.forEach(e=>{


            const string = `
            <p>Name : ${e.fname} ${e.lname} Phmone Number : ${e.phone}</p>

            `
            pop_kart.innerHTML += string;


        });    


        // i=1;
        // string='';
        // data.forEach(e=>{
        //     string +=`${i}- Name : ${e.fname} ${e.lname} Phmone Number : ${e.phone} \n`  
        //     i++;
        // })
        // alert(string);
        
    }).catch((error) => {
        console.error('Error:', error);
    });
        
        

}    








////////////////
////////////////

const closepopup = () => {
    document.getElementById('popup').style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {

    window.onclick = function(event) {
        if (event.target == document.getElementById('popup')) {
            document.getElementById('popup').style.display = "none";
        }
    }

});