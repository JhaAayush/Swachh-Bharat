document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('upload-form');
    const imageInput = document.getElementById('image-input');
    const imageList = document.getElementById('image-list');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('http://localhost:8000/upload-image', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('File upload failed: ' + data.error);
                } else {
                    alert('File uploaded successfully');
                    updateImageList();
                    form.reset();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    function updateImageList() {
        fetch('/send-images')
            .then(response => response.json())
            .then(data => {
                const imageList = document.getElementById('image-list');
                imageList.innerHTML = '';

                data.images.forEach(image => {
                    const imgContainer = document.createElement('div');
                    imgContainer.classList.add('image-container');

                    const imgElement = document.createElement('img');
                    const imageBase64 = image.binary_data; // The Base64-encoded string
                    const imageType = "image/png"; // Set the appropriate image type

                    // Construct the data URI
                    const imageDataURI = `data:${imageType};base64,${imageBase64}`;

                    imgElement.src = imageDataURI;
                    imgElement.alt = image.filename;
                    imgElement.style.width = '500px';
                    imgElement.style.height = '500px';

                    const description = document.createElement('div');
                    console.log(image.description);
                    description.textContent = image.description;
                    description.classList.add('image-description');

                    imgContainer.appendChild(imgElement);
                    imgContainer.appendChild(description);

                    imageList.appendChild(imgContainer);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }


    // Initial image list update
    updateImageList();

    // Initial image list update
    updateImageList();
});
