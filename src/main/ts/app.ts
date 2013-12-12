class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

window.onload = () => {
    var el = document.getElementById('content');
    //    var greeter = new Greeter(el);
    //    greeter.start();
    var source = $('#test').html();
    var template = Handlebars.compile(source);
    var html = template({
        width: 100,
        height: 100,
        viewBoxWidth: 100,
        viewBoxHeight: 100
    });
    el.innerHTML = html;

    var rect = document.getElementById("box");
    var animSource = $("#test-anim").html();
    var animTemplate = Handlebars.compile(animSource);
    var animSVG = animTemplate({});
    var anim = parseSVG(animSVG);
    rect.appendChild(anim);

    $(rect).find(".test-anim").each(function () {
        var anim = this;
        this.addEventListener('beginEvent', function () {
            console.log("began!");
        });
        this.addEventListener('endEvent', function () {
            console.log("ended!");
            rect.removeChild(anim);
        });
        this.beginElement();

    });
    
};

function parseSVG(s: string): Node {
    var div = <HTMLElement>document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
    var frag = document.createDocumentFragment();
    while (div.firstChild.firstChild)
        frag.appendChild(div.firstChild.firstChild);
    return frag;
}