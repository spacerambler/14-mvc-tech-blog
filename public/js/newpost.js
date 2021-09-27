//form handler
const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const blog = document.querySelector('#blog-post').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, blog }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.new-blog-form')
    .addEventListener('submit', signupFormHandler);
