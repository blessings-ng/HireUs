document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".topTab");
    const contents = document.querySelectorAll(".main-tab-content");
    const sectionCards = document.querySelectorAll(".section-cards");

    // Adding click event to tabs
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", function () {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            contents.forEach(content => content.classList.add("hidden"));
            contents[index].classList.remove("hidden");
        });
    });

    // Function to initialize card visibility  and see more button toggle
    function handleCardVisibility(cards, button) {
        
        // Initially show only the first three cards
        cards.forEach((card, index) => {
            if (index >= 3) {
                card.style.display = "none";
            }
        });

        // If there are less than or equal to 3 cards, hide the "See More" button
        if (cards.length <= 3) {
            button.style.display = "none";
        }

        // Handle See More/See Less toggle functionality
        button.addEventListener("click", function () {
            const hiddenCards = Array.from(cards).filter(card => card.style.display === "none");

            if (hiddenCards.length > 0) {
                // Show all cards
                cards.forEach(card => card.style.display = "block");
                button.textContent = "See Less";
            } else {
                // Hide all but the first three
                cards.forEach((card, index) => {
                    if (index >= 3) {
                        card.style.display = "none";
                    }
                });
                button.textContent = "See More";
            }
        });
    }

    // Initialize See More functionality for each section
    sectionCards.forEach((section) => {
        const cards = section.querySelectorAll(".section-card");
        const button = section.querySelector(".see-more-btn");
        handleCardVisibility(cards, button);
    });
});
