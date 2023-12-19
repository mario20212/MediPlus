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
        