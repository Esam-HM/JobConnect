// url = 'http://192.168.137.111:8000/'
// let url ='http://192.168.1.39:8000/';

let url ='http://192.168.1.27:8000/';


const getData = async () => {
  const id = JSON.parse(localStorage.getItem('log_in_info')).idno;
    const response = await fetch(url + "applied/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    return data;
  }

const listData = async () => {
  const appliedJobs = await getData();
    const appliedJobsContainer = document.getElementById("appliedJobsContainer");
  
    appliedJobs.forEach((job) => {
      const jobElement = document.createElement("div");
      jobElement.classList.add("appliedJob");
      jobElement.innerHTML = `
        <h3>${job.jobtitle}</h3>
        <p>Company: ${job.company}</p>
        <hr>
      `;
      appliedJobsContainer.appendChild(jobElement);
    });
}
listData();