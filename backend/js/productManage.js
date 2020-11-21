let active1 = document.getElementById('active1');
let active2 = document.getElementById('active2');
active1.addEventListener('click', function(){
    active2.checked = active1.checked ? false : true;
});

active2.addEventListener('click', function(){
    active1.checked = active2.checked ? false : true;
});