Paginator = class Paginator {
  constructor(collection, perPage){
    this.collection = collection;
    this.perPage = perPage;
    this.currentPage = new ReactiveVar(1);
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
    return Math.ceil(this.collection.find({}).count()/this.perPage);
  }
  pagedItems(options = null){
    var findOptions, sortOptions;

    if(!options){
      return this.collection.find({}, {skip: (this.currentPage.get() - 1) * this.perPage, limit: this.perPage }).fetch();
    }

    findOption = options.find || {};
    sortOption = options.sort || null;

    if(sortOption){
      return this.collection.find(findOption, {skip: (this.currentPage.get() - 1) * this.perPage, limit: this.perPage, sort: sortOption }).fetch();
    } else {
      return this.collection.find(findOption, {skip: (this.currentPage.get() - 1) * this.perPage, limit: this.perPage }).fetch();
    }

  }
  totalPagedItems(findOption){
    return this.collection.find(findOption, {skip: (this.currentPage.get() - 1) * this.perPage, limit: this.perPage }).count();
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
