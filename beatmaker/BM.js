class DrumKit{
    constructor(){
        this.playBtn=document.querySelector(".play")
        this.pads=document.querySelectorAll(".pad");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.selects=document.querySelectorAll('.select');
        this.muteBtns=document.querySelectorAll('.mute');
         this.tempoSlider = document.querySelector(".tempo-slider");
        this.index=0;
        this.bpm=150;
        this.isPlaying=null;
        
        
        
        
        
    }
    activePad(){
        this.classList.toggle("active");
    }
    repeat(){
       let step=this.index%8;
       const activeBars = document.querySelectorAll(`.b${step}`);
       activeBars.forEach(bar=>{
           bar.style.animation=`playTrack 0.3s alternate ease-in-out 2`;
           if(bar.classList.contains("active")){
               if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
               
           
       });
           
       this.index++;    
    }
    
    start(){
        const Interval=(60/this.bpm)*1000;
        if(!this.isPlaying){
           this.isPlaying=setInterval(()=>{
              this.repeat();
           },Interval);
        }else{
            clearInterval(this.isPlaying);
            this.isPlaying=null;
        }
    }
    
    updateBtn(){
        if(!this.isPlaying){
            this.playBtn.innerText='Stop';
             this.playBtn.classList.add('active');
        }else{
           this.playBtn.innerText='Play';
            this.playBtn.classList.remove('active');
        }
    }
    
    changeSound(e){
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
    }
    
    mute(e){
        const mutedBtn=e.target.classList[1];
        const ismuted=e.target.getAttribute('data-track');
        if(ismuted==0){
            e.target.setAttribute('data-track',1);
            switch(mutedBtn){
             case "kick-volume": 
             this.kickAudio.muted=true;
             break;
             case "snare-volume":
             this.snareAudio.muted=true;
             break;
             case "hihat-volume":
                this.hihatAudio.muted=true;
                break; 
              }
        }else{
              e.target.setAttribute('data-track',0);
            switch(mutedBtn){
             case "kick-volume": 
             this.kickAudio.muted=false;
             break;
             case "snare-volume":
             this.snareAudio.muted=false;
             break;
             case "hihat-volume":
                this.hihatAudio.muted=false;
                break; 
              }
            
        }
    }
    
     changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");

    tempoText.innerText = e.target.value;
  }
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }

    
    
    
};

const drumkit=new DrumKit();

drumkit.pads.forEach(pad=>{
       pad.addEventListener("click",drumkit.activePad);
       pad.addEventListener("animationend", function() {
        this.style.animation = "";
  });
  })

drumkit.playBtn.addEventListener("click",function(){
    drumkit.start();
    drumkit.updateBtn();
   
});

drumkit.selects.forEach(select=>{
    select.addEventListener("change",function(e){
       drumkit.changeSound(e);
    })
})

drumkit.muteBtns.forEach(muteBtn=>{
    muteBtn.addEventListener("click",function(e){
        drumkit.mute(e);
        
    })
    
})

drumkit.tempoSlider.addEventListener("input", function(e) {
  drumkit.changeTempo(e);
});
drumkit.tempoSlider.addEventListener("change", function(e) {
  drumkit.updateTempo(e);
});

