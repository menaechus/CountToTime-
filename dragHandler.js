var controls = document.getElementById('controls');

controls.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/plain', (event.clientX - controls.getBoundingClientRect().left) + ',' + (event.clientY - controls.getBoundingClientRect().top));
    event.dropEffect = 'move';
});

document.body.addEventListener('dragover', function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
});

document.body.addEventListener('drop', function(event) {
    var offsets = event.dataTransfer.getData('text/plain').split(',');
    controls.style.left = (event.clientX - offsets[0]) + 'px';
    controls.style.top = (event.clientY - offsets[1]) + 'px';
    event.preventDefault();
});
