async function generateBlog() {
    const topic = document.getElementById("blogTopic").value;
    if (!topic) {
        alert("Please enter a topic!");
        return;
    }

    const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API Key
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4-turbo",
            messages: [{ role: "system", content: "You are an SEO blog writer." },
                       { role: "user", content: `Write an SEO-optimized blog post about: ${topic}` }],
            max_tokens: 900
        })
    });

    const data = await response.json();
    const blogContent = data.choices[0].message.content;

    saveBlog(topic, blogContent);
}

// Save blog posts to local storage and update UI
function saveBlog(title, content) {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.push({ title, content });
    localStorage.setItem("blogs", JSON.stringify(blogs));
    displayBlogs();
}

// Display blogs in grid format
function displayBlogs() {
    const blogGrid = document.getElementById("blogGrid");
    blogGrid.innerHTML = "";

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.forEach((blog, index) => {
        let blogDiv = document.createElement("div");
        blogDiv.classList.add("blog-preview");
        blogDiv.innerHTML = `<h3>${blog.title}</h3>`;
        blogDiv.onclick = () => openBlog(index);
        blogGrid.appendChild(blogDiv);
    });
}

// Open full-screen blog post
function openBlog(index) {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    document.getElementById("blogTitle").innerText = blogs[index].title;
    document.getElementById("blogContent").innerText = blogs[index].content;
    document.getElementById("blogModal").style.display = "flex";
}

// Close blog modal
function closeBlog() {
    document.getElementById("blogModal").style.display = "none";
}

// Load blogs on page load
window.onload = displayBlogs;
