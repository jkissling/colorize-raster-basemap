// import Template = require("dojo/text!./App.html");
import * as Map from 'esri/Map';
import * as MapView from 'esri/views/MapView';
import * as aspect from 'dojo/aspect'

class App {

    constructor() {
        this.init()
    }

    private init() {
        let map = new Map({
            basemap: `topo`
        });

        let mapView = new MapView({
            map: map,
            container: `map`
        })

        mapView.when(() => {
            require(['esri/views/2d/engine/BitmapContainer'], (BitmapContainer) => {
                aspect.after(BitmapContainer.prototype, "afterRenderChildren", (function (t, e) {
                    this.extractColors(e[0].context)
                    return [t, e];
                }).bind(this));
            })
        })
    }

    private extractColors(ctx) {
        const canvas = ctx.canvas;
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        this.dye(imgData, ctx)
    }

    private dye(imgData, ctx) {
        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = 255 - imgData.data[i]
            imgData.data[i + 1] = 255 - imgData.data[i + 1]
            imgData.data[i + 2] = 255 - imgData.data[i + 2]
            imgData.data[i + 3] = 255
        }

        ctx.putImageData(imgData, 0, 0);
    }
}

export = App