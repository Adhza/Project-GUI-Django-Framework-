$(document).on('submit', "#formUpload", function(e){
	e.preventDefault();
	const formData = new FormData(this);

	$.ajax({
		type:'POST',
		url:'/api/hw/',
		data: formData,
		cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
                    // Debug only
        },
        complete: function () {
                    // Debug only
            document.getElementById('forecast').style.display = 'block';
        },
		success:function(data){
		    console.log(data)

		    document.getElementById("mape").value = data.mape


			Highcharts.chart('hasilGrafik', {
        chart: {
            type: 'spline'
        },

        title: {
            text: 'Prediksi ' + data.title + ' Covid-19'
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
            name: 'Aktual',
            data: data.aktual,
            lineWidth: 2,
            marker: {
                radius: 3
            },
        }, {
            name: 'Prediksi',
            data: data.prediksi,
            lineWidth: 1,
            marker: {
                radius: 3
            },
            dashStyle: 'Dash',
            color: Highcharts.getOptions().colors[8]
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
        })


});

