Webcam.set({
    width: 375,
    height: 325,
    image_format: "png",
    png_quality: 200
});

Webcam.attach('#camera');

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="imgSnap" src="' + data_uri + '">';
    });
}

console.log("ml5 version: ", ml5.version);
Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/9GCs04kHe/model.json', modelLoaded);
function modelLoaded() {
    console.log("Model Loaded!");
}

function identifyImg() {
    Img = document.getElementById("imgSnap");
    Classifier.classify(Img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("resultObject").innerHTML = results[0].label;
        document.getElementById("resultAccuracy").innerHTML = results[0].confidence.toFixed(2);
    }
}