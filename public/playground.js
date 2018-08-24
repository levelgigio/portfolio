$(document).ready(() => {
    var update_messages = function() {
        $.get(window.location.protocol + '//' + window.location.host + '/all_messages', (response) => {
            print_messages(response);
        });
    }

    var print_messages = function (response) {
        $("#playground-messages").text("");
        var text = "";
        var data = new Date();
        var meses = ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        for(var i = response.messages.length - 1; i >= 0 ; i--) {
            console.log(response.messages[i].date);
            data.setTime(Number(response.messages[i].date));

            text += "Nome: " + response.messages[i].name +"\n" + data.getDate() + " de " + meses[data.getMonth()] + " de " + data.getFullYear() + "   " + data.getHours() + ":" + data.getMinutes() + "\nMensagem: " + response.messages[i].message + "\n" + "\n";
        }
        $("#playground-messages").text(text);
    }

    update_messages();

    $("#playground-text").on('input', () => {
        if($("#playground-text").val() !== "")
            $("#playground-btn").removeClass("disabled");
        else
            $("#playground-btn").addClass("disabled");
    });


    $("#playground-btn").click(() => {
        var message = {
            name: $("#playground-name").val(),
            message: $("#playground-text").val(),
            date: new Date().getTime()
        }

        $.post(window.location.protocol + '//' + window.location.host + '/new_message', message, (response) => {
            if(response.status === "ok")
                update_messages();   
        });
    });
});