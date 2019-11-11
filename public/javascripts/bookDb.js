$(document).ready(function () {

    $('#book').click(function (e) {
        e.preventDefault();

        $.ajax({
            type: "PUT",
            url: "/addBook",
            data: {
                id: $('#id').val(),
                authers: $('#authers').val(),
                subject: $('#subject').val(),
                publisher: $('#publisher').val(),
                price: $('#price').val(),
            },


            success: function (response) {
                window.location.replace('/login')
            }
        });


    });
    $('#showAllbook').click(function (e) {

        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "showAllbooks",
            success: function (response) {
                console.log(response)
                for (i = 0; i < response.bookStore.length; i++) {
                    $('#myrow' + i + '').remove();
                }
                for (i = 0; i < response.bookStore.length; i++) {
                    allbody = '<tr id="myrow' + i + '"><td>' + response.bookStore[i].id + '</td><td>' + response.bookStore[i].authers + '</td><td>' + response.bookStore[i].subject + '</td><td>' + response.bookStore[i].publisher + '</td><td>' + response.bookStore[i].price + '</td></tr>'
                    $('#allBody').append(allbody);
                }
            }
        });


    });

    $('#edit').click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/editBook",
            data: {
                id: $('#id').val(),
                authers: $('#authers').val(),
                subject: $('#subject').val(),
                publisher: $('#publisher').val(),
                price: $('#price').val(),
            },

            success: function (response) {
                window.location.replace('/login')




            }
        });
    });
    $('#delete').click(function (e) {

        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/delete",
            data: {
                id: $('#id').val(),
                authers: $('#authers').val(),
                subject: $('#subject').val(),
                publisher: $('#publisher').val(),
                price: $('#price').val(),
            },
            success: function (response) {
                window.location.replace('/login')

            }
        });


    });



});