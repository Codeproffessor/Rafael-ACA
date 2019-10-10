const sectionWrapper = document.getElementById("article-wrapper");
const asideWrapper = document.getElementById("aside-wrapper");

const fetchArticles = function (callback) { 
  return fetch(
    "https://5d8e0901370f02001405c7c9.mockapi.io/api/v1/postblog/postblog",
    {
      method: "GET"
    }
  )
    .then(function (response) {
      return response.json().then(function (data) {
        return callback(data);
      });
    })
    .catch(function (err) {
      console.log("Error", err);
    });
}

const fetchBloggers = function (callback) {
  return fetch(
    "https://5d8e0901370f02001405c7c9.mockapi.io/api/v1/postblog/users",
    {
      method: "GET"
    }
  )
    .then(function (response) {
      return response.json().then(function (data) {
        return callback(data);
      });
    })
    .catch(function (err) {
      console.log("Error", err);
    });
}

const showArticles = function (data) { 
  for (let i = 0; i < data.length; i++) {
    const article = document.createElement('article');
    const author = document.createElement('div');
    const title = document.createElement('div');
    const header = document.createElement('div');
    const articalBody = document.createElement('div');

    author.innerText = data[i].author;
    title.innerText = data[i].title;
    articalBody.innerHTML = data[i].description;

    header.className = 'article-header';
    author.className = "article-author";
    title.className = "article-title";

    header.appendChild(author);
    header.appendChild(title);


    articalBody.className = 'article-body';
    article.className = "outline artical-wrapp";

    article.appendChild(header);
    article.appendChild(articalBody);
    sectionWrapper.appendChild(article)
  }
}

const showBloggers = function (data) { 
  for (let i = 0; i < data.length; i++) {
    const blogger = document.createElement('div');
    const avatar = document.createElement('img');
    const name = document.createElement('div');

    avatar.src = data[i].avatar;
    name.innerText = data[i].name;

    blogger.className = 'aside-blogger';
    avatar.className = "aside-avatar";
    name.className = "article-title";

    blogger.appendChild(avatar);
    blogger.appendChild(name);


    asideWrapper.appendChild(blogger)
  }
}

const createNewPost = function () {
  const postTitle = document.getElementById("post-title");
  const postContent = document.getElementById("post-content");

  if (!postTitle.value.trim() && !postContent.value.trim()) {
    postContent.style = 'border-color: red'
    postTitle.style = 'border-color: red'
    return
  }
  postContent.style = 'border-color: #ced4da'
  postTitle.style = 'border-color: #ced4da'

  const data = {
    title: postTitle.value.trim(),
    description: postContent.value.trim(),
    author: 'unknown'
  }

  fetch(
    "https://5d8e0901370f02001405c7c9.mockapi.io/api/v1/postblog/postblog",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  )
    .then(function (response) {
      if (response.ok && response.status === 201) {
        const modal = document.getElementById("modal");
        modal.style.display = "none";
        postTitle.value = '';
        postContent.value = '';
      }


      if (response.status === 400) {
        const modal = document.getElementById("modal");
       
        postTitle.value = "Max number of elements reached for this resource!";
        postContent.value = '';
      }
    })
    .catch(function (err) {
      console.log("Error", err);
    });
}

const onload = function () {
  console.log('Run');
  fetchArticles(function (data) {
    showArticles(data)
  })
  fetchBloggers(function (data) {
    console.log(data)
    showBloggers(data)
  })
}
