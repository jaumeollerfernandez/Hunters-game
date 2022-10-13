class Audio{
    constructor(config){
        

    }

    playAudio(){
        document.addEventListener("keypress" , function(e){
            if (e.code = this.mapKeys) {
                document.getElementById('audio').play();
            }else{
                document.getElementById('audio').onpause();
            }
        }
        )
    }

}