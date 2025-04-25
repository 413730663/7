let inputBox;
let inputText = "🍦🍧🍨🍸🍹"; // 初始文字
let bubbles = [];
let colors = ['#fbf8cc', '#fde4cf', '#ffcfd2', '#f1c0e8', '#cfbaf0', '#a3c4f3', '#90dbf4', '#8eecf5', '#98f5e1', '#b9fbc0'];

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#bde0fe'); // 設定背景顏色
  noStroke();

  // 建立打字框
  inputBox = createInput(inputText);
  inputBox.position(10, 10); // 左上角位置
  inputBox.size(200); // 設定打字框寬度
  inputBox.input(() => {
    inputText = inputBox.value(); // 更新輸入文字
  });

  // 生成 40 顆泡泡
  for (let i = 0; i < 40; i++) {
    let bubble = {
      x: random(width),
      y: random(height),
      radius: random(10, 120), // 泡泡大小改為 10~120 隨機
      color: color(random(colors)),
      xSpeed: random(-1, 1),
      ySpeed: random(-1, 1),
      alpha: random(100, 200) // 半透明效果
    };
    bubbles.push(bubble);
  }
}

function draw() {
  background("e2eafc"); // 設定完全不透明的白色背景，避免殘影

  // 更新並繪製每個泡泡
  for (let bubble of bubbles) {
    fill(bubble.color.levels[0], bubble.color.levels[1], bubble.color.levels[2], bubble.alpha);
    ellipse(bubble.x, bubble.y, bubble.radius);

    // 更新位置
    bubble.x += bubble.xSpeed;
    bubble.y += bubble.ySpeed;

    // 碰到邊界反彈
    if (bubble.x < 0 || bubble.x > width) bubble.xSpeed *= -1;
    if (bubble.y < 0 || bubble.y > height) bubble.ySpeed *= -1;
  }

  // 計算文字大小變化
  let textSizeFactor = map(mouseX, 0, width, 12, 36);
  textSize(textSizeFactor); // 設定文字大小
  fill(0); // 黑色文字
  noStroke();

  // 計算每個文字的間隔
  let textWidthWithSpacing = textWidth(inputText) + 10; // 文字寬度加上間隔
  let cols = Math.floor((width - 120) / textWidthWithSpacing); // 每列文字數量，預留左右 60px
  let rows = Math.ceil((height - 120) / (textSizeFactor + 10)); // 每行文字數量，預留上下 60px

  // 計算水平偏移量，讓文字居中分佈
  let horizontalOffset = (width - 120 - cols * textWidthWithSpacing) / 2;

  // 繪製文字
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let x = 60 + horizontalOffset + col * textWidthWithSpacing; // 預留左側 60px，並加上水平偏移量
      let y = 60 + row * (textSizeFactor + 10); // 預留上方 60px
      text(inputText, x, y);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
}
