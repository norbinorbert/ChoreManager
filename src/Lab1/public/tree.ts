// tree type
type Tree<T> = {
  value: T;
  children?: Tree<T>[];
};

// global variables
let canvas: HTMLCanvasElement;
let canvasContent: CanvasRenderingContext2D;
const radius: number = 15;

// draws a node as a circle at the specified coordinates
function drawNode<T>(x: number, y: number, text: T): void {
  canvasContent.font = '15px Arial';
  canvasContent.fillStyle = '#000000';
  canvasContent.strokeStyle = '#000000';
  canvasContent.beginPath();
  canvasContent.arc(x, y, radius, 0, 2 * Math.PI);
  canvasContent.stroke();
  // writes text inside the cirlce
  canvasContent.fillText(text.toString(), x - radius / 2, y + radius / 4);
}

// draws a line between parent and child node
function drawLine(fromX: number, fromY: number, toX: number, toY: number): void {
  canvasContent.beginPath();
  canvasContent.moveTo(fromX, fromY + radius);
  canvasContent.lineTo(toX, toY - radius);
  canvasContent.stroke();
}

// draws out a tree
// might draw nodes on top of eachother if tree is tall enough
function drawTree<T>(tree: Tree<T>, leftX: number, x: number, rightX: number, y: number): void {
  // root node
  const { value } = tree;
  drawNode(x, y, value);

  // draws out the children of the root
  if (tree.children && tree.children.length > 0) {
    const { children } = tree;
    const newY = y + 5 * radius;
    const sectionWidth = (rightX - leftX) / children.length;

    children.forEach((child, index) => {
      const newX = leftX + sectionWidth * index + sectionWidth / 2;
      drawLine(x, y, newX, newY);
      drawTree(child, leftX + sectionWidth * index, newX, leftX + sectionWidth * (index + 1), newY);
    });
  }
}

// parses a json file that has the format of a tree type
function parseJson<T>(data): Tree<T> {
  const tree: Tree<typeof data.value> = { value: data.value, children: [] };
  if (data.children) {
    for (let i = 0; i < data.children.length; i++) {
      tree.children[i] = parseJson(data.children[i]);
    }
  }
  return tree;
}

// when window is loaded, read a json file and draw the tree it contains
window.onload = async () => {
  canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvasContent = canvas.getContext('2d');

  canvasContent.clearRect(0, 0, canvas.width, canvas.height);
  const resp: Response = await fetch('./input.json');
  const data = await resp.json();
  const tree: Tree<typeof data.value> = parseJson(data);

  drawTree(tree, 0, canvas.width / 2, canvas.width, radius);
};
