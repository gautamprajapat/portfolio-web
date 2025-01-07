



function showSidebar(){
    const sidebar=document.querySelector('.my-menu-class');
    sidebar.style.display='flex';
}



function hideSideBar(){
    const hidebar=document.querySelector('.my-menu-class');
    hidebar.style.display='none';
}



// Add event listeners to menu items
document.querySelectorAll('.my-menu-class a').forEach(item => {
   
    // console.log(item);
    
   
    item.addEventListener('click', () => {
       
        
        hideSideBar();
    });
});


document.getElementById('my-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData(event.target); // Capture the form data

    // Log the collected data
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
});

// Frontend JavaScript (script.js)
const form = document.getElementById("my-form");
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJUQUkJ0Fo2CGTj4CzZVf589bbOuhh1dqCKZ9kZFTIqvwG25twQ9KHQID6SfP0BYrkLw/exec"; // Replace with your deployed script URL

function submitForm(formData) {
  return new Promise((resolve, reject) => {
    // Create a unique callback name
    const callbackName = 'jsonpCallback' + Date.now();
    
    // Create script element
    const script = document.createElement('script');
    
    // Build URL with parameters
    const params = new URLSearchParams(formData);
    script.src = `${SCRIPT_URL}?${params.toString()}&callback=${callbackName}`;
    
    // Setup the callback function
    window[callbackName] = function(response) {
      delete window[callbackName];
      document.body.removeChild(script);
      if (response.status === "success") {
        resolve(response);
      } else {
        reject(new Error(response.message));
      }
    };
    
    // Handle script load error
    script.onerror = () => {
      delete window[callbackName];
      document.body.removeChild(script);
      reject(new Error('Script load error'));
    };
    
    // Add script to document
    document.body.appendChild(script);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;
  
  try {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    const response = await submitForm(data);
    alert(response.message);
    form.reset();
  } catch (error) {
    console.error("Error submitting form:", error);
    alert(`Failed to submit form: ${error.message}`);
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});