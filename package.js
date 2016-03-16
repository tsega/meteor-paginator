Package.describe({
  name: "tsega:paginator",
  version: "1.1.7",
  summary: "Simple client-side paging.",
  git: "https://github.com/tsega/meteor-paginator",
  documentation: "README.md"
});

Package.onUse(function(api) {
  api.versionsFrom("1.2.0.2");

  api.use(["ecmascript", "reactive-var", "templating", "underscore"]);

  api.addFiles([
    "lib/modules/paginator.js",
    "lib/templates/pagination.html",
    "lib/templates/pagination.js"
  ], "client");

  api.export("Paginator", "client");
});

Package.onTest(function(api) {
  api.use([
    "tinytest",
    "tsega:paginator"
  ], ["client"]);

  api.addFiles("tests/client/client_tests.js", "client");
});
