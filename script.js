// 中文生日应用 JavaScript

let balloonScore = 0;
let candlesBlown = 0;
const totalCandles = 8;

// 应用初始化
document.addEventListener('DOMContentLoaded', function() {
    // 为惊喜按钮添加点击事件
    document.getElementById('surpriseBtn').addEventListener('click', showSurprise);
});

// 惊喜按钮功能
function showSurprise() {
    createConfetti();
    showBirthdayMessage();
    playHappyAnimation();
}

// 创建彩带动画
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffeaa7', '#fab1a0', '#fd79a8'];
    
    // 清除现有彩带
    confettiContainer.innerHTML = '';
    
    // 创建50个彩带片段
    for (let i = 0; i < 50; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.left = Math.random() * 100 + '%';
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.animationDelay = Math.random() * 3 + 's';
        confettiPiece.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confettiContainer.appendChild(confettiPiece);
    }
    
    // 动画结束后移除彩带
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 5000);
}

// 显示生日祝福消息
function showBirthdayMessage() {
    const messages = [
        "🎉 你是世界上最棒的8岁小朋友！🎉",
        "🌟 希望你的生日和你一样特别！🌟",
        "🎂 许个愿望然后吹蜡烛吧！🎂",
        "🦄 愿你今天所有的梦想都成真！🦄",
        "🌈 你给每个人都带来了快乐！🌈"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // 创建弹窗消息
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        z-index: 1001;
        text-align: center;
        font-size: 1.5rem;
        color: #ff6b6b;
        border: 3px solid #4ecdc4;
        animation: popup 0.5s ease-out;
        font-weight: bold;
    `;
    
    popup.innerHTML = `
        <div>${randomMessage}</div>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 20px;
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-family: inherit;
            font-weight: bold;
        ">关闭</button>
    `;
    
    document.body.appendChild(popup);
    
    // 添加弹窗动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popup {
            0% { transform: translate(-50%, -50%) scale(0); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// 播放快乐动画
function playHappyAnimation() {
    const title = document.querySelector('.birthday-title');
    title.style.animation = 'none';
    setTimeout(() => {
        title.style.animation = 'bounce 0.5s ease-in-out 3';
    }, 10);
}

// 戳气球游戏
function popBalloon(balloon) {
    if (!balloon.classList.contains('popped')) {
        balloon.classList.add('popped');
        balloonScore++;
        document.getElementById('balloonScore').textContent = balloonScore;
        
        // 爆炸效果（视觉反馈）
        balloon.textContent = '💥';
        setTimeout(() => {
            balloon.textContent = '🎈';
        }, 500);
        
        // 检查是否所有气球都被戳破
        if (balloonScore >= 5) {
            setTimeout(() => {
                alert('🎉 太棒了！你戳破了所有气球！🎉');
                createConfetti();
            }, 500);
        }
    }
}

// 重置气球游戏
function resetBalloons() {
    const balloons = document.querySelectorAll('.game-balloon');
    balloons.forEach(balloon => {
        balloon.classList.remove('popped');
        balloon.textContent = '🎈';
    });
    balloonScore = 0;
    document.getElementById('balloonScore').textContent = balloonScore;
}

// 吹蜡烛游戏
function blowCandle(candle) {
    if (!candle.classList.contains('blown')) {
        candle.classList.add('blown');
        candlesBlown++;
        
        // 视觉反馈
        candle.textContent = '💨';
        setTimeout(() => {
            candle.textContent = '🕯️';
        }, 1000);
        
        // 更新消息
        const message = document.getElementById('candleMessage');
        if (candlesBlown < totalCandles) {
            message.textContent = `太好了！已经吹灭了 ${candlesBlown} 根蜡烛，还剩 ${totalCandles - candlesBlown} 根！`;
        } else {
            message.textContent = '🎉 所有蜡烛都吹灭了！快许个愿吧！🎉';
            createConfetti();
            setTimeout(() => {
                alert('🎂 生日快乐！你的愿望一定会实现的！🎂');
            }, 1000);
        }
    }
}

// 重置蜡烛游戏
function resetCandles() {
    const candles = document.querySelectorAll('.candle');
    candles.forEach(candle => {
        candle.classList.remove('blown');
        candle.textContent = '🕯️';
    });
    candlesBlown = 0;
    document.getElementById('candleMessage').textContent = '点击蜡烛来吹灭它们！';
}

// 添加生日魔法效果
function addBirthdayMagic() {
    // 随机气球飘动
    setInterval(() => {
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach(balloon => {
            if (Math.random() > 0.7) {
                balloon.style.transform = `translateY(${Math.random() * 10 - 5}px)`;
            }
        });
    }, 2000);
    
    // 随机闪烁
    setInterval(() => {
        if (Math.random() > 0.8) {
            createSparkle();
        }
    }, 3000);
}

// 创建闪烁效果
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 999;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        animation: sparkle 2s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    // 添加闪烁动画
    if (!document.querySelector('#sparkle-style')) {
        const style = document.createElement('style');
        style.id = 'sparkle-style';
        style.textContent = `
            @keyframes sparkle {
                0% { opacity: 0; transform: scale(0); }
                50% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// 初始化生日魔法
addBirthdayMagic();