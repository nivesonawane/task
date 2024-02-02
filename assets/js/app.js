const cl = console.log;
const titleControl = document.getElementById("title");
const contentControl = document.getElementById("content");
const userIdControl = document.getElementById("userId");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");
const postForm = document.getElementById("postForm");
const cardContainer = document.getElementById('cardContainer');


let baseUrl = `https://jsonplaceholder.typicode.com`;

let postUrl = `${baseUrl}/posts`;

const createCards = (arr) => {
   cardContainer.innerHTML = arr.map(obj => {
      return `  <div class="card mb-3" id="${obj.id}">
                  <div class="card-header">
                    <h3 class="m-0">${obj.title}</h3>
                  </div>
                  <div class="card-body">
                    <p class="m-0">${obj.body}</p>
                  </div>
                  <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-success">Edit</button>
                    <button class="btn btn-danger">Delete</button>
                  </div>
              </div>`
   }).join();
}

let xhr = new XMLHttpRequest();

xhr.open("GET",postUrl);

xhr.send();

xhr.onload = function(){
  if(xhr.status >= 200 && xhr.status < 300){
    let data = JSON.parse(xhr.response);
    // cl(data);
    createCards(data);
  }
}

const submitForm = (eve) => {
   eve.preventDefault();
   let postObj = {
     title: titleControl.value,
     body: contentControl.value,
     userId: userIdControl.value,
   }
   cl(postObj);

   let xhr = new XMLHttpRequest();

   xhr.open("POST",postUrl);

   xhr.send(JSON.stringify(postObj));

   xhr.onload = function(){
     if(xhr.status >= 200 && xhr.status < 300){
        postObj.id = JSON.parse(xhr.response).id;
        let div = document.createElement('div');

        div.className = `card mb-3`;

        div.id = postObj.id;

        div.innerHTML = ` <div class="card-header">
                            <h3 class="m-0">${postObj.title}</h3>
                          </div>
                          <div class="card-body">
                            <p class="m-0">${postObj.body}</p>
                          </div>
                          <div class="card-footer d-flex justify-content-between">
                            <button class="btn btn-success">Edit</button>
                            <button class="btn btn-danger">Delete</button>
                          </div>
                      `
        cl(div);              
        cardContainer.prepend(div);              
     }
    //  postForm.reset();
   }
}

postForm.addEventListener("submit",submitForm);