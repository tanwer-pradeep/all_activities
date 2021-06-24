const videoElement = document.getElementById('video');
const button = document.getElementById('button');
let onexit;

async function selectMediaStream(){
    try{
        const media = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = media;
        videoElement.onloadedmetadata =()=>{
            videoElement.play();
        }
    }catch(error){
        console.log(error);
    }
}

button.addEventListener('click', async () =>{
    
        // button.disabled = true;

        //     onexit = await videoElement.requestPictureInPicture();
        //     videoElement.hidden = true;
        //     button.innerHTML = "STOP";
        //     button.disabled = false;
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
        // console.log("exist is called");
        button.innerHTML = "START";
        videoElement.hidden = false;
    }else{
        if(document.pictureInPictureEnabled){
            button.disabled = true;

            onexit = await videoElement.requestPictureInPicture();
            videoElement.hidden = true;
            button.innerHTML = "STOP";
            button.disabled = false;
        }
    }

});



selectMediaStream();