type Tree<T> = {
  value: T;
  children?: Tree<T>[];
};

let canvas: HTMLCanvasElement;
let canvasContent: CanvasRenderingContext2D;
const radius: number = 15;

function drawNode<T>(x: number, y: number, text: T): void {
  canvasContent.font = '15px Arial';
  canvasContent.fillStyle = '#000000';
  canvasContent.strokeStyle = '#000000';
  canvasContent.beginPath();
  canvasContent.arc(x, y, radius, 0, 2 * Math.PI);
  canvasContent.stroke();
  canvasContent.fillText(text.toString(), x - radius / 2, y + radius / 4);
}

function drawLine(fromX: number, fromY: number, toX: number, toY: number): void {
  canvasContent.beginPath();
  canvasContent.moveTo(fromX, fromY + radius);
  canvasContent.lineTo(toX, toY - radius);
  canvasContent.stroke();
}

function drawTree<T>(tree: Tree<T>, leftX: number, x: number, rightX: number, y: number): void {
  const { value } = tree;
  drawNode(x, y, value);

  if (tree.children.length) {
    const { children } = tree;
    let newX = (leftX + x) / 2;
    const newY = y + 5 * radius;
    drawLine(x, y, newX, newY);
    drawTree(children[0], leftX, newX, x, newY);

    if (children.length >= 2) {
      newX = (rightX + x) / 2;
      drawLine(x, y, newX, newY);
      drawTree(children[1], x, newX, rightX, newY);
    }
  }
}

function parseJson<T>(data): Tree<T> {
  const tree: Tree<typeof data.value> = { value: data.value, children: [] };
  if (data.children) {
    for (let i = 0; i < data.children.length; i++) {
      tree.children[i] = parseJson(data.children[i]);
    }
  }
  return tree;
}

window.onload = async () => {
  canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvasContent = canvas.getContext('2d');

  canvasContent.clearRect(0, 0, canvas.width, canvas.height);
  const resp: Response = await fetch('./input.json');
  const data = await resp.json();
  const tree: Tree<typeof data.value> = parseJson(data);

  drawTree(tree, 0, canvas.width / 2, canvas.width, radius);
};
