"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url = "http://localhost:8080/counter"; // NOTE NEW URL
const postdata_1 = require("./postdata");
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
function counterCreate() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let counter = document.getElementById("countername");
        let counterName = counter.value;
        let user = document.getElementById("username");
        let userName = user.value;
        const data = { 'name': counterName };
        const newURL = url + "/users/" + userName + "/create"; // ?name=" + counterName;
        console.log("counterCreate: fetching " + newURL);
        const resp = yield postdata_1.postData(newURL, data);
        const j = yield resp.json();
        let output = document.getElementById("output");
        if (j['result'] !== 'error') {
            output.innerHTML = "101: <b>" + userName + ", " + counterName + " created.</b>";
        }
        else {
            output.innerHTML = "100: " + userName + ", " + counterName + " not found.</b>";
        }
    }))();
}
exports.counterCreate = counterCreate;
function counterRead() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let counter = document.getElementById("countername");
        let counterName = counter.value;
        let user = document.getElementById("username");
        let userName = user.value;
        const data = { 'name': counterName };
        const newURL = url + "/users/" + userName + "/read"; // ?name=" + counterName;
        console.log("counterRead: fetching " + newURL);
        const resp = yield postdata_1.postData(newURL, data);
        const j = yield resp.json();
        let output = document.getElementById("output");
        if (j['result'] !== 'error') {
            output.innerHTML = "201: <b>" + userName + ", " + counterName + " value = " + j['value'] + "</b>";
        }
        else {
            output.innerHTML = "200: " + userName + ", " + counterName + " not found.</b>";
        }
    }))();
}
exports.counterRead = counterRead;
function counterUpdate() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let counter = document.getElementById("countername");
        let counterName = counter.value;
        let counterValueElement = document.getElementById("countervalue");
        let counterValue = counterValueElement.value;
        let user = document.getElementById("username");
        let userName = user.value;
        const data = { 'name': counterName, 'value': counterValue };
        const newURL = url + "/users/" + userName + "/update"; // ?name=" + counterName + "&value=" + counterValue;
        console.log("counterUpdate: fetching " + newURL);
        const resp = yield postdata_1.postData(newURL, data);
        const j = yield resp.json();
        let output = document.getElementById("output");
        if (j['result'] !== 'error') {
            output.innerHTML = "301: <b>" + userName + ", " + counterName + " value = " + j['value'] + "</b>";
        }
        else {
            output.innerHTML = "300: " + userName + ", " + counterName + " not found.";
        }
    }))();
}
exports.counterUpdate = counterUpdate;
function counterDelete() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let counter = document.getElementById("countername");
        let counterName = counter.value;
        let user = document.getElementById("username");
        let userName = user.value;
        const data = { 'name': counterName };
        const newURL = url + "/users/" + userName + "/delete"; // ?name=" + counterName;
        console.log("counterDelete: fetching " + newURL);
        const resp = yield postdata_1.postData(newURL, data);
        const j = yield resp.json();
        let output = document.getElementById("output");
        if (j['result'] !== 'error') {
            output.innerHTML = "401: <b>" + userName + ", " + counterName + " deleted.</b>";
        }
        else {
            output.innerHTML = "400: " + userName + ", " + counterName + " not found.</b>";
        }
    }))();
}
exports.counterDelete = counterDelete;
