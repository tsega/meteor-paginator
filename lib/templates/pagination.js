Template.pagination.events({
    "click li.pages": function (e, t) {
        Template.parentData(0).toPage(parseInt(e.target.dataset.pageNumber));
    },
    "click li:first-child": function (e, t) {
        Template.parentData(0).toFirstPage();
    },
    "click li:last-child": function (e, t) {
        Template.parentData(0).toLastPage();
    }
});
