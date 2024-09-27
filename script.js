// 設定主題資料 (每個主題包含前面和背面的圖片)
const themes = [
    [
        { back: '圖片2/household appliance1.png', front: '圖片2/household appliance9.png' },
        { back: '圖片2/household appliance2.png', front: '圖片2/household appliance9.png' },
        { back: '圖片2/household appliance3.png', front: '圖片2/household appliance9.png' },
        { back: '圖片2/household appliance4.png', front: '圖片2/household appliance9.png' },
        { back: '圖片2/household appliance5.png', front: '圖片2/household appliance9.png' },
        { back: '圖片2/household appliance6.png', front: '圖片2/household appliance9.png' },
        { back: '圖片2/household appliance7.png', front: '圖片2/household appliance9.png' },
        { back: '圖片2/household appliance8.png', front: '圖片2/household appliance9.png' },
        { back: '圖片2/household appliance1.png', front: '圖片2/household appliance9.png' },
        { back: '圖片2/household appliance2.png', front: '圖片2/household appliance9.png' },
        { back: '圖片2/household appliance3.png', front: '圖片2/household appliance9.png' },
        { back: '圖片2/household appliance4.png', front: '圖片2/household appliance9.png' },
        { back: '圖片2/household appliance5.png', front: '圖片2/household appliance9.png' },
        { back: '圖片2/household appliance6.png', front: '圖片2/household appliance9.png' },
        { back: '圖片2/household appliance7.png', front: '圖片2/household appliance9.png' },
        { back: '圖片2/household appliance8.png', front: '圖片2/household appliance9.png' },
    ],
    [
        { back: '圖片/sushi1.png', front: '圖片/sushi9.png' },
        { back: '圖片/sushi2.png', front: '圖片/sushi9.png' },
        { back: '圖片/sushi3.png', front: '圖片/sushi9.png' },
        { back: '圖片/sushi4.png', front: '圖片/sushi9.png' },
        { back: '圖片/sushi5.png', front: '圖片/sushi9.png' },
        { back: '圖片/sushi6.png', front: '圖片/sushi9.png' },
        { back: '圖片/sushi7.png', front: '圖片/sushi9.png' },
        { back: '圖片/sushi8.png', front: '圖片/sushi9.png' },
        { back: '圖片/sushi1.png', front: '圖片/sushi9.png' },
        { back: '圖片/sushi2.png', front: '圖片/sushi9.png' },
        { back: '圖片/sushi3.png', front: '圖片/sushi9.png' },
        { back: '圖片/sushi4.png', front: '圖片/sushi9.png' },
        { back: '圖片/sushi5.png', front: '圖片/sushi9.png' },
        { back: '圖片/sushi6.png', front: '圖片/sushi9.png' },
        { back: '圖片/sushi7.png', front: '圖片/sushi9.png' },
        { back: '圖片/sushi8.png', front: '圖片/sushi9.png' },
    ],
    // 可以繼續添加更多主題
];

let currentThemeIndex = 0; // 當前主題索引
let cardData = []; // 存放當前主題的卡片資料
let canFlip = false; // 是否可以翻轉卡片
let countdownTimer; // 倒數計時器

// 打亂陣列的函數
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 交換
    }
}

// 獲取容器元素
const gridContainer = document.getElementById('card-grid');

// 設定遊戲開始按鈕及倒數計時
const startGameBtn = document.getElementById('start-game-btn');
const timerDisplay = document.getElementById('timer');

// 遊戲開始事件
startGameBtn.addEventListener('click', function() {
    // 檢查是否已經生成卡片
    if (gridContainer.childElementCount > 0) {
        return; // 如果已經有卡片，則不再生成
    }

    // 重置倒數計時
    clearInterval(countdownTimer);
    let timeLeft = 10;
    timerDisplay.innerText = `剩餘時間: ${timeLeft}`;
    canFlip = false; // 禁止翻轉卡片

    // 隨機打亂當前主題的卡片資料
    cardData = themes[currentThemeIndex];
    shuffle(cardData);

    // 動態生成卡片
    cardData.forEach((card, index) => {
        // 創建卡片容器
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.id = `card${index + 1}`;

        // 創建卡片正面
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        const frontImg = document.createElement('img');
        frontImg.src = card.front;
        cardFront.appendChild(frontImg);

        // 創建卡片背面
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const backImg = document.createElement('img');
        backImg.src = card.back;
        cardBack.appendChild(backImg);

        // 組合正面和背面到卡片中
        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);

        // 將卡片加入到容器中
        gridContainer.appendChild(cardElement);

        // 添加點擊事件來實現翻轉效果
        cardElement.addEventListener('click', function() {
            if (canFlip) {
                this.classList.toggle('flipped');
            }
        });
    });

    // 開始倒數計時
    countdownTimer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `剩餘時間: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            canFlip = true; // 允許翻轉卡片
            // 將所有卡片翻轉到正面
            const allCards = document.querySelectorAll('.card');
            allCards.forEach(card => {
                card.classList.remove('flipped'); // 先確保卡片翻到正面
            });
            timerDisplay.innerText = `剩餘時間: 0`;

            // 1秒後將所有卡片翻轉回背面
            setTimeout(() => {
                allCards.forEach(card => {
                    card.classList.add('flipped');
                });
            }, 1000);
        }
    }, 1000);
});

// 下一個主題按鈕
const nextThemeBtn = document.getElementById('next-theme-btn');
nextThemeBtn.addEventListener('click', function() {
    // 切換到下一個主題
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;

    // 如果已經有卡片存在，則清空並重新生成
    gridContainer.innerHTML = '';
    canFlip = false; // 重置為禁止翻轉狀態
});

// 统一翻转所有卡片到正面
const flipAllFrontBtn = document.getElementById('flip-all-front-btn');
flipAllFrontBtn.addEventListener('click', function() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.classList.remove('flipped');
    });
});

// 统一翻转所有卡片到背面
const flipAllBackBtn = document.getElementById('flip-all-back-btn');
flipAllBackBtn.addEventListener('click', function() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.classList.add('flipped');
    });
});
