const url = "http://localhost:8080/counter"; // NOTE NEW URL

import { postData } from './postdata';

/*
document.getElementById("image-file").addEventListener("change", (event) => {
    console.log(JSON.stringify(event));
    let theFile = document.getElementById("image-file").value; // .files;
    console.log("theFile = " + JSON.stringify(theFile));
}, false);
*/

/*
const inputFileElement = document.getElementById("imagefile");
inputFileElement.addEventListener("change", handleFile, false);

function handleFile() {
    const fileList = this.files;
    console.log("fileList = " + JSON.stringify(fileList));
}
*/

/*function fileUpload() {
    (async () => {
	const fileElem = document.getElementById("imagefile");
	fileElem.click();
    })();
}*/

export function counterCreate() {
    (async () => {
	let counter = document!.getElementById("countername") as HTMLInputElement;
	let counterName = counter!.value;
	let user = document!.getElementById("username") as HTMLInputElement;
	let userName = user!.value;
	const data = { 'name' : counterName };
	const newURL = url + "/users/" + userName + "/create"; // ?name=" + counterName;
	console.log("counterCreate: fetching " + newURL);
	const resp = await postData(newURL, data);
	const j = await resp.json();
	let output = document!.getElementById("output") as HTMLOutputElement;
	if (j!['result'] !== 'error') {
	    output!.innerHTML = "101: <b>" + userName + ", " + counterName + " created.</b>";
	} else {
	    output!.innerHTML = "100: " + userName + ", " + counterName + " not found.</b>";
	}
    })();
}

export function counterRead() {
    (async () => {
	let counter = document!.getElementById("countername") as HTMLInputElement;
	let counterName = counter!.value;
	let user = document!.getElementById("username") as HTMLInputElement;
	let userName = user!.value;
	const data = {'name' : counterName };
	const newURL = url + "/users/" + userName + "/read"; // ?name=" + counterName;
	console.log("counterRead: fetching " + newURL);
	const resp = await postData(newURL, data);
	const j = await resp.json();
	let output = document!.getElementById("output") as HTMLOutputElement;
	if (j['result'] !== 'error') {
	    output!.innerHTML = "201: <b>"  + userName + ", " + counterName + " value = " + j['value'] + "</b>";
	} else {
	    output!.innerHTML = "200: " +  userName + ", " + counterName + " not found.</b>";
	}	    
    })();
}

export function counterUpdate() {
    (async () => {
	let counter = document!.getElementById("countername") as HTMLInputElement;
	let counterName = counter!.value;
	let counterValueElement = document!.getElementById("countervalue") as HTMLInputElement;
	let counterValue = counterValueElement!.value;
	let user = document!.getElementById("username") as HTMLInputElement;
	let userName = user!.value;
	const data = {'name' : counterName, 'value': counterValue };
	const newURL = url + "/users/" + userName + "/update"; // ?name=" + counterName + "&value=" + counterValue;
	console.log("counterUpdate: fetching " + newURL);
	const resp = await postData(newURL, data);
	const j = await resp.json();
	let output = document!.getElementById("output") as HTMLOutputElement;
	if (j!['result'] !== 'error') {
	    output!.innerHTML = "301: <b>" + userName + ", " + counterName + " value = " + j['value'] + "</b>";
	} else {
	    output!.innerHTML = "300: " + userName + ", " + counterName + " not found.";
	}	    
    })();
}

export function counterDelete() {
    (async () => {
	let counter = document!.getElementById("countername") as HTMLInputElement;
	let counterName = counter!.value;
	let user = document!.getElementById("username") as HTMLInputElement;
	let userName = user!.value;
	const data = { 'name': counterName };
	const newURL = url + "/users/" + userName + "/delete"; // ?name=" + counterName;
	console.log("counterDelete: fetching " + newURL);
	const resp = await postData(newURL, data);
	const j = await resp.json();
	let output = document!.getElementById("output") as HTMLOutputElement;
	if (j!['result'] !== 'error') {
	    output!.innerHTML = "401: <b>" + userName + ", " + counterName + " deleted.</b>";
	} else {
	    output!.innerHTML = "400: " + userName + ", " + counterName + " not found.</b>";
	}	    
    })();
}
