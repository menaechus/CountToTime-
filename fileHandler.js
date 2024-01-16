var exportButton = document.getElementById('export');
var importButton = document.getElementById('import');
var fileInput = document.getElementById('file');

var bgColorInput = document.getElementById('bgcolor');
var fontColorInput = document.getElementById('fontcolor');
var fontSizeInput = document.getElementById('fontsize');
var fontFamilyInput = document.getElementById('fontfamily');
var fontWeightInput = document.getElementById('fontweight');
var horizontalInput = document.getElementById('horizontal');
var verticalInput = document.getElementById('vertical');
var timeInput = document.getElementById('time');
var countdownDisplay = document.getElementById('countdown');

// Rest of your code...

exportButton.addEventListener('click', function() {
    var config = {
        time: timeInput.value,
        bgColor: bgColorInput.value,
        fontColor: fontColorInput.value,
        fontSize: fontSizeInput.value,
        fontFamily: fontFamilyInput.value,
        fontWeight: fontWeightInput.value,
        horizontal: horizontalInput.value,
        vertical: verticalInput.value
    };

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "config.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});

importButton.addEventListener('click', function() {
    fileInput.click();
});

fileInput.addEventListener('change', function() {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var config = JSON.parse(e.target.result);
        timeInput.value = config.time;
        bgColorInput.value = config.bgColor;
        fontColorInput.value = config.fontColor;
        fontSizeInput.value = config.fontSize;
        fontFamilyInput.value = config.fontFamily;
        fontWeightInput.value = config.fontWeight;
        horizontalInput.value = config.horizontal;
        verticalInput.value = config.vertical;

        // Apply the imported configuration to the styles
        document.body.style.backgroundColor = config.bgColor;
        countdownDisplay.style.color = config.fontColor;
        countdownDisplay.style.fontSize = config.fontSize + 'px';
        countdownDisplay.style.fontFamily = config.fontFamily;
        countdownDisplay.style.fontWeight = config.fontWeight;
        countdownDisplay.style.justifyContent = config.horizontal;
        countdownDisplay.style.alignItems = config.vertical;
    };
    reader.readAsText(file);
});