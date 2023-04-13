let acao = document.getElementById('acao')
let pausa = document.getElementById('pausa')
let sessoes = document.getElementById('sessoes')
let segundos

var bell = new Audio('./audio/audio_bell.mp3')
var volta = new Audio("./audio/audio_volta.mp3")
var final = new Audio("./audio/audio_final.mp3")

var lofi = document.getElementById('lofi')
var pause = document.getElementById('pause')
var play = document.getElementById('play')

function pausar(){
    lofi.pause()
    play.style.setProperty('display', 'block', 'important')
    pause.style.setProperty('display', 'none', 'important')

}
function executar(){
    lofi.play()
    play.style.setProperty('display', 'none', 'important')
    pause.style.setProperty('display', 'block', 'important')
}

function iniciar() {
    if (acao.value == 0) {
        document.getElementById('erro_acao').innerHTML = "Adicione o tempo de ação"
        acao.focus()
    } else if (pausa.value == 0) {
        document.getElementById('erro_pausa').innerHTML = "Adicione o tempo de pausa"
        pausa.focus()
    } else if (sessoes.value == 0) {
        document.getElementById('erro_sessoes').innerHTML = "Adicione o número de sessões"
        sessoes.focus()
    } else {
        lofi.play()
        lofi.volume = 0.05
        pause.style.setProperty('display', 'block', 'important')

        localStorage.setItem('acao', String(acao.value))
        localStorage.setItem('pausa', String(pausa.value))
        localStorage.setItem('sessoes', String(sessoes.value))

        document.getElementById('config').style.setProperty('display', 'none', 'important')
        document.getElementById('timer').style.setProperty('display', 'block', 'important')

        momentoAcao()
    }

    function momentoAcao() {

        let sessoes_valor = localStorage.getItem('sessoes')

        if (sessoes_valor != '1') {
            document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessões restantes'
        } else {
            document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessão restante'
        }

        let title = document.getElementById('title')
        title.innerHTML = "Ação"
        title.style.fontSize = '25pt'
        title.style.fontWeight = 'bold'
        title.style.setProperty('color', '#39AF5B', 'important')

        min = Number(localStorage.getItem('acao'))

        min = min - 1
        var min_format = (min < 10 ? '0' + min : min)
        segundos = 59
        var seg_format = (segundos < 10 ? '0' + segundos : segundos)

        document.getElementById('minutes_ok').innerHTML = min_format
        document.getElementById('seconds_ok').innerHTML = seg_format

        var min_interval = setInterval(minTimer, 60000)
        var seg_interval = setInterval(segTimer, 1000)
        var title_interval = setInterval(atualizaTitle, 1000);

        function minTimer() {
            min =  min - 1
            var min_format = (min < 10 ? '0' + min : min)
            document.getElementById('minutes_ok').innerHTML = min_format
        }

        function segTimer() {
            segundos = segundos - 1
            var seg_format = (segundos < 10 ? '0' + segundos : segundos)
            document.getElementById('seconds_ok').innerHTML = seg_format

            if (segundos <= 0) {
                if (min <= 0) {
                    clearInterval(min_interval)
                    clearInterval(seg_interval)
                    clearInterval(title_interval)

                    bell.play()
                    bell.volume = 0.05
                    momentoPausa()
                }
                segundos = 60
                
            }
        }
        function atualizaTitle(){
            var titulo = (min < 10 ? '0' + min : min) + ':' + (segundos < 10 ? '0' + segundos : segundos)
			document.title = 'Pomodoro Ação ' + titulo;
        }
        
    }

    function momentoPausa() {
        let title = document.getElementById('title')
        title.innerHTML = "Pausa"
        title.style.fontSize = '25pt'
        title.style.fontWeight = 'bold'
        title.style.setProperty('color', '#6441a5', 'important')

        min_pausa = Number(localStorage.getItem('pausa'))

        min_pausa = min_pausa - 1
        var min_pausa_format = (min_pausa < 10 ? '0' + min_pausa : min_pausa)
        segundos = 59
        var seg_format = (segundos < 10 ? '0' + segundos : segundos)

        document.getElementById('minutes_ok').innerHTML = min_pausa_format
        document.getElementById('seconds_ok').innerHTML = seg_format

        var min_interval = setInterval(minTimer, 60000)
        var seg_interval = setInterval(segTimer, 1000)
        var title_interval = setInterval(atualizaTitle, 1000);

        function minTimer() {
            min_pausa = min_pausa - 1
            var min_pausa_format = (min_pausa < 10 ? '0' + min_pausa : min_pausa)
            document.getElementById('minutes_ok').innerHTML = min_pausa_format
        }

        function segTimer() {
            segundos = segundos - 1
            var seg_format = (segundos < 10 ? '0' + segundos : segundos)
            document.getElementById('seconds_ok').innerHTML = seg_format

            if (segundos <= 0) {
                if (min_pausa <= 0) {
                    ses = Number(localStorage.getItem('sessoes'))
                    ses = ses - 1
                    localStorage.setItem('sessoes', String(ses))

                    clearInterval(min_interval)
                    clearInterval(seg_interval)
                    clearInterval(title_interval)
                    if (ses <= 0) {
                        final.play()
                        final.volume = 0.05
                        localStorage.clear()
                        document.getElementById('config').style.setProperty('display', 'none', 'important')
                        document.getElementById('timer').style.setProperty('display', 'none', 'important')
                        document.getElementById('fim').style.setProperty('display', 'block', 'important')
                    } else {
                        volta.play()
                        volta.volume = 0.05
                        momentoAcao()
                    }
                }
                segundos = 60
            }
        }
        function atualizaTitle(){
            var titulo = (min_pausa < 10 ? '0' + min_pausa : min_pausa) + ':' + (segundos < 10 ? '0' + segundos : segundos)
            document.title = 'Pomodoro Pausa ' + titulo;
        }
    }

}