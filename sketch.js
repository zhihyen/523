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

    // 新增左眼
    const leftEye = [
      243,190,56,28,27,29,30,247,130,25,110,24,23,22,26,112,
      133,173,157,158,159,160,161,246,33,7,163,144,145,153,154,155
    ];
    stroke(255, 0, 255); // 粉紅色
    strokeWeight(6);
    for (let i = 0; i < leftEye.length - 1; i++) {
      const idxA = leftEye[i];
      const idxB = leftEye[i + 1];
      if (keypoints[idxA] && keypoints[idxB]) {
        const [x1, y1] = keypoints[idxA];
        const [x2, y2] = keypoints[idxB];
        line(x1, y1, x2, y2);
      }
    }

    // 新增右眼
    const rightEye = [
      359,467,260,259,257,258,286,414,463,341,256,252,253,254,339,255,
      263,466,388,387,386,385,384,398,362,382,381,380,374,373,390,249
    ];
    stroke(0, 255, 255); // 青色
    strokeWeight(6);
    for (let i = 0; i < rightEye.length - 1; i++) {
      const idxA = rightEye[i];
      const idxB = rightEye[i + 1];
      if (keypoints[idxA] && keypoints[idxB]) {
        const [x1, y1] = keypoints[idxA];
        const [x2, y2] = keypoints[idxB];
        line(x1, y1, x2, y2);
      }
    }
  }
}
