let facemesh;
let video;
let predictions = [];
const FACEMESH_POINTS = [
  409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291,
  76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184
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
  console.log(video); // 新增這行
}

function modelReady() {
  // 模型載入完成
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  drawFaceMesh();
}

function drawFaceMesh() {
  console.log(predictions); // 新增這行
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;
    stroke(255, 0, 0); // 紅色線條
    strokeWeight(4);   // 粉色粗細
    noFill();
    beginShape();
    for (let i = 0; i < FACEMESH_POINTS.length; i++) {
      let idx = FACEMESH_POINTS[i];
      if (keypoints[idx]) {
        let [x, y] = keypoints[idx];
        vertex(x, y);
      }
    }
    endShape();
  }
}
