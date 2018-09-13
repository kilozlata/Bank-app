window.addEventListener('beforeunload',saveAll);

let mainTbody = document.getElementById('mainTbody');
let addBtn = document.getElementById('addBtn');
let mainView = document.getElementById('mainView');
let addFormView = document.getElementById('addFormView');
let accBtn = document.getElementById('accBtn');
let addFormBtn = document.getElementById('addFormBtn');
let formId = document.getElementById('formId');
let formName = document.getElementById('formName');
let formDeposit = document.getElementById('formDeposit');
let formCcard = document.getElementById('formCcard');
let editView = document.getElementById('editView');
let editBtn = document.getElementById('editBtn');
let editFormView = document.getElementById('editFormView');
let editFormBtn = document.getElementById('edit-FormBtn');
let editformId = document.getElementById('edit-formId');
let editformName = document.getElementById('edit-formName');
let editformDeposit = document.getElementById('edit-formDeposit');
let editformCcard = document.getElementById('edit-formCcard');
let index;

// let db = [{
//     id: "1",
//     name: "Danilo",
//     deposit: 11000,
//     cCard: "Visa"
//   },
//   {
//     id: "2",
//     name: "Marko",
//     deposit: 10000,
//     cCard: "MasterCard"
//   }
// ];
if (localStorage.db) {
  var db = JSON.parse(localStorage.db);
} else {
  var db = [];
}



addBtn.addEventListener('click', displayForm);
accBtn.addEventListener('click', displayMainView);
addFormBtn.addEventListener('click', saveAccount);
editBtn.addEventListener('click', displayEditview);
editFormBtn.addEventListener('click', saveChanges);



createTable();

function createTable() {
  let text = '';
  for (let i = 0; i < db.length; i++) {
    text += '<tr><td>' + db[i].id + '</td><td>' + db[i].name + '</td><td>' + db[i].deposit + '</td><td>' + db[i].cCard + '</td></tr>';
  }
  mainTbody.innerHTML = text;
}

function createEditTable() {
  let text = '';
  for (let i = 0; i < db.length; i++) {
    text += '<tr>';
    text += '<td>'+db[i].id+'</td>';
    text += '<td>'+db[i].name+'</td>';
    text += '<td>'+db[i].deposit+'</td>';
    text += '<td>'+db[i].cCard+'</td>';
    text += '<td><button data-index="'+i+'" class="edit btn btn-sm btn-warning">Edit</button></td>';
    text += '<td><button id="'+i+'" class=" delete btn btn-sm btn-danger">Delete</button></td>';
    text += '</tr>';
  }
  editTbody.innerHTML = text;
   let deleteBtns = document.querySelectorAll('.delete');
   let editBtns = document.querySelectorAll('.edit');
   for (let i = 0; i < deleteBtns.length; i++) {
     deleteBtns[i].addEventListener('click',deleteAccount);
     editBtns[i].addEventListener('click',displayEditForm);
   }
}
function deleteAccount() {
  let index = this.id;
  db.splice(index,1);

  createTable();
  displayMainView();
}

function saveChanges() {
let  id = editformId.value;
let  name = editformName.value;
let  deposit = editformDeposit.value;
let  cCard = editformCcard.value;

let editedAccount = {
  id : id,
  name : name,
  deposit : deposit,
  cCard : cCard
};
db[index] = editedAccount;

createTable();
displayMainView();
}

function displayEditForm() {
  addFormView.style.display = "none";
  mainView.style.display = "none";
  editView.style.display = "none";
  editFormView.style.display = "block";

  index = this.getAttribute('data-index');

  editformId.value = db[index].id;
  editformName.value = db[index].name;
  editformDeposit.value = db[index].deposit;
  editformCcard.value = db[index].cCard;
}

function displayForm() {
  addFormView.style.display = "block";
  mainView.style.display = "none";
  editView.style.display = "none";
  editFormView.style.display = "none";
}

function displayMainView() {
  addFormView.style.display = "none";
  mainView.style.display = "block";
  editView.style.display = "none";
  editFormView.style.display = "none";
}

function displayEditview() {
  createEditTable();
  editView.style.display = "block";
  mainView.style.display = "none";
  addFormView.style.display = "none";
  editFormView.style.display = "none";
  }

function saveAccount() {
  let id = formId.value;
  let name = formName.value;
  let deposit = formDeposit.value;
  let cCard = formCcard.value;

  let newAccount = {
    id: id,
    name: name,
    deposit: deposit,
    cCard: cCard
  }
  db.push(newAccount);


  formId.value = "";
  formName.value = "";
  formDeposit.value = "";
  formCcard.value = "";
  createTable();
  displayMainView();

}

function saveAll() {
  localStorage.db = JSON.stringify(db);
}
