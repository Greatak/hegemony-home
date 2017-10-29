var bodies = [];
function Body(obj){
    this.children = [];
    this.orbitalSpace = 0;

    for(var i in obj) this[i] = obj[i];

    if(this.orbiting >= 0){
        this.orbiting = bodies[this.orbiting];
        this.orbiting.children.push(this)
    }
    bodies.push(this);
}

var width = 0,
    height = 0,
    vmin = 0;

var svg = d3.select('svg');
var scene;

function init(){
    width = window.innerWidth;
    height = window.innerHeight;
    vmin = width>height?height:width;
    svg.html('')
        .attr('width',width)
        .attr('height',height);
    scene = svg.append('g')
        .style('transform','translate('+ (width/2) +'px,' + height + 'px)');
    var pixelsToMM = 0,
        widthMM = 0,
        totalDistance = 0;
    bodies.forEach(function(d,i){
        d.orbitalSpace = d.size*((d.name=='sun')?0.4:0.5);
        if(i){
            d.orbiting.orbitalSpace += d.size/2 + 2;
            var childrenSize = 0;
            d.children.forEach(function(c){
                childrenSize += c.size + 4;
            });
            d.orbiting.orbitalSpace += childrenSize/2;
            d.distance = d.orbiting.orbitalSpace
            d.orbiting.orbitalSpace += d.size/2 + 2 + childrenSize/2;

            if(d.angle){
                d.angle *= -0.0174533;
            }
            if(!d.orbiting.orbiting){
                var a = widthMM;
                var angleRange = 2.7;
                if(a < d.distance*2){
                    var angleRange = 2 * arcctg(Math.sqrt((4*d.distance*d.distance)-(a*a))/a);
                }
                a = (angleRange / 6) * ((d.orbiting.children.indexOf(d)%3 * 2) + 1);
                d.angle = -Math.PI/2 - angleRange/2 + a;
            }else{
                d.angle = -Math.random()*Math.PI/2-Math.PI/4;
            }
            d.x = d.distance * Math.cos(d.angle) + d.orbiting.x;
            d.y = d.distance * Math.sin(d.angle) + d.orbiting.y;
            if(d.orbiting){
                scene.append('circle')
                    .classed('orbit',true)
                    .attr('r', d.distance + 'mm')
                    .attr('cx', d.orbiting.x + 'mm')
                    .attr('cy', d.orbiting.y + 'mm');
                scene.append('circle')
                    .classed('object-outline',true)
                    .attr('r', (d.size / 2) + 'mm')
                    .attr('cx', d.x + 'mm')
                    .attr('cy', d.y + 'mm');
                if(d.size > 0){
                    scene.append('image')
                        .attr('xlink:href',d.img)
                        .attr('x',(d.x) + 'mm')
                        .attr('y',(d.y) + 'mm')
                        .attr('height',(d.size-2) + 'mm')
                        .on('load',function(){
                            this.style.transform = 'translate(-50%, -50%)';
                        })
                    scene.append('text')
                        .text(d.name)
                        .attr('x', d.x + ((d.x > 0)?-d.size/2-1:d.size/2+1) + 'mm')
                        .attr('y', d.y + 'mm')
                        .style('text-anchor',(d.x > 0)?'end':'start');
                }
            }
        }else{
            scene.append('image')
                .attr('xlink:href',d.img)
                .attr('x',(d.x) + 'mm')
                .attr('y',(d.y) + 'mm')
                .attr('height',(d.size) + 'mm')
                .on('load',function(){
                    this.style.transform = 'translate(-50%, -50%)';
                })
            pixelsToMM = document.querySelector('image').getBoundingClientRect().width/50;
            widthMM = width/pixelsToMM;
        }
    });
}
window.addEventListener('load',init);
window.addEventListener('resize',init);
function arcctg(x) { return Math.PI / 2 - Math.atan(x); }