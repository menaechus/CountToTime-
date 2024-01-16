var controls = document.getElementById('controls');
        var timeInput = document.getElementById('time');
        var startButton = document.getElementById('start');
        var countdown = document.getElementById('countdown');
        
        var bgColorInput = document.getElementById('bgcolor');
        var fontColorInput = document.getElementById('fontcolor');
        var fontSizeInput = document.getElementById('fontsize');
        var fontSizeLabel = document.querySelector('label[for="fontsize"]');
        var fontColorLabel = document.querySelector('label[for="fontcolor"]');
        var bgColorLabel = document.querySelector('label[for="bgcolor"]');

        var horizontalInput = document.getElementById('horizontal');
        var verticalInput = document.getElementById('vertical');

        var countdownDisplay = document.getElementById('countdown');
        var countdownId;
        var fontFamilyInput = document.getElementById('fontfamily');

        fontFamilyInput.addEventListener('change', function() {
            countdownDisplay.style.fontFamily = this.value;
        });

        var fontWeightInput = document.getElementById('fontweight');

        fontWeightInput.addEventListener('change', function() {
            countdownDisplay.style.fontWeight = this.value;
        });

        bgColorInput.addEventListener('input', function() {
            document.body.style.backgroundColor = this.value;
        });

        fontColorInput.addEventListener('input', function() {
            document.body.style.color = this.value;
        });

        fontSizeInput.addEventListener('input', function() {
            countdownDisplay.style.fontSize = this.value + 'px';
        });
        
        
        window.addEventListener('keydown', function(event) {
            switch (event.key) {
                case 'Enter':
                    startButton.click();
                    break;
                case 's':
                    // If the controls are currently visible, hide them; otherwise, show them
                    if (controls.style.visibility !== 'hidden') {
                        hideInput();
                    } else {
                        showInput();
                    }
                    break;
                case 'Escape':
                    stopCountdown();
                    break;
                case 'h':
                    //toggle countdownDisplay visibility
                    toggleFade('countdown-container');
                    break;
                    
            }
        });

        function toggleFade(elementId) {
            var element = document.getElementById(elementId);
            if (element.classList.contains('visible')) {
                element.classList.remove('visible');
            } else {
                element.classList.add('visible');
            }
        }
        
        startButton.addEventListener('click', function() {
            var time = timeInput.value;
            if (!time) {
                alert('Please fill in the time');
                return;
            }
            var parts = time.split(':');
            parts[2] = parts[2] || '00'; // If seconds are not provided, assume it to be '00'
            var now = new Date();
            var targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...parts);
            var diffInSeconds = Math.floor((targetTime - now) / 1000);
            if (diffInSeconds > 0) {
                if(countdownId) {
                    clearInterval(countdownId);
                }
                countdownId = startCountdown(diffInSeconds);
                countdownDisplay.style.display = 'flex'; // Make sure the countdown display is visible
                toggleFade('countdown-container');
            }
        });

        function startCountdown(seconds) {
            return setInterval(function() { // Return the ID returned by setInterval
                var hours = Math.floor(seconds / 3600);
                var minutes = Math.floor((seconds % 3600) / 60);
                var remainingSeconds = seconds % 60;

                // Convert minutes and remainingSeconds to strings and pad with 0s
                minutes = String(minutes).padStart(2, '0');
                remainingSeconds = String(remainingSeconds).padStart(2, '0');

                // If hours is 0, don't include it in the countdown display
                if (hours === 0) {
                    countdownDisplay.textContent = `${minutes}:${remainingSeconds}`;
                } else {
                    countdownDisplay.textContent = `${hours}:${minutes}:${remainingSeconds}`;
                }

                seconds--;
                if (seconds < 0) {
                    stopCountdown();
                }
            }, 1000);
        }

        function stopCountdown() {
            clearInterval(countdownId);
            toggleFade('countdown-container');
            
        }

        window.showInput = function() {
            controls.style.visibility = 'visible'; // Show the controls
            controls.style.display = 'flex';
        }

        function hideInput() {
            controls.style.visibility = 'hidden'; // Hide the controls
        }

        
        countdownDisplay.style.display = 'flex';
        countdownDisplay.style.flexDirection = 'column';
        

        horizontalInput.addEventListener('change', function() {
            countdownDisplay.style.alignItems = this.value;
        });

        verticalInput.addEventListener('change', function() {
            countdownDisplay.style.justifyContent = this.value;
        });

        var controls = document.getElementById('controls');

        controls.addEventListener('dragstart', function(event) {
            event.dataTransfer.setData('text/plain', (event.clientX - controls.offsetLeft) + ',' + (event.clientY - controls.offsetTop));
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

        