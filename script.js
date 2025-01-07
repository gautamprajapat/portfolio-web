



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



const form = document.getElementById("my-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try{
    const response = await fetch("https://script.google.com/macros/s/AKfycbx9NDqZQIEGBwMFvX2vCjzPKqBSdbzzR3Hnvsg-f_76kxYn-yaQWlZifwGdmq0tsbXU-Q/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure this header is set
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
        const result = await response.json();
        alert(result.message);
        form.reset();
      } else {
        console.error("Form submission failed:", response.statusText);
        alert("Failed to submit the form. Please try again.");
      }
    }catch (error) {
        console.error("Error submitting the form:", error);
        alert("An error occurred. Please try again.");
      }
  });