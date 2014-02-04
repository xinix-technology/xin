<?php

// sleep(3);

 ?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Xin Demo: Simple</title>

    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />

    <link rel="stylesheet" type="text/css" href="../../css/xin.css" />
    <link rel="stylesheet" type="text/css" href="../../css/xin-contrib.css" />
    <link rel="stylesheet" type="text/css" href="init.css" />

</head>
<body data-role="app">

    <div data-role="pane" data-transition="slide" class="xc-fill" data-id="pane">

        <div data-role="view" data-layout="default">
            another
        </div>

    </div>

    <script type="text/javascript" src="../../bower_components/zeptojs/src/zepto.js"></script>
    <script type="text/javascript" src="../../bower_components/zeptojs/src/event.js"></script>
    <script type="text/javascript" src="../../bower_components/zeptojs/src/data.js"></script>
    <script type="text/javascript" src="../../bower_components/zeptojs/src/ajax.js"></script>

    <script type="text/javascript" src="../../bower_components/simply-deferred/deferred.js"></script>
    <script type="text/javascript" src="../../bower_components/underscore/underscore.js"></script>
    <script type="text/javascript" src="../../bower_components/backbone/backbone.js"></script>

    <script type="text/javascript" src="../../src/global.js"></script>
    <script type="text/javascript" src="../../src/detect.js"></script>
    <script type="text/javascript" src="../../src/app.js"></script>
    <script type="text/javascript" src="../../src/ioc.js"></script>
    <script type="text/javascript" src="../../src/router.js"></script>
    <script type="text/javascript" src="../../src/directive.js"></script>
    <script type="text/javascript" src="../../src/provider.js"></script>
    <script type="text/javascript" src="../../src/fx.js"></script>
    <script type="text/javascript" src="../../src/ui.js"></script>

    <script type="text/javascript" src="../../src/directive/AppDirective.js"></script>
    <script type="text/javascript" src="../../src/directive/RoleDirective.js"></script>
    <script type="text/javascript" src="../../src/directive/URIDirective.js"></script>
    <script type="text/javascript" src="../../src/directive/BindDirective.js"></script>

    <script type="text/javascript" src="../../src/ui/Layout.js"></script>
    <script type="text/javascript" src="../../src/ui/Outlet.js"></script>
    <script type="text/javascript" src="../../src/ui/ViewFactory.js"></script>
    <script type="text/javascript" src="../../src/ui/Pane.js"></script>
    <script type="text/javascript" src="../../src/ui/List.js"></script>
    <script type="text/javascript" src="../../src/ui/List.js"></script>

    <script>
        var dataList = new Backbone.Collection([
            {o:'a'},
            {o:'b'},
            {o:'c'},
        ]);
    </script>
    <script type="text/javascript" src="./init.js"></script>

    <!-- <script type="text/javascript" src="http://localhost:9999/devreload.js"></script> -->

</body>
</html>