$(document).ready(() => {
    $('#qr').keyup(() => {
        var dat = $('#qr').val()

        if(dat != ''){

            $('#butt').prop("hidden", false)
            $("#my_image").attr("width", 300)

            $.ajax({
                url: '/create_qr',
                method: 'POST',
                data: {data:dat},

                success: (data) => {
                    $("#my_image").attr("src", data);
                }
            })
        }
    })

    $('#butt').on('click', () => {
        var val = $('#qr').val()

        $.ajax({
            url: '/download_qr',
            method: 'POST',
            data: {dat:val},

            success: (dat) => {
                alert("Fayl yuklandi...")
                window.location.href = '/'
            }
        })
    })

    var d = new Date()
    $('#year').text(d.getFullYear())
})