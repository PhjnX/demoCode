import Product from "../models/productApi.js";

class Api {
  fetchData() {
    const promise = axios({
      url: "https://675a9ba6099e3090dbe54343.mockapi.io/capstone-js",
      method: "GET",
    });

    return promise;
  }

  deleteDataById(id) {
    const promise = axios({
      url: `https://675a9ba6099e3090dbe54343.mockapi.io/capstone-js/${id}`,
      method: "DELETE",
    });
    return promise;
  }

  addData(product) {
    const promise = axios({
      url: `https://675a9ba6099e3090dbe54343.mockapi.io/capstone-js`,
      method: "POST",
      data: product,
    });
    return promise;
  }
}

export default new Api();
