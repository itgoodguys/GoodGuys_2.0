
// CSS import
import '../css/blog-single.scss'
import '../css/components/_cta.scss'


// Function to calculate reading time
function calculateReadingTime(content) {
  const wordsPerMinute = 200; // Average reading speed
  const text = content.innerText || content.textContent;
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

// Function to display reading time for each post
function displayReadingTime() {
  const blogPosts = document.querySelector('.blog_single-content .blog_rich-text'); // Adjust the selector to match your blog post content class
  const timeToRead = calculateReadingTime(blogPosts);
  const timeToReadElement = document.querySelector('#time-to-read'); // Adjust the selector to match your time to read element class
  if (timeToReadElement) {
    timeToReadElement.textContent = `${timeToRead} min`;
  }
}

// Call the function after the content has loaded
displayReadingTime();

