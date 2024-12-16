import api from "./../services/api.js";
import Product from "../models/productApi.js";

const getEleId = (id) => document.getElementById(id);

const renderListProduct = (data) => {
  let content = "";

  data.forEach((product, i) => {
    content += `
<tr class="border">
    <td class="border px-4 py-2 text-center">${i + 1}</td>
    <td class="border px-4 py-2 text-center">${product.name}</td>
    <td class="border px-4 py-2 text-center">${product.price}</td>
    <td class="border px-4 py-2 text-center">
        <img src="${
          product.img
        }" alt="phone-img" width="100px" height="100px" class="mx-auto rounded-lg shadow">
    </td>
    <td class="border px-4 py-2 text-center">${product.desc}</td>
    <td class="border px-4 py-2 text-center">
        <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" data-modal-toggle="#myModal" data-modal-target="#myModal">Edit</button>        
        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onclick="handleDelete('${
          product.id
        }')">Delete</button>
    </td>
</tr>
`;
  });

  getEleId("tablePhone").innerHTML = content;
};

const batLoading = () => {
  document.getElementById("loading").style.display = "block";
};

const tatLoading = () => {
  document.getElementById("loading").style.display = "none";
};

// Handle Delete Product
const handleDelete = (id) => {
  batLoading();
  const promise = api.deleteDataById(id);
  promise
    .then((result) => {
      console.log(result.data);
      Toastify({
        text: `Xóa sản phẩm thành công!`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
      getListProduct();
    })
    .catch((error) => {
      console.error(error);
      Toastify({
        text: "Lỗi khi xóa sản phẩm. Vui lòng thử lại!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
      }).showToast();
    })
    .finally(() => {
      tatLoading();
    });
};

window.handleDelete = handleDelete;

const getListProduct = () => {
  const promise = api.fetchData();

  promise
    .then((result) => {
      renderListProduct(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
getListProduct();

getEleId("addPhoneForm").addEventListener("click", () => {
  const btnAdd = `
  <button id="btnEdit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onclick="handleAdd()">Add Phone</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});

const handleAdd = () => {
  const name = getEleId("name").value;
  const price = getEleId("price").value;
  const screen = getEleId("screen").value;
  const backCamera = getEleId("backCamera").value;
  const frontCamera = getEleId("frontCamera").value;
  const imageLink = getEleId("img").value;
  const description = getEleId("desc").value;
  const brand = getEleId("type").value;

  const product = new Product(
    "",
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    imageLink,
    description,
    brand
  );
  const promise = api.addData(product);
  promise
    .then((result) => {
      console.log(result.data);
      Toastify({
        text: `Thêm sản phẩm thành công!`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.error(error);
      Toastify({
        text: "Lỗi khi thêm sản phẩm. Vui lòng thử lại!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
      }).showToast();
    })
    .finally(() => {
      tatLoading();
    });
};

window.handleAdd = handleAdd;
