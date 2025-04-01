  //bật nhạc
  
  
  
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
  
  
  function toggleMusic() {
    var audio = document.getElementById("backgroundMusic");
    var icon = document.getElementById("musicIcon");

    if (audio.paused) {
        audio.play();
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
    } else {
        audio.pause();
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
    }
}
//gửi thông tin 
var url = "https://localhost/"
function toggleContactForm() {
    var form = document.getElementById("contactForm");
    form.classList.toggle("show");
}
const gui = () => {
    var thongtin = {
        "name": document.querySelector("#contactForm input[placeholder='Your Name']").value,
        "email": document.querySelector("#contactForm input[placeholder='Email']").value,
        "phone": document.querySelector("#contactForm input[placeholder='Phone Number']").value,
        "message": document.querySelector("#contactForm textarea").value}

        fetch(url + "guithongtin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(thongtin)
        }).then(response => {
            response.text().then(data => {
                alert(data);
            });
        }).catch(error => {
            console.error("Error:", error);
        });
    };

    function scrollToAbout() {
        document.getElementById("about").scrollIntoView({ behavior: "smooth" });
    }
    