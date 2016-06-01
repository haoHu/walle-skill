"use strict";
// demo 1 use ms-include-src
// var _ = require("../../bower_components/lodash/dist/lodash.js");
// require("./walleRouter.js");
// avalon.ready(function() {
//   var root = avalon.define({
//     $id: "root",
//     name: "walleskill",
//     content: ""
//   });
//
//   function callback() {
//     var jspath = "../modules";
//     var pagepath = "";
//     var paths = this.path.split('/');
//     var pv = _.values(this.params);
//     /*
//       根据路由的path获取需要加载的模块的模板和js文件。
//       模块的结构符合path路径层级，如果遇到参数，自动过滤掉参数。
//       例如：
//       aaa/detail/:id
//       jspath为引用脚本URL
//       jspath = "../modules/aaa_detail"//对应../modules/aaa_detail/index.js
//       pagepath为引用模板对应在avalon中模板缓存的id
//       pagepath = "_aaa_detail"
//      */
//     _.forEach(paths, function(name, idx) {
//       if (name != "" && _.indexOf(pv, name) == -1) {
//         jspath += (jspath == "../modules" ? "/" : "_") + name;
//         pagepath += "_" + name;
//       }
//     });
//
//     console.log("pagepath : " + pagepath);
//     console.log("jspath: " + jspath);
//     // 加载模块儿入口脚本
//     require(jspath);
//     avalon.vmodels.root.content = pagepath;
//   }
//
//   avalon.router.get("/aaa", callback);
//   avalon.router.get("/bbb", callback);
//   avalon.router.get("/aaa/detail/:id", callback);
//   avalon.router.get("/bbb/detail/:id", callback);
//   avalon.router.get("/aaa/edit/:id", callback);
//   avalon.history.start({
//     // html5Mode: true
//     // basepath: "/Users/huhao/github/walle-skill/index.html"
//   });
//   avalon.router.navigate("/aaa");
//   avalon.scan();
// });




// demo2 use ms-view
var _ = require("../../bower_components/lodash/dist/lodash.js");
require("./walleState.js");
avalon.ready(function() {
  var root = avalon.define({
    $id: "root",
    args: "",
    query: {},
    params: {},
    currPath: ""
  });

  avalon.state("aaa", {
    url: "/aaa",
    views: {
      "": {
        // template: "<div>this is aaa page<div ms-view></div></div>"
        templateUrl: "src/modules/aaa/index.html"
      }
    }
  }).state("bbb", {
    url: "/bbb",
    views: {
      "": {
        // template: "<div>this is bbbb page<div ms-view></div></div>"
        templateProvider: function(params) {
          return new Promise(function(rs, rj) {
            rs(avalon.state.templateLoader("src/modules/bbb/index.html", rs, rj));
          });
        }
      }
    }
  }).state("aaa.detail", {
    url: "/detail/:aaa",
    views: {
      "": {
        template: "这是aaa详情页面{{args}}"
      }
    },
    onEnter: function(a) {
      root.args = a;
    }
  }).state("bbb.detail", {
    url: "/detail/:bbb",
    views: {
      "": {
        template: "这是bbb详情页面{{args}}"
      }
    },
    onEnter: function(a) {
      root.args = a;
    }
  });

  avalon.history.start();
  avalon.router.navigate("aaa");
  avalon.scan(0, root);

})
