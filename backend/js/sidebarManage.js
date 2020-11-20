
let promotion = document.getElementById('promotion');
let x = document.getElementById("mySidenav");

let condition = false;

promotion.addEventListener('click', function(){
    condition = !condition;
    x.style.display = condition ? "block" : "none";
});
