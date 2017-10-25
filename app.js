var width = window.innerWidth,
    height = window.innerHeight,
    initialAngle = (width>height)?90:0;

var background = d3.select('#background'),
    planetContainer = d3.select('#planet-container'),
    planetGList = planetContainer.selectAll('.planet');

window.addEventListener('resize',function(){
    width = window.innerWidth;
    height = window.innerHeight;
    initialAngle = (width>height)?90:0;
})

document.querySelectorAll('.close').forEach(function(d){
    d.addEventListener('click',function(e){
        e.target.parentNode.parentNode.className = '';
        planetGList.classed('focus',false).transition()
            .style('opacity', 1);
        background.transition().delay(1000).style('opacity', 0.7);
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
        var a = ([].indexOf.call(t.parentNode.children, t) * -30) + 10;
        t = d3.select(t);
        planetGList.transition().style('opacity', 0);
        t.interrupt();
        t.classed('focus',true);
        //t.transition().duration(1000).style('transform','translate(75px,10px)');
        background.transition().style('opacity', 0);
    });
});