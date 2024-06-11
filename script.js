// Inicia o áudio de fundo
    var bgAudio = document.getElementById('bg-audio');
    bgAudio.play();

var love = setInterval(function(){
  var r_num = Math.floor(Math.random() * 40) + 1;
	var r_size = Math.floor(Math.random() * 65) + 10;
	var r_left = Math.floor(Math.random() * 100) + 1;
	var r_bg = Math.floor(Math.random() * 25) + 100;
  var r_time = Math.floor(Math.random() * 5) + 5;
  
  $('.bg_heart').append("<div class='heart' style='width:"+r_size+"px;height:"+r_size+"px;left:"+r_left+"%;background:rgba(255,"+(r_bg-25)+","+r_bg+",1);-webkit-animation:love "+r_time+"s ease;-moz-animation:love "+r_time+"s ease;-ms-animation:love "+r_time+"s ease;animation:love "+r_time+"s ease'></div>");
  
  $('.bg_heart').append("<div class='heart' style='width:"+(r_size-10)+"px;height:"+(r_size-10)+"px;left:"+(r_left+r_num)+"%;background:rgba(255,"+(r_bg-25)+","+(r_bg+25)+",1);-webkit-animation:love "+(r_time+5)+"s ease;-moz-animation:love "+(r_time+5)+"s ease;-ms-animation:love "+(r_time+5)+"s ease;animation:love "+(r_time+5)+"s ease'></div>");
  
  $('.heart').each(function(){
    var top = $(this).css("top").replace(/[^-\d\.]/g, '');
    var width = $(this).css("width").replace(/[^-\d\.]/g, '');
    if(top <= -100 || width >= 150){
      $(this).detach();
    }
  });
},500);

$(document).ready(function(){
    // Inicia o áudio de fundo
    var bgAudio = document.getElementById('bg-audio');
    bgAudio.play();
    
    var lines = [
        "Oi amor, tudo bem com você?",
        "Sei que já faz um tempo que eu já deveria ter te pedido isso...",
        "Então venho aqui finalmente te fazer esse pedido.",
        "Você aceita namorar comigo?"
    ];

    var index = 0;
    var typingSpeed = 100; // Velocidade de digitação em milissegundos

    function typeWriter() {
        var line = lines[index];
        var elementId = "line" + (index + 1);
        var i = 0;
        var txt = '';

        function type() {
            if (i < line.length) {
                txt += line.charAt(i);
                $('#' + elementId).html(txt);
                i++;
                setTimeout(type, typingSpeed);
            }
        }

        type();

        index++;
        if (index < lines.length) {
            setTimeout(typeWriter, line.length * typingSpeed + 1000);
        } else {
            $('.glass-card h2, .glass-card p').remove();
            $('.glass-card').append('<h2 id="line4">' + lines[3] + '</h2>');
            setTimeout(function() {
                $('.glass-card').append('<div id="buttons"><button class="btn btn-yes">Sim</button><button class="btn btn-no">Não</button></div>');
                
                var audioComemorando = document.getElementById('audio-comemorando');
                var audioTristeza = document.getElementById('audio-tristeza');

                $('.btn-no').click(function() {
                    console.log("Botão Não clicado");
                    audioTristeza.play(); // Tocar o áudio tristeza.mp3
                    var nonoTexts = ["Certeza?", "Sério? :(", "Eu vou ficar tristão", "Muito tristão", "Aceita momoi", "Pufavo"];
                    var nonoIndex = 0;
                    
                    $(this).text(nonoTexts[nonoIndex]);
                    $(this).off("click");
                    $(this).click(function() {
                        console.log("Texto atualizado");
                        nonoIndex = (nonoIndex + 1) % nonoTexts.length;
                        $(this).text(nonoTexts[nonoIndex]);
                    });
                });

                $('.btn-yes').click(function() {
                    console.log("Botão Sim clicado");
                    audioComemorando.play(); // Tocar o áudio comemorando.mp3
                    $('.glass-card').empty().append('<h2>Agora eu e momo somos oficialmente namorados!!! Eu te amo minha princesa!!! ❤️</h2>');
                    $('.gif-container').removeClass('hidden');
                    
                    function addConfetti() {
                        let params = {
                            particleCount: 500,
                            spread: 90,
                            startVelocity: 70,
                            origin: { x: 0, y: 0.5 },
                            angle: 45
                        };
                        confetti(params);
                        params.origin.x = 1;
                        params.angle = 135;
                        confetti(params);
                    }

                    addConfetti();
                    setTimeout(addConfetti, 2000);
                    setTimeout(addConfetti, 4000);
                });
            }, line.length * typingSpeed + 1000);
        }
    }

    typeWriter();
});