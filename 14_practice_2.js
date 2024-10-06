document.getElementById("search_btn").addEventListener("click", (event) => {
    const inputvalue = document.getElementById("input").value;
    console.log(inputvalue);

    // Validate input to ensure it's a single character and a letter
    if (inputvalue.length == 1 && ((inputvalue >= 'a' && inputvalue <= 'z') || (inputvalue >= 'A' && inputvalue <= 'Z'))) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputvalue}`)
        .then(res => res.json())
        .then((data) => {
            if (data.meals) {
                display_data_char(data.meals);  // Pass the 'meals' array
            } else {
                console.log("No data found for this letter");
            }
        });
        console.log("perfect boss");
    } else {
        console.log("not perfect boss");
    }
});

const display_data_char = (ary) => {
    const contain = document.getElementById("container");
    contain.innerHTML = ''; // Clear container before adding new data
    console.log(ary);

    ary.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("cart_char");
        div.innerHTML = `
        <img class="card_img" onclick="show_details(${element.idMeal},'${element.strCategory}')" src="${element.strMealThumb}" alt="Meal Image">
        <h2>${element.strMeal}</h2>  
        <button type="search" id="detail_btn">Details</button>
        `;
        contain.appendChild(div);
    });
}



// Fetch and display all categories on page load
const loadallproduct = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
        display_data(data.categories); 
    });
}

const display_data = (ary) => {
    const contain = document.getElementById("container");
    contain.innerHTML = ''; // Clear container before adding new data

    ary.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("cart");
        div.innerHTML = `
        <img class="card_img" onclick="show_details(${element.idCategory},'${element.strCategory}')" src="${element.strCategoryThumb}" alt="Category Image">
        <h2>${element.strCategory}</h2>  
        <button type="search" id="detail_btn">Details</button>
        `;
        contain.appendChild(div);
    });
}

loadallproduct();

// const show_details=(id,name)=>{
//     console.log(id,name);
// }





// Function to show details in a modal
const show_details = (id, name) => {
    console.log(id, name);

    // Populate the modal with details (you can enhance this part by fetching more details if needed)
    const modalContent = document.getElementById("modalDetails");
    modalContent.innerHTML = `
      <h2>Details for ${name}</h2>
      <p>Category/Meal ID: ${id}</p>
      <!-- Add more content here based on the item -->
    `;

    // Show the modal
    const modal = document.getElementById("detailModal");
    modal.style.display = "block";
}

// Close the modal when the 'X' button is clicked
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("detailModal").style.display = "none";
});

// Close the modal if the user clicks outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById("detailModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}