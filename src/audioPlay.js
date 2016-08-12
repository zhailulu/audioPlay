(function ($){
    $.fn.audioPlay = function(options){
       var settings, page, audioElem = $(this)[0],
       settings = $.extend({}, $.fn.audioPlay.defaults, options),
       canvas = $("#"+settings.canvasId)[0], playClass = settings.playClass,
       pauseClass = settings.pauseClass;

       audio = {
          drawCircle : function (canvas, percentage) {
                var clientWidth = document.documentElement.clientWidth;
                var canvasWidth = Math.floor(clientWidth * 80 / 750);
                var innerR = canvasWidth * 0.8 * 0.5;//半径
                var ctx;
                canvas.setAttribute('width', canvasWidth + 'px');
                canvas.setAttribute('height', canvasWidth + 'px');
                
                if (canvas.getContext) {
                    ctx = canvas.getContext('2d');
                }
                ctx.translate(canvasWidth / 2, canvasWidth / 2);
                ctx.beginPath();
                ctx.arc(0, 0, innerR, 0, Math.PI * 2, false);
                ctx.lineWidth = 5;
                ctx.strokeStyle = "#ddd";
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 0, innerR, Math.PI * 3 / 2, (Math.PI * 3 / 2 + Math.PI * 2 / 180 + percentage * Math.PI * 2), false);
                ctx.lineWidth = 5;
                ctx.strokeStyle = "#ea8010";
                ctx.stroke();
          },

          setProgress : function(){
                if (!isNaN(music.duration)) {
                      var progressValue = music.currentTime/music.duration; //用时间比来获取进度条的值
                      if(progressValue == 1){
                          progressValue=0;//当播放完成，进度条跳到开始
                      }
                      audio.drawCircle(canvas,progressValue);

                }
          }
        }

        if(!audioElem){
            return;
        }

        audioElem.addEventListener('timeupdate',function(){
            audio.setProgress();
        },false);

        audioElem.addEventListener("ended", function(){
            $("#"+settings.canvasId).removeClass(playClass).addClass(pauseClass);
        });

        $("#"+settings.canvasId).on("click", function(){
            if($(this).hasClass(playClass)){
                audioElem.play();
                $(this).removeClass(playClass).addClass(pauseClass);
            }else if($(this).hasClass(pauseClass)){
                audioElem.pause();
                $(this).removeClass(pauseClass).addClass(playClass);
            }
            
        });


        audio.drawCircle(canvas,0);
        $("#"+settings.canvasId).show();
      }
    
      /**
       * 插件的默认值
       */
      $.fn.audioPlay.defaults = {
          canvasId : "canvas",
          playClass : "canvas-play",
          pauseClass : "canvas-pause"
      };

})(Zepto)