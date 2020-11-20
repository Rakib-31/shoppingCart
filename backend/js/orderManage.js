
function orderConfirmHandler(key, id, data){
    axios.post('http://localhost:4000/order/update?_id='+id, data)
    .then(response => {
        loadOrderItem(key);
    });
}

function orderCancelHandler(key, id, data){
    axios.post('http://localhost:4000/order/update?_id='+id, data)
    .then(response => {
        loadOrderItem(key);
    });
}


function chooseUrl(key){
    if(key === 'all') return 'http://localhost:4000/order/getorder';
    else if(key === 'confirm') return 'http://localhost:4000/order/getorder?confirm=true';
    else if(key === 'pending') return 'http://localhost:4000/order/getorder?pending=true';
    else return 'http://localhost:4000/order/getorder?cancel=true';
}


function selectButtonOption(button){
    button.style.pointerEvents = 'none';
    button.style.backgroundColor = 'white';
    button.style.color = 'white';
    button.style.border = 'none';
    return button;
}


// this function is for load item
//on specific button click
//confirm,all,pending,cancel
//button press and corresponding data show

function loadOrderItem(key) {

    let tableContainer = document.getElementById('contain-table');
    tableContainer.removeChild(document.getElementById('root-div'));

    let rootDiv = document.createElement('div');
    rootDiv.setAttribute('id', 'root-div');
    tableContainer.appendChild(rootDiv);

    //condition select the url for which url for which button
    let requestUrl = chooseUrl(key);

    let data = '';

    //making get request to the server
    //makeRequest('GET', requestUrl, data).then(function(data){
    //makeRequest(requestUrl)
    axios.get(requestUrl).then(response => {

        console.log(response);
        let dataArray = response.data;

        //dom management after fetching data
        //from the database
        for(i = 0; i < dataArray.length; i++){

            let small1 = document.createElement('small');
            small1.innerHTML = i+1;

            let td1 = document.createElement('td');
            td1.classList.add('text-center');
            td1.appendChild(small1);

            let small2 = document.createElement('small');
            small2.innerHTML = dataArray[i]._id;
            let td2 = document.createElement('td');
            td2.classList.add('text-center');
            td2.appendChild(small2);

            let small3 = document.createElement('small');
            small3.innerHTML = dataArray[i].item_price;
            let td3 = document.createElement('td');
            td3.classList.add('text-center');
            td3.appendChild(small3);

            let button1 = document.createElement('button');
            

            let button2 = document.createElement('button');
            

            if(!dataArray[i].pending){
                button1 = selectButtonOption(button1);
                button2 = selectButtonOption(button2);
            }

            else{
                button1.classList.add('btn');
                button2.classList.add('btn');
                button2.style.backgroundColor = 'red';
                button2.style.color = 'white';
            }

            
            button1.setAttribute('id','confirm-button');
            button2.setAttribute('id', 'cancel-button');

            button1.classList.add('m-2');
            button2.classList.add('m-2');

            button1.innerHTML = 'Confirm';
            button2.innerHTML = 'Cancel';

            //console.log(dataArray[i]._id);



            let small5 = document.createElement('small');
            let td5 = document.createElement('td');
            td5.classList.add('text-center');

            if(dataArray[i].pending){
                small5.innerHTML = 'Pending';
            }

            else if(dataArray[i].confirm){
                small5.innerHTML = 'Confirm';
            }
            else{
                small5.innerHTML = 'Cancel';
            }

            let id = dataArray[i]._id;

            button1.addEventListener('click', function(){

                axios.post('http://localhost:4000/order/update?_id='+id, {confirm: true, pending: false,cancel:false})
                .then(response => {
                    button1 = selectButtonOption(button1);
                    button2 = selectButtonOption(button2);
                    small5.innerHTML = 'Confirm';
                });
            });

            button2.addEventListener('click', function(){
                
                axios.post('http://localhost:4000/order/update?_id='+id, {confirm: false, pending: false,cancel:true})
                .then(response => {
                    button1 = selectButtonOption(button1);
                    button2 = selectButtonOption(button2);
                    small5.innerHTML = 'Cancel';
                });
            });

            let td4 = document.createElement('td');
            td4.classList.add('text-right');
            td4.appendChild(button1); 
            td4.appendChild(button2);

            

            td5.appendChild(small5);

            let tr1 = document.createElement('tr');
            tr1.classList.add('mt-4', 'pt-2','text-center', 'container');
            tr1.appendChild(td1);
            tr1.appendChild(td2);
            tr1.appendChild(td3);
            tr1.appendChild(td4);
            tr1.appendChild(td5);

            let table = document.createElement('table');
            table.classList.add('table', 'bg-white','text-center', 'mt-4');
            table.appendChild(tr1);
            let div = document.getElementById('root-div');
            div.appendChild(table);
        }
    });
}

//all button press event handler
let all = document.getElementById('all');
all.addEventListener('click', function(){
    all.style.backgroundColor = 'yellow';
    pending.style.backgroundColor = 'white';
    cancel.style.backgroundColor = 'white';
    confirm.style.backgroundColor = 'white';
    loadOrderItem(all.id)
});
 
//pending button press event handler
let pending = document.getElementById('pending');
pending.addEventListener('click', function(){
    pending.style.backgroundColor = 'blue';
    all.style.backgroundColor = 'white';
    cancel.style.backgroundColor = 'white';
    confirm.style.backgroundColor = 'white';
    loadOrderItem(pending.id)
});

//confirm button press event handler
let confirm = document.getElementById('confirm');
confirm.addEventListener('click', function(){
    confirm.style.backgroundColor = 'green';
    pending.style.backgroundColor = 'white';
    all.style.backgroundColor = 'white';
    cancel.style.backgroundColor = 'white';
    loadOrderItem(confirm.id)
});

//cancel button press event handler
let cancel = document.getElementById('cancel');
cancel.addEventListener('click', function(){
    cancel.style.backgroundColor = 'red';
    all.style.backgroundColor = 'white';
    pending.style.backgroundColor = 'white';
    confirm.style.backgroundColor = 'white';
    loadOrderItem(cancel.id)
});
 


window.onload = (event) => {
    loadOrderItem('all');
};
