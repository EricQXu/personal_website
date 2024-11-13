// Function to navigate back in history
function goBack() {
    history.back();
}

// Add event listener to capture "Enter" keypress
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        goBack();
    }
});