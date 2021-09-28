//form handler
const editPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const blog = document.querySelector('#blog-post').value.trim();
  
    if (title && blog) {
      const response = await fetch('/api/posts/:id', {
        method: 'PUT',
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
    .querySelector('.edit-blog-form')
    .addEventListener('submit', editPostFormHandler);
