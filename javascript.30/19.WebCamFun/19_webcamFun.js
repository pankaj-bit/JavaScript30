const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function audio()
{
    navigator.mediaDevices.getUserMedia({video:true,audio:false})
.then(localMediaStream =>{
    console.log(localMediaStream);
    video.srcObject = localMediaStream;
    video.play();
});


    
}
function getvideo()
{
    navigator.mediaDevices.getUserMedia({video:true,audio:false})
    .then(localMediaStream =>{
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(err=>
        {
            console.error('OHH!! NOO',err);
        });
    
}

function paintToCanvas(){
    const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

    setInterval(()=>{
      ctx.drawImage(video,0,0,width,height);
       let pixels=ctx.getImageData(0,0,width,height);
       pixels=redEffect(pixels);
       ctx.putImageData(pixels,0,0);
    },16);
}

function takePhoto(){

    const image=canvas.toDataURL('image/jpeg');
    const link =document.createElement('a');
    link.href= image;
    link.setAttribute('download','imagename');
    //link.textContent='Download Image';
    link.innerHTML=`<img src="${image}" alt="imagename"/>`;
    strip.insertBefore(link,strip.firstChild);
    console.log(image);
}

function redEffect(pixels){

    for(let i=0;i<pixels.data.length;i+=4)
    {
        pixels.data[i+0]=pixels.data[i+0]-100;
        pixels.data[i+1]=pixels.data[i+1]+150;
        pixels.data[i+2]=pixels.data[i+2]*0.5;
    }
    return pixels;
}





getvideo();
video.addEventListener('canplay',paintToCanvas);