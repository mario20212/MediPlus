// Get a reference to the <li> element with class "active"
var activeListItem = document.querySelector('li.active');

// Remove the "active" class
activeListItem.classList.remove('active');
var schedule=[1,2,3];








function addMedicine() {

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
   

    for(var i=0;i<whenToTakeValues.length;i++)
    {
        number=whenToTakeValues[i].charAt(0);
        var id = medicineType + number;
        console.log(id);
        var pElement = document.createElement('p');
        pElement.textContent = medicineName +" Dose:"+dose;
        var existingElement = document.getElementById(id);
        if (existingElement){
        existingElement.classList.remove('active');
        }
        existingElement.classList.add('active');
        var containerElement = document.createElement('div');
        containerElement.appendChild(pElement);
        existingElement.append(containerElement);
    }
  }

  function savechanges()
  {
    $(document).ready(() => {
    $.ajax({
      type: 'POST',
      url: '/schedule',
      data: schedule ,
      success: (response) => {
        
      },
    });
  });



  }