let facemesh;
let video;
let predictions = [];

// 臉部輪廓一組
const FACE_OUTLINE_POINTS = [
  409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291,
  76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184
];

// 左眼一組
const LEFT_EYE_POINTS = [
  243,190,56,28,27,29,30,247,130,25,110,24,23,22,26,112,
  133,173,157,158,159,160,161,246,33,7,163,144,145,153,154,155
];

function setup() {
  // 置中畫布
  let cnv = createCanvas(640, 480);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  // 模型載入完成
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  drawFaceOutline();
  drawLeftEyeMesh();
}

function drawFaceOutline() {
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;
    stroke(255, 0, 0); // 紅色線條
    strokeWeight(4);
    noFill();
    beginShape();
    for (let i = 0; i < FACE_OUTLINE_POINTS.length; i++) {
      let idx = FACE_OUTLINE_POINTS[i];
      if (keypoints[idx]) {
        let [x, y] = keypoints[idx];
        vertex(x, y);
      }
    }
    endShape();
  }
}

function drawLeftEyeMesh() {
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;
    stroke(0, 0, 255); // 藍色線條
    strokeWeight(4);
    noFill();
    for (let i = 0; i < LEFT_EYE_POINTS.length - 1; i++) {
      let idxA = LEFT_EYE_POINTS[i];
      let idxB = LEFT_EYE_POINTS[i + 1];
      if (keypoints[idxA] && keypoints[idxB]) {
        let [x1, y1] = keypoints[idxA];
        let [x2, y2] = keypoints[idxB];
        line(x1, y1, x2, y2);
      }
    }
  }
}
