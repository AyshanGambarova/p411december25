let latitudeIn = document.querySelector("#latitude-in");
let longitudeIn = document.querySelector("#longitude-in");
let monthIn = document.querySelector("#month-in");
let yearIn = document.querySelector("#year-in");
let table = document.querySelector(".table");
let tbody = document.querySelector(".tbody");
let searchBtn = document.querySelector(".search");
let inputsPage = document.querySelector(".inputs");
let heading = document.querySelector(".heading");
searchBtn.addEventListener("click", function () {
    latitudeValue = latitudeIn.value;
    longitudeValue = longitudeIn.value;
    monthValue = monthIn.value;
    yearValue = yearIn.value;
    // console.log(latitudeValue);
    getPrayerTime(latitudeValue, longitudeValue, monthValue, yearValue);
    inputsPage.classList.add("d-none");
})
function getPrayerTime(latitude, longitude, month, year) {
    let request = new XMLHttpRequest();
    request.onload = function () {
        if (request.status == 400) {
            alert("City not found");
            return;
        }
        let prayerRequest = JSON.parse(request.responseText);
        let days = JSON.parse(request.responseText).data;
        for (let index = 0; index < days.length; index++) {
            // days[0].date.gregorian.date
            // console.log(days[index].date.gregorian.date)
            heading.innerText = days[index].meta.timezone
            let td1 = document.createElement("td");
            td1.innerText = days[index].date.gregorian.date;
            let td2 = document.createElement("td");
            td2.innerText = (days[index].timings.Asr)
            let td3 = document.createElement("td");
            td3.innerText = days[index].timings.Dhuhr
            let td4 = document.createElement("td");
            td4.innerText = days[index].timings.Fajr
            let td5 = document.createElement("td");
            td5.innerText = days[index].timings.Imsak
            let td6 = document.createElement("td");
            td6.innerText = days[index].timings.Isha
            let td7 = document.createElement("td");
            td7.innerText = days[index].timings.Maghrib
            let td8 = document.createElement("td");
            td8.innerText = days[index].timings.Midnight
            let td9 = document.createElement("td");
            td9.innerText = days[index].timings.Sunrise
            let td10 = document.createElement("td");
            td10.innerText = days[index].timings.Sunset
            let tr = document.createElement("tr");
            tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9);
            tbody.append(tr);
            table.append(tbody);
            table.classList.remove("d-none");
            heading.classList.remove("d-none");
            // console.log(prayerRequest);
        }
    }
    request.open("get", "http://api.aladhan.com/v1/calendar?latitude=" + latitude + "&longitude=" + longitude + "&method=2&month=" + month + "&year=" + year + "");

    request.send();
}