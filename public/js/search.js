// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e) => {
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if (userData) {
        icon.onclick = () => {
            webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        emptyArray = suggestions.filter((data) => {
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data) => {
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    } else {
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element) {
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = () => {
        // webLink = `https://www.google.com/search?q=${selectData}`;
        // linkTag.setAttribute("href", webLink);
        // linkTag.click();
        window.location.href = `/product/${encodeURIComponent(selectData)}`;
    }
    searchWrapper.classList.remove("active");
}


function showSuggestions(list) {
    let listData;
    if (!list.length) {
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    } else {
        listData = list
            .map((data) => {
                const startIndex = data.toLowerCase().indexOf(inputBox.value.toLowerCase());
                const matchingPart = data.slice(0, startIndex + inputBox.value.length);
                const remainingPart = data.slice(startIndex + inputBox.value.length);
                return `<li><b>${matchingPart}</b>${remainingPart}</li>`;
            })
            .join('');
    }
    suggBox.innerHTML = listData;
}




var searchListItem = document.querySelector('li a[href="/search"]').parentNode;
searchListItem.classList.add('active');




// $(document).ready(function() {
//     $('#search-form').submit(function(event) {
//         event.preventDefault();

//         var searchTerm = $('#medicineName').val();
//         var url = '/product/' + encodeURIComponent(searchTerm);

//         $.ajax({
//             url: url,
//             type: 'POST', 
//             success: function(response) {
//                 console.log(response);
//             },
//             error: function(error) {
//                 console.error('Error:', error);
//             }
//         });
//     });
// });




