// Get a reference to the <li> element with class "active"
var activeListItem = document.querySelector('li.active');

activeListItem.classList.remove('active');

function addMedicine() {

  var id;
  var medicineName = document.getElementById('medicineName').value;
  var medicineType = document.getElementById('medicineType').value;

  var whenToTakeCheckboxes = document.getElementsByName('whenToTake');
  var whenToTakeValues = [];
  for (var i = 0; i < whenToTakeCheckboxes.length; i++) {
    if (whenToTakeCheckboxes[i].checked) {
      whenToTakeValues.push(whenToTakeCheckboxes[i].value);
    }
  }
  var dose = document.getElementById('dose').value;
  for (var i = 0; i < whenToTakeValues.length; i++) {
    number = whenToTakeValues[i].charAt(0);
    id = medicineType + number;
    console.log(id);
    var pElement = document.createElement('p');
    pElement.textContent = medicineName + " Dose:" + dose;
    var existingElement = document.getElementById(id);
    if (existingElement) {
      existingElement.classList.remove('active');
    }
    existingElement.classList.add('active');
    var containerElement = document.createElement('div');
    containerElement.appendChild(pElement);
    existingElement.append(containerElement);
    schedule.push({email:email,usermedicineName:medicineName,id:id,dose:dose,whenToTakeValues:whenToTakeValues[i]})
    
  }
}

