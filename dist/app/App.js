define(["require", "exports", "esri/Map", "esri/views/MapView", "dojo/aspect"], function (require, exports, Map, MapView, aspect) {
    "use strict";
    var App = /** @class */ (function () {
        function App() {
            this.init();
        }
        App.prototype.init = function () {
            var _this = this;
            var map = new Map({
                basemap: "topo"
            });
            var mapView = new MapView({
                map: map,
                container: "map"
            });
            mapView.when(function () {
                require(['esri/views/2d/engine/BitmapContainer'], function (BitmapContainer) {
                    aspect.after(BitmapContainer.prototype, "afterRenderChildren", (function (t, e) {
                        this.extractColors(e[0].context);
                        return [t, e];
                    }).bind(_this));
                });
            });
        };
        App.prototype.extractColors = function (ctx) {
            var canvas = ctx.canvas;
            var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            this.dye(imgData, ctx);
        };
        App.prototype.dye = function (imgData, ctx) {
            for (var i = 0; i < imgData.data.length; i += 4) {
                imgData.data[i] = 255 - imgData.data[i];
                imgData.data[i + 1] = 255 - imgData.data[i + 1];
                imgData.data[i + 2] = 255 - imgData.data[i + 2];
                imgData.data[i + 3] = 255;
            }
            ctx.putImageData(imgData, 0, 0);
        };
        return App;
    }());
    return App;
});
//# sourceMappingURL=App.js.map