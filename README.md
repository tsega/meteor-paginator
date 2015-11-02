# Paginator

A simple client-side paginator used for generating page links and provide paged documents from a collection.

# Installation

```sh
$ meteor add tsega:paginator
```

# Usage

Assuming you have a proper **publication** and **subscription** setup and, for example, you have a subscription named
`Books`, first create the pagination object at the top of your template file:

`books.js`
```js
booksPaginator = new Paginator(Books, 10);
```
This will create the paginator object for the Books collection with a maximum of **10** entries to show per page.

Next in you create two helpers, one for getting the paged books and the other to return this newly created paginator

`books.js`
```js
Template.books.helpers({
    books: function () {
        return booksPaginator.pagedItems();
    },
    booksPaginator: function(){
      return booksPaginator;
    }
);
```
The `pagedItems()` takes an optional argument; an object to specify the find and sort options.
See below an example argument:

```js
{
  find: {
    _id: this.typeId
  },
  sort: {
    createdDate: -1
  }
}
```

Finally in your `html` template file you can list the paged books as table rows and
also provide a pager at the bottom as follows:

`books.html`
```html
<template name="books">
...

<table id="permissions-list" class="table table-striped table-hover">
  <tbody>
    {{#each books}}
        <tr>
            <td>{{ title }}</td>
            <td>{{ author }}</td>
        </tr>
    {{/each}}
  </tbody>
  <tfoot>
    <tr>
        <td colspan="2">
          {{#with booksPaginator}}
            {{> pagination }}
          {{/with}}
        </td>
    </tr>
  </tfoot>
</table>

...
</template>
```

**NOTE:** `pagination` template is included to generate the page links at the bottom;
make sure there is not template in your application with the same name.

# TODO
  - Remove the use of the `{{#with}}` block be able to pass the paginator to the `pagination` Template
  - Provide an option to limit the number of links to display, this is particularly
  useful when there are a large number of pages.
  - Write some test!
