import { defineStore } from "pinia";

const useProductStore = defineStore('product', {
  state: () => ({
    data: [],
    datax5: [],
    categories: [],
    totalCount: 0,
    currentPage: 1,
    pageSize: 6,
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
    filteredProducts(state) {
      return state.datax5.filter(product => product.title.toLowerCase().includes(state.filter.search.toLowerCase()))
    },
    totalPages(state) {
      return Math.ceil(state.totalCount / state.pageSize)
    },
    paginatedData(state) {
      const startIndex = (state.currentPage - 1) * state.pageSize;
      const endIndex = startIndex + state.pageSize;
      return this.filteredProducts.slice(startIndex, endIndex);
    },
    pageRange (state)  {
      let page = [];
      let range = 4
      if (state.currentPage > range) {
        page.push(1)
        for (let i = state.currentPage + 1 - range; i < state.currentPage; i++) {
          page.push(i)
        }
      } else if (state.currentPage <= range && state.currentPage > 1) {
        for (let i = 1; i < state.currentPage; i++) {
          page.push(i)
        }
      }
    
      if (state.currentPage <= state.totalPages - range) {
        for (let i = state.currentPage; i < state.currentPage + range; i++) {
          page.push(i)
        }
        page.push(state.totalPages)
      } else if (state.currentPage > state.totalPages - range) {
        for (let i = state.currentPage; i < state.totalPages + 1; i++) {
          page.push(i)
        }
      }
      return page;
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
      this.datax5 = this.data.concat(this.data, this.data,this.data,this.data,)
      this.totalCount = this.datax5.length;
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
