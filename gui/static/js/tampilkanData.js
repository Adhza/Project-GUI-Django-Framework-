function tampilkanData() {
        $.ajax({
            type: 'POST',
            url: '/api/view/',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                // Debug only
            },
            complete: function () {
                // Debug only
                   document.getElementById('dataview').style.display = 'block';
            },
            success: function (data) {

                Highcharts.chart('tampilkanGrafik', {
        chart: {
            type: 'spline'
        },

        title: {
            text: 'Data ' + data.title + ' Covid-19'
        },

        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%b %Y',
                year: '%Y'
            },
            title: {
                text: 'Tanggal'
            },
        tickInterval: 30 * 24 * 3600 * 1000, // one week
        tickWidth: 0,
        gridLineWidth: 1,
        labels: {
            align: 'left',
            x: 3,
            y: -3
        }
        },

        yAxis: {
            title: {
                text: 'Jumlah kasus'
            }
        },

        tooltip: {
            shared: true,
            crosshairs: true
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },

        series: [{
            name: data.title,
            data: data.data,
            lineWidth: 2,
            marker: {
                radius: 3
            },
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });


            }
        });

    }
