prediction_1="";
prediction_2="";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:100
})
camera=document.getElementById("camera")
Webcam.attach(camera)
function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img src='"+data_uri+"' id='image'/>";
        
    })
    
}
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/f1m34aqVI/model.json',modelLoaded);
function modelLoaded(){
    console.log("model_loaded");
}
console.log("ml5 version :" ,ml5.version);
function speak(){
    var synth= window.speechSynthesis;
    speak_1="the first prediction is"+prediction_1;
    speak_2="the second preiction is"+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_1+speak_2)
    synth.speak(utterthis)
}
function predict(){
    img=document.getElementById('image');
    classifier.classify(img,gotResult)
}
function gotResult(error,result){
    if(error){
        console.error(error)
    }
    else{
        console.log(result)
        prediction_1=result[0].label
        prediction_2=result[1].label
        document.getElementById("emotion_name").innerHTML=prediction_1;
        document.getElementById("emotion_name_2").innerHTML=prediction_2;
        speak();
        if(result[0].label=="happy"){
            document.getElementById("uptate_emoji").innerHTML="😊";

        }
        if(result[0].label=="angry"){
            document.getElementById("uptate_emoji").innerHTML="😡";

        }
        if(result[0].label=="shocked"){
            document.getElementById("uptate_emoji").innerHTML="😮";

        }
        if(result[0].label=="tasty"){
            document.getElementById("uptate_emoji").innerHTML="😋";

        }
        if(result[1].label=="happy"){
            document.getElementById("uptate_emoji_2").innerHTML="😊";

        }
        if(result[1].label=="angry"){
            document.getElementById("uptate_emoji_2").innerHTML="😡";

        }
        if(result[1].label=="shocked"){
            document.getElementById("uptate_emoji_2").innerHTML="😮";

        }
        if(result[1].label=="tasty"){
            document.getElementById("uptate_emoji_2").innerHTML="😋";

        }
    }

}
