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
                window.location.reload()
            }
        });


    });

    $('#search').click(function (e) {

        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/search",
            data: {
                id: $('#searchInputId').val(),
                authers: $('#searchInputAuthers').val(),
                subject: $('#searchInputSubject').val(),
                publisher: $('#searchInputPublisher').val(),
                price: $('#searchInputPrice').val(),
            },
           
            success: function (response) {
                for(i=0;i<response.bookStore.length;i++){
                    $('#myrow'+i+'').remove();
                }
                
                
                for (i = 0; i < response.bookStore.length; i++) {
                    allbodys = '<tr id="myrow' + i + '"> <td>' + response.bookStore[i].id + '</td><td>' + response.bookStore[i].authers + '</td><td>' + response.bookStore[i].subject + '</td><td>' + response.bookStore[i].publisher + '</td><td>' + response.bookStore[i].price + '</td></tr>'
                    $('#allBodySearch').append(allbodys);
                }
            },
        });
       
    });


  
    $('#showAllbook').click(function (e) {

        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "showAllbooks",
            success: function (response) {
                for(i=0;i<response.bookStore.length;i++){
                    $('#myrow'+i+'').remove();
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
                window.location.reload()



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
                window.location.reload()

            }
        });


    });

    

});