Paginator = class Paginator {
  constructor(collection, perPage){
    this.collection = collection;
    this.perPage = perPage;
    this.currentPage = new ReactiveVar(1);
    this.options = new ReactiveVar({});
  }
  pages(){
    var pages = [];
    for(var i=1; i <= this.totalPages(); i++){
      pages.push({pageNumber: i});
    }
    return pages;
  }
  hasPages(){
    return this.totalPages() > 1;
  }
  totalPages(){
    return Math.ceil(this.totalPagedItems()/this.perPage);
  }
  pagedItems(options = null){
    this.options.set({
      find: options.find || {},
      sort: options.sort || null
    });

    if(this.options.get().find == {} && this){
      return this.collection.find({}, {skip: (this.currentPage.get() - 1) * this.perPage, limit: this.perPage }).fetch();
    }

    if(this.options.get().sort){
      return this.collection.find(this.options.get().find, {skip: (this.currentPage.get() - 1) * this.perPage, limit: this.perPage, sort: this.options.get().sort }).fetch();
    } else {
      return this.collection.find(this.options.get().find, {skip: (this.currentPage.get() - 1) * this.perPage, limit: this.perPage }).fetch();
    }

  }
  totalPagedItems(){
    return this.collection.find(this.options.get().find).count();
  }
  toPage(pageNumber){
    this.currentPage.set(pageNumber)
  }
  toFirstPage(){
    this.currentPage.set(1);
  }
  toLastPage(){
    this.currentPage.set(this.totalPages());
  }
}
