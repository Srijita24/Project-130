song1 = "";
song2 = "";
leftWristX =0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1Status = "";
song2Status = "";

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized!!');
}

function gotPoses(results) {
    if (results.length > 0 )
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreLeftWrist);
        console.log(scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);
    }
}

function preload() {
    song1 = loadSound("muskurahat.mp3");
    song2 = loadSound("tum_bin.mp3");
}

function draw() {
    image(video, 0, 0, 600, 500);

    song1Status = song1.isPlaying();
    song2Status = song2.isPLaying();

    fill('#FF0000');
    stroke('#FF0000');
    
    if (scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song1.stop();

        if (song1Status == false)
        {
            song1.play();
            document.getElementById('song').innerHTML = "Song Name - Muskurahat Song";
        }
    }
    if (scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if (song2Status == false)
        {
            song2.play();
            document.getElementById('song').innerHTML = "Song Name - Tum Bin Jiya Jaye Song";
        } 
    }
    
}

function play() {
    song.play();
    song.volume(1);
    song.rate(1);
}