// function fetchBlogs() {
//     console.log("Start");
//     fetch('http://localhost:8000/fetch-blogs', {
//         method: 'GET',
//     }).then(response => response.json()).then(data => {
//         console.log("Fuck");
//         const blogList = document.getElementById('blog-list');
//         blogList.innerHTML = ''; // Clear the existing list
//         console.log(data.blogs);
//         data.blogs.forEach(blog => {
//             const blogItem = document.createElement('div');
//             blogItem.className = 'blog-item';

//             const blogTitle = document.createElement('h3');
//             blogTitle.textContent = blog.blog_title;

//             const blogBody = document.createElement('p');
//             blogBody.textContent = blog.blog_body;

//             blogItem.appendChild(blogTitle);
//             blogItem.appendChild(blogBody);

//             blogList.appendChild(blogItem);

//             // Add a horizontal line (separator) after each blog
//             const separator = document.createElement('hr');
//             blogList.appendChild(separator);
//         });
//     })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }
function fetchBlogs() {
    fetch("http://localhost:8000/fetch-blogs", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            const blogList = document.getElementById("blog-list");
            blogList.innerHTML = ""; // Clear the existing list
            data.blogs.forEach((blog) => {
                const blogItem = document.createElement("div");
                blogItem.className = "blog-item";

                const blogTitle = document.createElement("h3");
                const blogLink = document.createElement("a");
                blogLink.href = "/read-blog/" + blog.blog_id; // Adjust the URL as per your routing
                blogLink.textContent = blog.blog_title;
                blogLink.style.color = "grey";
                blogLink.addEventListener("click", () => {
                    fetch("http://localhost:8000/blog/" + id, {
                        method: "GET",
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            blog_title = data.blog_title;
                            blog_body = data.blog_body;
                            showBlog(blog_title, blog_body);
                        });
                }); // Add this line

                blogTitle.appendChild(blogLink);
                blogItem.appendChild(blogTitle);
                blogList.appendChild(blogItem);

                // Add a horizontal line (separator) after each blog
                const separator = document.createElement("hr");
                blogList.appendChild(separator);
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

fetchBlogs();

function showBlog(blog_title, blog_body) {
    console.log("Start Show blog");
    const blogContent = document.getElementById("blog-content");
    blogContent.innerHTML = ""; // Clear the existing content

    const blogTitle = document.createElement("h1");
    blogTitle.textContent = blog_title;

    const blogBody = document.createElement("p");
    blogBody.textContent = blog_body;

    blogContent.appendChild(blogTitle);
    blogContent.appendChild(blogBody);
}
