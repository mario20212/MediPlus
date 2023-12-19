window.onload = function () {
    let elementToHide = document.querySelector('.output');
    elementToHide.classList.add('hide');
    let alertmessage=document.querySelector('.alert')
    alertmessage.classList.add('hide')
    let loader = document.querySelector('.loader');
    loader.classList.add('hide');
    var searchBar = document.querySelector('.search-bar');
    var tagsContainer = document.querySelector('.tags-container');
  
    // Array to store the drug names
    var drugNames = [];
  
    searchBar.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var newTag = document.createElement('div');
        newTag.className = 'drug-tag';
  
        // Creating a span for the drug text
        var drugText = document.createElement('span');
        drugText.className = 'drug-text';
        drugText.textContent = searchBar.value;
        newTag.appendChild(drugText);
  
        // Adding a close button to the tag
        var closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.className = 'close-button';
        newTag.appendChild(closeButton);
  
        searchBar.value = '';
        tagsContainer.appendChild(newTag);
  
        // Add click event to close the tag when the close button is clicked
        closeButton.addEventListener('click', function () {
          // Remove the tag from the DOM
          tagsContainer.removeChild(newTag);
  
          // Remove the drug name from the array
          var indexToRemove = drugNames.indexOf(drugText.textContent);
          if (indexToRemove !== -1) {
            drugNames.splice(indexToRemove, 1);
          }
  
          // Send updated drug names to the backend
          sendDrugNamesToBackend();
        });
  
       
        drugNames.push(drugText.textContent);
  
        
        if (drugNames.length === 2) {
          sendDrugNamesToBackend();
        }
      }
    });
  
    function sendDrugNamesToBackend() {
      var endpoint = '/conflict'; 
      console.log(drugNames)
      
      if (drugNames.length === 2) {
        $.ajax({
          url: endpoint,
          type: 'POST',
          data: { drugNames: drugNames },
          success: function (data) {
            // Handle the response from the backend as before
            let overlay = document.querySelector('#overlay');
            loader.classList.remove('hide');
            overlay.style.display = 'block';
            console.log(data.descriptions);
            let severity = checkSeverity(data.descriptions);
            console.log('Severity:', severity);
            if (severity === 'Minor') {
              let senselevel = document.querySelector('.severity-text');
              senselevel.textContent = 'Minor';
              let strength = document.querySelector('.interaction-strength');
              strength.textContent = 'No possible interaction.';
              let level1Element = document.querySelector('.level.level-1');
              level1Element.classList.remove('level-disable');
            } else if (severity === 'Monitor closely') {
              let senselevel = document.querySelector('.severity-text');
              senselevel.textContent = 'Monitor closely';
              let strength = document.querySelector('.interaction-strength');
              strength.textContent = 'Significant interaction possible (monitoring by your doctor required).';
              let level2Element = document.querySelector('.level.level-2');
              level2Element.classList.remove('level-disable');
            } else if (severity === 'Serious') {
              let senselevel = document.querySelector('.severity-text');
              senselevel.textContent = 'Serious';
              let strength = document.querySelector('.interaction-strength');
              strength.textContent = 'Serious interaction possible (consult your healthcare provider immediately).';
              let level3Element = document.querySelector('.level.level-3');
              level3Element.classList.remove('level-disable');
            } else {
              let senselevel = document.querySelector('.severity-text');
              senselevel.textContent = 'Don’t use together';
              let strength = document.querySelector('.interaction-strength');
              strength.textContent = 'Major possible conflict (consult your healthcare provider immediately).';
              let level4Element = document.querySelector('.level.level-4');
              level4Element.classList.remove('level-disable');
            }
            let resultElement = document.querySelector('.ic-intractions .ic-result');
            if (data.descriptions.length > 0 && data.descriptions[0] !== 'No Interactions Found') {
              resultElement.textContent = '1 Interaction Found';
            } else {
              resultElement.textContent = 'No Interactions Found';
            }
            let searchtags = document.querySelector('.searched-for');
            searchtags.textContent = (data.drugNames[0] + '+' + data.drugNames[1]).toUpperCase();
            elementToHide.classList.remove('hide');
            let descriptionmessage = document.querySelector('.interaction-description');
            descriptionmessage.textContent = data.descriptions;
            setTimeout(function () {
              loader.classList.add('hide');
              overlay.style.display = 'none';
            }, 1000);
          },
          error: function (error) {
            alertmessage.classList.remove('hide');
          }
        });
      }
    }
  
    function checkSeverity(descriptions) {
      let severity;
  
      // Check each description for keywords
      descriptions.forEach(description => {
        if (description.includes('No Interactions Found')) {
          severity = 'Minor';
        } else if (description.includes('may')) {
          severity = 'Monitor closely';
        } else if (description.includes('Later')) {
          severity = 'Serious';
        } else {
          severity = 'Don’t use together';
        }
      });
      return severity;
    }
  };