// ocrHandler.js
function uploadImage() {
    const imageInput = document.getElementById('imageUpload');
    const file = imageInput.files[0];

    if (!file) {
        alert('Please select an image file.');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    $.ajax({
        url: '/scan',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            displayResults(result);
        },
        error: function (xhr, status, error) {
            console.error('Failed to perform OCR:', error);
        }
    });
}

function displayResults(result) {
    console.log(result); // Log the result to the console

    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '<h2>OCR Results:</h2>';

    if (result) {
        const paragraph = document.createElement('p');
        paragraph.textContent = result;
        resultContainer.appendChild(paragraph);
    } else {
        const errorParagraph = document.createElement('p');
        errorParagraph.textContent = 'No OCR results found.';
        resultContainer.appendChild(errorParagraph);
    }
}



