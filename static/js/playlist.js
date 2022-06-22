const profile = document.getElementById('profile-menu');
const avatar = document.getElementById('avatar');

function showProfile(){
    profile.classList.toggle('invisible');
}
function showAlert(user){
    console.log("hello from a wrapper function", user);
    Swal.fire({
        title: "Alert Set on Timer",
        text: "This alert will disappear after 3 seconds.",
        position: "top",
        //backdrop: "linear-gradient(yellow, orange)",
        background: "white",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        showCancelButton: false,
        timer: 3000
    })
}