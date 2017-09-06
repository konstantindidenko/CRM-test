$(document).ready(function() {

    $('a').click(function(e) {
        alert('you click something');
       e.preventDefault();
    });

});