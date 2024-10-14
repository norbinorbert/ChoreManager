var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var canvas;
var canvasContent;
var radius = 15;
function drawNode(x, y, text) {
    canvasContent.font = '15px Arial';
    canvasContent.fillStyle = '#000000';
    canvasContent.strokeStyle = '#000000';
    canvasContent.beginPath();
    canvasContent.arc(x, y, radius, 0, 2 * Math.PI);
    canvasContent.stroke();
    canvasContent.fillText(text.toString(), x - radius / 2, y + radius / 4);
}
function drawLine(fromX, fromY, toX, toY) {
    canvasContent.beginPath();
    canvasContent.moveTo(fromX, fromY + radius);
    canvasContent.lineTo(toX, toY - radius);
    canvasContent.stroke();
}
function drawTree(tree, leftX, x, rightX, y) {
    var value = tree.value;
    drawNode(x, y, value);
    if (tree.children && tree.children.length > 0) {
        var children = tree.children;
        var newY_1 = y + 5 * radius;
        var sectionWidth_1 = (rightX - leftX) / children.length;
        children.forEach(function (child, index) {
            var newX = leftX + sectionWidth_1 * index + sectionWidth_1 / 2;
            drawLine(x, y, newX, newY_1);
            drawTree(child, leftX + sectionWidth_1 * index, newX, leftX + sectionWidth_1 * (index + 1), newY_1);
        });
    }
}
function parseJson(data) {
    var tree = { value: data.value, children: [] };
    if (data.children) {
        for (var i = 0; i < data.children.length; i++) {
            tree.children[i] = parseJson(data.children[i]);
        }
    }
    return tree;
}
window.onload = function () { return __awaiter(_this, void 0, void 0, function () {
    var resp, data, tree;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                canvas = document.getElementById('canvas');
                canvasContent = canvas.getContext('2d');
                canvasContent.clearRect(0, 0, canvas.width, canvas.height);
                return [4 /*yield*/, fetch('./input.json')];
            case 1:
                resp = _a.sent();
                return [4 /*yield*/, resp.json()];
            case 2:
                data = _a.sent();
                tree = parseJson(data);
                drawTree(tree, 0, canvas.width / 2, canvas.width, radius);
                return [2 /*return*/];
        }
    });
}); };
