xin
===

Xin is Single Page Application framework using javascript.

![Xin](http://xinix.co.id/storage/uploads/xin.png "SPA Framework")

# Install

```
pas install
```
[Install Pas](https://github.com/reekoheek/pas "pas - another package management and automation")

to rebuild js and css
```
gulp
```

# Watch

```
gulp watch
```

# UI

TBD

# Directive
Directives are a way to teach HTML new tricks. During DOM compilation directives are matched against the HTML and executed. This allows directives to register behavior, or transform the DOM. Could someone explain directives in AngularJS in plain English commonly used in teaching programming.

## [data-role="app"]
TBD
## [data-role="pane"]
TBD
## [data-role="view"]
The general idea is to organize your interface into logical views, backed by models, each of which can be updated independently when the model changes, without having to redraw the page. Instead of digging into a JSON object, looking up an element in the DOM, and updating the HTML by hand, you can bind your view's render function to the model's "change" event — and now everywhere that model data is displayed in the UI, it is always immediately up to date.
[Backbonejs View](http://backbonejs.org/#View "Read more backbone view concept")

__Default view__
```html
<div data-role="view" data-uri="uri" data-layout="layoutid" data-title="Title">
    ...
</div>
```

__Custom View__
```javascript
var CustomView = xin.ui.View.extend({
    events: {
        "click .icon":          "open",
        "click .button.edit":   "openEditDialog",
        "click .button.delete": "destroy"
    },
    open: function(evt) {
        // do something amazing
    },
    openEditDialog: function(evt) {
        // do something amazing
    },
    destroy: function(evt) {
        // do something amazing
    }
});
```

__HTML implementation__
```html
<div data-role="CustomView" data-uri="uri" data-layout="layoutid" data-title="Title">
    ...
</div>
```

## [data-role="layout"]
TBD
## [data-role="drawer"]
TBD
## [data-parent-referer="your_uri"]
TBD
## [data-background="red"]
TBD
## [data-model="model"]
TBD
## [data-collection="collection"]
TBD
## [data-uri="list"]
TBD
## [data-layout="default"]
TBD
## [data-title="List"]
TBD


Directives (app, pane, view, layout, drawer, language)

# TODO

[] Fullscreen on mobile browser

#change Logs

## v0.0.*-rc
*	Theme convention using

## v0.0.1
Initial commit
