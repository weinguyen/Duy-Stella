
const url = "https://duy-stella.onrender.com"

document.addEventListener("DOMContentLoaded", function () {
    const aboutMeSection = document.querySelector(".container.about");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        { threshold: 0.5 }
    );

    observer.observe(aboutMeSection);
});

function toggleContactForm() {
    var form = document.getElementById("contactForm");
    form.classList.toggle("show");
}
const gui = () => {
    var thongtin = {
        "name": document.querySelector("#contactForm input[placeholder='Your Name']").value,
        "email": document.querySelector("#contactForm input[placeholder='Email']").value,
        "phone": document.querySelector("#contactForm input[placeholder='Phone Number']").value,
        "message": document.querySelector("#contactForm textarea").value
    }

    fetch(url + "/guest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(thongtin)
    }).then(response => {
        response.json().then(data => {
            alert("Cảm ơn " + data.name + " đã gửi thông tin cho tôi. Tôi sẽ liên hệ lại với bạn sớm nhất có thể.");
        });
    }).catch(error => {
        console.error("Error:", error);
    });
};

function scrollToAbout() {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
}
