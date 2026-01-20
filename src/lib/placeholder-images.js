"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeholderImages = void 0;
var placeholder_images_json_1 = require("./placeholder-images.json");
exports.placeholderImages = placeholder_images_json_1.default.placeholderImages.reduce(function (acc, img) {
    acc[img.id] = img;
    return acc;
}, {});
