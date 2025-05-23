let video;
let facemesh;
let predictions = [];
const indices = [
  409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291,
  76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184
];

function setup() {
  // 建立640*480畫布並置中
  let cnv = createCanvas(640, 480);
  cnv.style('display', 'block');
  centerCanvas();

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", gotResults);
}

function windowResized() {
  centerCanvas();
}

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  let cnv = document.querySelector('canvas');
  if (cnv) {
    cnv.style.position = 'absolute';
    cnv.style.left = x + 'px';
    cnv.style.top = y + 'px';
  }
}

function modelReady() {
  // 模型載入完成
}

function gotResults(results) {
  predictions = results;
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;
    stroke(255, 0, 0);
    strokeWeight(15);
    noFill();

    // 原本的 indices 畫線
    for (let i = 0; i < indices.length - 1; i++) {
      const idxA = indices[i];
      const idxB = indices[i + 1];
      if (keypoints[idxA] && keypoints[idxB]) {
        const [x1, y1] = keypoints[idxA];
        const [x2, y2] = keypoints[idxB];
        line(x1, y1, x2, y2);
      }
    }

    // 新增指定列陣資料畫線（第一串）
    const customIndices1 = [
      409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291
    ];
    stroke(0, 0, 255); // 藍色
    strokeWeight(10);
    for (let i = 0; i < customIndices1.length - 1; i++) {
      const idxA = customIndices1[i];
      const idxB = customIndices1[i + 1];
      if (keypoints[idxA] && keypoints[idxB]) {
        const [x1, y1] = keypoints[idxA];
        const [x2, y2] = keypoints[idxB];
        line(x1, y1, x2, y2);
      }
    }

    // 新增指定列陣資料畫線（第二串）
    const customIndices2 = [
      76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184
    ];
    stroke(0, 200, 0); // 綠色
    strokeWeight(10);
    for (let i = 0; i < customIndices2.length - 1; i++) {
      const idxA = customIndices2[i];
      const idxB = customIndices2[i + 1];
      if (keypoints[idxA] && keypoints[idxB]) {
        const [x1, y1] = keypoints[idxA];
        const [x2, y2] = keypoints[idxB];
        line(x1, y1, x2, y2);
      }
    }
  }
}
