let signIn = document.getElementById('sign-in');
signIn.addEventListener('click', function(){
    let adminData = document.getElementById('adminId').value;
    let password = document.getElementById('password').value;

    axios.post('http://localhost:4000/adminlogin', {adminId: adminData,password: password})
    .then(response => {
        console.log(response);
    })
});