(function () {

    //获取到viewport，如果获取到了就表示代码中写了，一会直接把content换成替换之后的；如果viewport不存在就说明没写，我们就自己创建这个标签然后插入
    var viewportEl = document.querySelector('meta[name="viewport"]');
    //获取dpr设备像素比，如果没有获取到就默认为1
    var dpr = window.devicePixelRatio || 1;
    //设置最大最小值，大于540我们就不希望继续变大了，小于320我们就不希望继续变小了
    var maxWidth = 540;
    var minWidth = 320;

    //如果获取到了dpr，那么我们需要对其进行处理，因为获取到的dpr不一定是整数
    dpr = dpr >= 3 ? 3 : (dpr >= 2 ? 2 : 1);   //处理后dpr的值只会是1，2，3这三个值
    //给html增加一个自定义属性，可以让我们一目了然看到dpr设备像素比
    document.documentElement.setAttribute('data-dpr', dpr);
    document.documentElement.setAttribute('max-width', maxWidth);
    document.documentElement.setAttribute('min-width', minWidth);

    //计算scale
    var scale = 1 / dpr;
    var content = 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no';

    //判断前面获取到的viewport是否存在
    if (viewportEl) {
        //如果存在，则对其content属性进行值的修改
        viewportEl.setAttribute('content', content);
    } else {
        //如果没有获取到，则自行创建
        viewportEl = document.createElement('meta');
        viewportEl.setAttribute('name', viewport);
        viewportEl.setAttribute('content', content);
        //上树
        document.head.appendChild(viewportEl);
    }


    setRemUnit();

    window.addEventListener('resize', setRemUnit);

    function setRemUnit() {
        var ratio = 18.75;
        var viewWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth;
        console.log(viewWidth);
        // 设置html的font-size
        if (maxWidth && (viewWidth / dpr > maxWidth)) {
            viewWidth = maxWidth * dpr;
        }
        else if (minWidth && (viewWidth / dpr < minWidth)) {
            viewWidth = minWidth * dpr;
        }

        document.documentElement.style.fontSize = viewWidth / ratio + 'px';
    }
})();