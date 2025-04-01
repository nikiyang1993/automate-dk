document.addEventListener('DOMContentLoaded', () => {
    // 导航切换
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // 计时器功能
    let timerInterval;
    let isPaused = false;
    const timerDisplay = document.getElementById('timer');
    const pauseBtn = document.querySelector('.pause-btn');
    const executeBtn = document.querySelector('.execute-btn');
    const statusDot = document.querySelector('.status-dot');

    function updateTimer(timeString) {
        timerDisplay.textContent = timeString;
    }

    function formatTime(hours, minutes, seconds) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startTimer(hours = 2, minutes = 45, seconds = 29) {
        clearInterval(timerInterval);
        let totalSeconds = hours * 3600 + minutes * 60 + seconds;

        timerInterval = setInterval(() => {
            if (!isPaused) {
                totalSeconds--;
                if (totalSeconds < 0) {
                    clearInterval(timerInterval);
                    executeRandomUrl();
                    return;
                }

                const h = Math.floor(totalSeconds / 3600);
                const m = Math.floor((totalSeconds % 3600) / 60);
                const s = totalSeconds % 60;

                updateTimer(formatTime(h, m, s));
            }
        }, 1000);
    }

    function executeRandomUrl() {
        // 这里可以添加实际的URL执行逻辑
        console.log('Executing random URL...');
        // 重新开始计时
        startTimer();
    }

    // 暂停按钮功能
    pauseBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? '继续' : '暂停';
        statusDot.style.backgroundColor = isPaused ? '#f44336' : '#4CAF50';
    });

    // 立即执行按钮功能
    executeBtn.addEventListener('click', () => {
        executeRandomUrl();
    });

    // 初始化计时器
    startTimer();
}); 