let signIn = document.getElementById('sign-in');
signIn.addEventListener('click', function(){
    let adminData = document.getElementById('adminId').value;
    let password = document.getElementById('password').value;

    axios.post('http://localhost:4000/adminlogin', {adminId: adminData,password: password})
    .then(response => {
        console.log(response);
        if(response.data.status){
            let popup = document.getElementById('pop-up');
            popup.style.display = 'block';
            let loginWindow = document.getElementById('login-window');
            loginWindow.style.display = 'none';
            let body = document.querySelector('body');
            body.addEventListener('click',function(){
                 window.location.href = 'http://localhost:4000/getallproducts';
            })
        }
    })
});