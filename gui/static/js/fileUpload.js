const input = document.getElementById('inputDataset');
input.addEventListener('change', upload_async);

function upload_async(){

	const formData = new FormData();
	formData.append('inputDataset', $('input[type=file]')[0].files[0])

	        $.ajax({
            type: 'POST',
            url: '/api/upload/',
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,

            beforeSend: function() {
                // do something

            },

            complete: function() {
            	document.getElementById('tampilkan').classList.remove("disabled")
				document.getElementById('ramalan').classList.remove("disabled")
            },

            success: function(data){
                // Debug Only
				console.log(data)
            }

        })



}

