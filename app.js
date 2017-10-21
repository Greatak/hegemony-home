document.querySelectorAll('.close').forEach(function(d){
    d.addEventListener('click',function(e){
        e.target.parentNode.parentNode.className = '';
    });
});

document.querySelectorAll('.planet').forEach(function(d){
    d.addEventListener('click',function(e){
        document.querySelectorAll('article').forEach(function(d){
            d.className = '';
        });
        var t = e.target.parentNode;
        if(t.getAttribute('class') != 'planet') t = t.parentNode;
        document.getElementById(t.querySelector('text').textContent.toLowerCase()).className = 'open';
    });
});