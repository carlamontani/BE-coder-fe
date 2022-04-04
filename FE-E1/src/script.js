//import axios from './axios.js';

const BASE_URL = 'https://colossal-shadow-loan.glitch.me';

//GET
const getItems = async () => {
  console.log('lslsl');
  try {
    const response = await axios.get(`${BASE_URL}/api/productos/`);

    const items = response.data;

    console.log(`GET: Here's the list of todos`, items);

    renderItems(items);

    return items;
  } catch (errors) {
    console.error(errors);
  }
};

//DELETE
const deleteItem = async (id) => {
  console.log(id);
  try {
    const response = await axios.delete(`${BASE_URL}/api/productos/${id}`);

    const items = response.data;

    console.log( items)

  } catch (errors) {
    console.error(errors);
  }
};


//UPDATE
function modifyItem(e, id) { //REF
  e.preventDefault();
  console.log('update')
  let nameInput = document.querySelector("#nameUpdate").value
  let descriptionInput = document.querySelector("#descriptionUpdate").value
  let thumbnailInput = document.querySelector("#thumbnailUpdate").value
  let priceInput = document.querySelector("#priceUpdate").value
  let codeInput = document.querySelector("#codeUpdate").value
  updateItem(nameInput, descriptionInput, thumbnailInput, priceInput, codeInput, id)
  return false;
}

const updateItem = async (nameInput, descriptionInput, thumbnailInput, priceInput, codeInput, id) => {
  console.log("enviando")
  axios.put(`${BASE_URL}/api/productos/${id}`, {
      title: nameInput,
      description: descriptionInput,
      price: priceInput,
      thumbnail: `https://picsum.photos/200?random=${thumbnailInput}`,
      stock: 10,
      code: codeInput
  });
};

const showUpdateForm = (id) => {
  document.querySelector("#container-update").innerHTML = `
  <h2>Modificar Producto</h2>
  <form onsubmit="return modifyItem(event, ${id})">
        <div class="row">
          <div class="twelve columns">
            <label for="name">Nombre</label>
            <input class="u-full-width" type="text" id="nameUpdate" />
          </div>
        </div>
        <div class="row">
          <div class="twelve columns">
            <label for="description">Descripcion</label>
            <input class="u-full-width" type="text" id="descriptionUpdate" />
          </div>
        </div>
        <div class="row">
          <div class="twelve columns">
            <label for="thumbnail">Imagen</label>
            <input class="u-full-width" type="text" id="thumbnailUpdate" placeholder="un numero"/>
          </div>
        </div>
        <div class="row">
          <div class="twelve columns">
            <label for="price">Precio</label>
            <input class="u-full-width" type="text" id="priceUpdate" />
          </div>
        </div>
        <div class="row">
          <div class="twelve columns">
            <label for="code">Codigo</label>
            <input class="u-full-width" type="text" id="codeUpdate" />
          </div>
        </div>
        <button>Actualizar</button>
      </form>
  `
};

//POST
function addItem(e) { //REF
  e.preventDefault();
  console.log('update')
  let nameInput = document.querySelector("#name").value
  let descriptionInput = document.querySelector("#description").value
  let thumbnailInput = document.querySelector("#thumbnail").value
  let priceInput = document.querySelector("#price").value
  let codeInput = document.querySelector("#code").value
  addItemPost(nameInput, descriptionInput, thumbnailInput, priceInput, codeInput)
}

const addItemPost = async (nameInput, descriptionInput, thumbnailInput, priceInput, codeInput) => {
  console.log("enviando")
  axios.post(`${BASE_URL}/api/productos`, {
      title: nameInput,
      description: descriptionInput,
      price: priceInput,
      thumbnail: `https://picsum.photos/200?random=${thumbnailInput}`,
      stock: 10,
      code: codeInput
  });
};

getItems();

const renderItems = (items) => {
  console.log(items);
  items.forEach((element) => {
    document.querySelector('#container').innerHTML += `
    <li class="card" id="card-${element.code}">
      <h4 id="name-${element.code}">${element.title}</h4>
      <p id="description-${element.code}">${element.description}</p>
      <p id="price-${element.code}">$${element.price}</p>
      <img src="${element.thumbnail}" alt="${element.title}">
      <br>
      <button onclick="showUpdateForm(${element.id})">Actualizar</button>
      <button onclick="deleteItem(${element.id})"> Eliminar</button>
    </li>
  `;
  });
};
