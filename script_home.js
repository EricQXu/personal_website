document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link");
    let currentIndex = 0;
  
    // Helper to update selected link
    function updateSelection() {
      links.forEach((link, index) => {
        link.classList.toggle("selected", index === currentIndex);
      });
    }
  
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        currentIndex = (currentIndex + 1) % links.length;
        updateSelection();
      } else if (e.key === "ArrowUp") {
        currentIndex = (currentIndex - 1 + links.length) % links.length;
        updateSelection();
      } else if (e.key === "Enter") {
        links[currentIndex].click();
      }
    });
  
    // Initialize selection
    updateSelection();
  });
  