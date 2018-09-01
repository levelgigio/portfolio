$(document).ready(() => {

    var chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        orange_red: 'rgb(255, 69, 0)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };

    var Months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    var color = Chart.helpers.color;
    var barChartData = {
        labels: [],
        datasets: [{
            label: 'Número de comentários',
            backgroundColor: color(chartColors.orange_red).alpha(0.5).rgbString(),
            borderColor: chartColors.orange_red,
            borderWidth: 1,
            data: []
        }]
    };

    var ctx = $('#canvas')[0].getContext('2d');
    var myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Comentários por mês'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        stepSize: 1
                    }
                }]
            }
        }
    });

    function set_labels() {
        var mes_atual = new Date().getMonth();
        for(var i = 1; i <= 12; i++) {
            var month = Months[(mes_atual+i) % Months.length];
            barChartData.labels.push(month);
        }
        myBar.update();
    }

    window.set_playground_graph_data = function (data) {
        if(data.status === "ok") {
            barChartData.datasets[0].data.splice(0, barChartData.datasets[0].data.length);
            var date = new Date();
            var ano_atual = date.getFullYear();
            var mes_atual = date.getMonth();
            var aux = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for(var i = 0; i < data.messages.length; i++) {
                date.setTime(Number(data.messages[i].date));
                if((date.getMonth() > mes_atual && date.getFullYear() < ano_atual) || (date.getMonth() <= mes_atual && date.getFullYear() === ano_atual)) 
                    aux[(11 - mes_atual + date.getMonth()) % 12]++;   
            }
            barChartData.datasets[0].data = aux; 
            myBar.update();
        }
    }

    window.get_playground_data = function (callback) {
        $.get(window.location.protocol + '//' + window.location.host + '/all_messages', (response) => {
            if (callback)
                callback(response);
        })
    }

    set_labels();
    get_playground_data((data) => {
        set_playground_graph_data(data);
    });

});