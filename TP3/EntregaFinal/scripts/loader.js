let percentage = 0;

const interval = setInterval(function() {
    percentage++;
    document.getElementById('percentage').innerText = percentage + '%';
    if (percentage >= 100) {
        clearInterval(interval); 
    }
}, 40);

setTimeout(function() {
    document.getElementById('loader').style.display = 'none';
}, 5000); 