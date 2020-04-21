const url = "http://localhost:8080/counter"; // NOTE NEW URL

// NEW: helper method for posting data
async function postData(url, data) {
  const resp = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  });
  return resp;
}

function counterCreate() {
  (async () => {
    let counterName = document.getElementById("countername").value;
    let userName = document.getElementById("username").value;
    const newURL = url + "/users/" + userName + "/create";
    const data = { name: counterName };
    console.log("counterCreate: fetching " + newURL);
    const resp = await postData(newURL, data);
    const j = await resp.json();
    if (j["result"] !== "error") {
      document.getElementById("output").innerHTML =
        "101: <b>" + userName + ", " + counterName + " created.</b>";
    } else {
      document.getElementById("output").innerHTML =
        "100: " + userName + ", " + counterName + " not found.</b>";
    }
  })();
}

function counterRead() {
  (async () => {
    let counterName = document.getElementById("countername").value;
    let userName = document.getElementById("username").value;
    const newURL = url + "/users/" + userName + "/read";
    const data = { name: counterName };
    console.log("counterRead: fetching " + newURL);
    const resp = await postData(newURL, data);
    const j = await resp.json();
    if (j["result"] !== "error") {
      document.getElementById("output").innerHTML =
        "201: <b>" +
        userName +
        ", " +
        counterName +
        " value = " +
        j["value"] +
        "</b>";
    } else {
      document.getElementById("output").innerHTML =
        "200: " + userName + ", " + counterName + " not found.</b>";
    }
  })();
}

function counterUpdate() {
  (async () => {
    let counterName = document.getElementById("countername").value;
    let userName = document.getElementById("username").value;
    let counterValue = document.getElementById("countervalue").value;
    const newURL = url + "/users/" + userName + "/update";
    const data = { name: counterName, value: counterValue };
    console.log("counterRead: fetching " + newURL);
    const resp = await postData(newURL, data);
    const j = await resp.json();
    if (j["result"] !== "error") {
      document.getElementById("output").innerHTML =
        "301: <b>" +
        userName +
        ", " +
        counterName +
        " value = " +
        j["value"] +
        "</b>";
    } else {
      document.getElementById("output").innerHTML =
        "300: " + userName + ", " + counterName + " not found.";
    }
  })();
}

function counterDelete() {
  (async () => {
    let counterName = document.getElementById("countername").value;
    let userName = document.getElementById("username").value;
    const newURL = url + "/users/" + userName + "/delete";
    const data = { name: counterName };
    console.log("counterRead: fetching " + newURL);
    const resp = await postData(newURL, data);
    const j = await resp.json();
    if (j["result"] !== "error") {
      document.getElementById("output").innerHTML =
        "401: <b>" + userName + ", " + counterName + " deleted.</b>";
    } else {
      document.getElementById("output").innerHTML =
        "400: " + userName + ", " + counterName + " not found.</b>";
    }
  })();
}
