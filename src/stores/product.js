import { defineStore } from "pinia";

const useProductStore = defineStore('product', {
  state: () => ({
    data: [],
    categories: [],
    totalCount: 0,
    curentPage: 1,
    pageSize: 15,
    detail: null,
    filter: {
      search: '',
      category: '',
    },
    sort: {
      mode: 'asc',
      type: 'price',
    },
  }),
  getters: {
    filteredProducts: (state) => {
      return state.data.filter(product => product.title.toLowerCase().includes(state.filter.search.toLowerCase()))
    },
  },
  actions: {
    async getProducts(category) {
      let url = "https://fakestoreapi.com/products";
      if (category) {
        url += `/category/${category}`;
      }
      const response = await fetch(url);
      this.data = await response.json();
      this.totalCount = this.data.length;
    },
    async getProduct(id) {
      const url = `https://fakestoreapi.com/products/${id}`;
      const response = await fetch(url);
      this.detail = await response.json();
    },
    async getCategories() {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      this.categories = await response.json();
    },
    search(query) {
      this.filter.search = query;
    },
    sortByname(bool){
      if (bool === true) {
        this.data = this.data
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title));
      } else if (bool === false) {
        this.data = this.data
          .slice()
          .sort((a, b) => b.title.localeCompare(a.title));
      }
    },
    sortByprice(bool){
      if (bool === true) {
        this.data = this.data
          .slice()
          .sort((a, b) => a.price - b.price);
      } else if (bool === false) {
        this.data = this.data
          .slice()
          .sort((a, b) => b.price - a.price);
      }
    },
    sortByrating(bool){
      if (bool === true) {
        this.data = this.data
          .slice()
          .sort((a, b) => a.rating.rate - b.rating.rate);
      } else if (bool === false) {
        this.data = this.data
          .slice()
          .sort((a, b) => b.rating.rate - a.rating.rate);
      }
    }
  }
})

export default useProductStore;
