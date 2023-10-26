document.addEventListener('DOMContentLoaded', function () {
    console.log("Hello");
    const blogForm = document.getElementById('blog-write');
    const formData = new FormData(blogForm);
    console.log(formData);
    for (const entry of formData) {
        console.log(entry[0], entry[1]);
    }
    blogForm.addEventListener('submit', function (event) {
        for (const entry of formData) {
            console.log(entry[0], entry[1]);
        }
        event.preventDefault();
        const formData = new FormData(blogForm); // Change 'form' to 'blogForm'
        console.log(formData);
        fetch('http://localhost:8000/write', {
            method: 'POST',
            body: formData,
        }).then(response => response.json()).then(data => {
            if (data.error) {
                alert('Blog creation failed: ' + data.error);
                console.log('Blog creation failed: ');
                console.log(data.blog_body);
            } else {
                alert('Blog created successfully');
                console.log('Blog created successfully');
                console.log(data.blog_body);
                blogForm.reset();
                //window.location.reload();
                window.location.href = 'http://127.0.0.1:5000/blogs';
            }

        })
            .catch(error => {
                console.log('Inside catch');
                //window.location.reload()
                console.error('Error:', error);
            });
    });
});
