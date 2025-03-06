document.addEventListener("DOMContentLoaded", function () {
    const formSections = document.querySelectorAll(".form-section1, .form-section2, .form-section3");
    const nextBtn = document.querySelectorAll(".nextBtn");
    const prevBtn = document.querySelectorAll(".prevtBtn");
    const submitBtn = document.querySelector(".submitBtn");
    const progressSteps = document.querySelectorAll(".progress-step");
    const fileInput = document.querySelector("input[type='file']");
    const inputError = document.querySelector(".inputError");
    const dropArea = fileInput.parentElement;
    const fileNameDisplay = dropArea.querySelector(".file-name");
    const inputs = document.querySelectorAll(".requiredField");
    const emailInput = document.querySelector("input[type='email']");

    let currentSection = parseInt(localStorage.getItem("currentSection")) || 0;

    // Function to display the form section and update progress bar
    function showSection(index) {
        formSections.forEach((section, i) => {
            section.style.display = i === index ? "block" : "none";
        });

        // update progress bar
        progressSteps.forEach((step, i) => {
            if (i <= index) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }
        });

        // setting smooth transition to the progress bar 
        setTimeout(() => {
            progressSteps.forEach((step, i) => {
                step.style.transition = "background-color 0.3s ease-in-out";
            });
        }, 100);

        localStorage.setItem("currentSection", index);
    }

    // Email validation function
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // Form section validation function
    function validateSection(section) {
        let valid = true;
        const requiredFields = section.querySelectorAll(".requiredField");

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                valid = false;
                field.classList.add("error");
            } else {
                field.classList.remove("error");
                field.classList.add("success");
            }
        });

        // Check for email validation if the field exists
        if (emailInput) {
            if (!validateEmail(emailInput.value.trim())) {
                valid = false;
                emailInput.classList.add("error");
            } else {
                emailInput.classList.remove("error");
                emailInput.classList.add("success");
            }
        }

        return valid;
    }

    // Next button Handler
    nextBtn.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const section = formSections[currentSection];

            if (validateSection(section)) {
                if (currentSection < formSections.length - 1) {
                    currentSection++;
                    showSection(currentSection);
                }
            } else {
                inputs.classList.add("error");
                console.log("error")
            }
        });
    });

    // Previous button Handler
    prevBtn.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentSection > 0) {
                currentSection--;
                showSection(currentSection);
            }
        });
    });

    dropFile();

    // Function to handle the drag and drop functionality
    function dropFile() {
        dropArea.addEventListener("drop", (e) => {
            e.preventDefault();
            dropArea.classList.remove("drag-over");

            const file = e.dataTransfer.files[0];
            if (file && validateFileType(file)) {
                fileInput.files = e.dataTransfer.files;
                fileNameDisplay.textContent = `File Selected: ${file.name}`;
                inputError.classList.remove("show");
            } else {
                inputError.classList.add("show");
            }
        });

        dropArea.addEventListener("click", () => {
            fileInput.click();
        });
    }

    fileInput.addEventListener("change", (e) => {
        e.preventDefault();
        const file = fileInput.files[0];
        if (file && validateFileType(file)) {
            fileNameDisplay.textContent = `File Selected: ${file.name}`;
            inputError.classList.remove("show");
        } else {
            inputError.classList.add("show");
        }
    });

    function validateFileType(file) {
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        return allowedTypes.includes(file.type);
    }

    submitBtn.addEventListener("click", function (e) {
        const lastSection = formSections[currentSection];
        if (!validateSection(lastSection)) {
            e.preventDefault();
            alert("Please fill out all required fields correctly.");
        } else {
            alert("submission successful.");
            
        }
    });

    showSection(currentSection);
});
