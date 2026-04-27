// url = "http://192.168.137.111:8000/";
// const getJobs = async (field, job_type) => {
// 	try {
// 		console.log(field, job_type, search.value)
// 		// const response = await fetch(url + "jobs?field=" + field + "?job_type=" + job_type + "?search=" + search.value );
// 		const response = await fetch(url + "jobs?field=" + field + "&job_type=" + job_type + "&search=" + search.value );

// 		// const response = await fetch(url + "jobs?field=" + field + "?job_type=" + job_type + "?search="

// 		const data = await response.json();
// 		return data;
// 	} catch (error) {
// 		console.error("Error:", error);
// 		alert(error.message);
// 		return [];
// 	}
// };
// const listJobs = async (field, job_type) => {
// 	const jobs = await getJobs(field, job_type);
// 	console.log(jobs);
	
// 	const jobsBox = document.getElementById("jobsBox");
// 	jobsBox.innerHTML = "";
//     if (jobs.length === 0) {
// 		return;
// 	}
// 	jobs.forEach((job) => {
// 		const jobBox = document.createElement("div");
// 		jobBox.className = "jobBox";
// 		jobBox.innerHTML = `
//     <div class="flip-box" id=${job.jid}>
//         <div class="flip-box-inner">
//             <div class="flip-box-front">
//                 <h2>${job.title}</h2>
//                 <p>${job.description}</p>
//             </div>
//             <div class="flip-box-back">
//                 <h2>Apply Now</h2>
//                 <p>Job Type: ${job.job_type}</p>
//                 <p>Field: ${job.field}</p>
//                 <p>Applicants: ${job.applicants}</p>
//                 <button class="apply-btn" value=${job.jid}>Apply</button>
//             </div>
//         </div>
//     </div>
// `;
// 		// jobBox.innerHTML = `

//         // <div class="flip-box" id=${job.jid}>
//         //     <div class="flip-box-inner" >
//         //     <div class="flip-box-front">
//         //         <h2>${job.title}</h2>
//         //         <p>${job.description}</p>
//         //         </div>
//         //         <div class="flip-box-back">
//         //             <h2>Apply Now</h2>
//         //             <button class="apply-btn" value=${job.jid}>Apply</button>
//         //         </div>
//         //     </div>
//         // </div>
//         // `;
// 		jobsBox.appendChild(jobBox);
// 	});
// };
// listJobs('', '');

// document.addEventListener("DOMContentLoaded", function () {
// 	const FilterForm = document.querySelector("form");

// 	FilterForm.addEventListener("submit", async function (event) {
// 		event.preventDefault();
// 		const field = document.getElementById("filter").value;
// 		const job_type = document.getElementById("type").value;
// 		listJobs(field, job_type);
// 	});
// });

// document.getElementsByClassName("log-out")[0].addEventListener("click", function () {

// 	localStorage.clear();
// 	location.href = "./logIn.html";
// });
// const url = "http://192.168.137.111:8000/";
// let url ='http://192.168.1.39:8000/';

let url ='http://192.168.1.27:8000/';

const getJobs = async (field, job_type) => {
    try {
        const response = await fetch(url + "jobs?field=" + field + "&job_type=" + job_type + "&search=" + search.value);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        alert(error.message);
        return [];
    }
};

const listJobs = async (field, job_type) => {
    const jobs = await getJobs(field, job_type);

    const jobsBox = document.getElementById("jobsBox");
    jobsBox.innerHTML = "";

    if (jobs.length === 0) {
        return;
    }

    jobs.forEach((job) => {
        const jobBox = document.createElement("div");
        jobBox.className = "jobBox";
        jobBox.innerHTML = `
            <div class="flip-box" id="${job.jid}">
                <div class="flip-box-inner">
                    <div class="flip-box-front">
                        <h2>${job.title}</h2>
                        <p>${job.description}</p>
                    </div>
                    <div class="flip-box-back">
                        <h2>Apply Now</h2>
                        <p>Job Type: ${job.job_type}</p>
                        <p>Field: ${job.field}</p>
                        <p></p>
                        <button class="apply-btn" value="${job.jid}" onclick="applyJob('${job.jid}')">Apply</button>
                        </div>
                </div>
            </div>
        `;
        jobsBox.appendChild(jobBox);
    });
};

listJobs('', '');

document.addEventListener("DOMContentLoaded", function () {
    const FilterForm = document.querySelector("form");

    FilterForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const field = document.getElementById("filter").value;
        const job_type = document.getElementById("type").value;
        listJobs(field, job_type);
    });
});

document.getElementsByClassName("log-out")[0].addEventListener("click", function () {
    localStorage.clear();
    location.href = "./logIn.html";
});



//////////////////////


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

async function applyJob(job_id) {
	
	

	user_id = JSON.parse(localStorage.getItem('log_in_info')).idno;

	
	console.log(url + 'apply/'+user_id.split(" ")[0]+"/"+job_id);

	await fetch(url + 'apply/'+user_id.split(" ")[0]+"/"+job_id, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => {
			if (response.status == 200) {
                // Hide the apply button and show the application number
                let job_card = document.getElementById(job_id);
                let apply=job_card.children[0].children[1].children[4]
                apply.style.display = 'none'; // Hide the button
			} else {
				console.log(response.text().then(function (text) { alert(text) }));
			}

			return response.json();
		})
		.then(data => {
                console.log(data);

                let job_card = document.getElementById(job_id);
                let main_div=job_card.children[0].children[1];
                


                // Create and show the application number box
                let appNumberBox = document.createElement('div');
                appNumberBox.className = 'application-number-box';
                if (data[0].count != undefined)
                    appNumberBox.innerHTML = `Application Number = ${data[0].count}`;
                if (data[0].applyforjob != undefined)
                    appNumberBox.innerHTML = `Application Number = ${data[0].applyforjob}`; // Assuming 'applicationNumber' is returned by your API
                main_div.appendChild(appNumberBox);

		})
		.catch((error) => {
			console.error('Error:', error);
			// Handle errors here, e.g., show error message to the user
		});


}