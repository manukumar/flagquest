// FlagQuest Web Application
class FlagQuest {
    constructor() {
        this.player = {
            name: "",
            score: 0,
            totalQuestions: 0,
            streak: 0,
            bestStreak: 0,
            questionsPerRound: 10,
            currentQuestion: 0
        };
        
        this.currentRoundFlags = [];
        this.currentOptions = [];
        this.currentCorrectFlag = null;
        this.gameState = 'welcome'; // welcome, game, results
        
        // Leaderboard data structure
        this.leaderboardData = {
            accuracy: [],
            streak: [],
            recent: []
        };
        
        this.flags = [
            { country: "United States", code: "US", flag: "🇺🇸", region: "North America", capital: "Washington D.C.", population: "331 million" },
            { country: "United Kingdom", code: "UK", flag: "🇬🇧", region: "Europe", capital: "London", population: "67 million" },
            { country: "Japan", code: "JP", flag: "🇯🇵", region: "Asia", capital: "Tokyo", population: "126 million" },
            { country: "Brazil", code: "BR", flag: "🇧🇷", region: "South America", capital: "Brasília", population: "213 million" },
            { country: "Australia", code: "AU", flag: "🇦🇺", region: "Oceania", capital: "Canberra", population: "25 million" },
            { country: "Canada", code: "CA", flag: "🇨🇦", region: "North America", capital: "Ottawa", population: "38 million" },
            { country: "Germany", code: "DE", flag: "🇩🇪", region: "Europe", capital: "Berlin", population: "83 million" },
            { country: "France", code: "FR", flag: "🇫🇷", region: "Europe", capital: "Paris", population: "67 million" },
            { country: "Italy", code: "IT", flag: "🇮🇹", region: "Europe", capital: "Rome", population: "60 million" },
            { country: "Spain", code: "ES", flag: "🇪🇸", region: "Europe", capital: "Madrid", population: "47 million" },
            { country: "China", code: "CN", flag: "🇨🇳", region: "Asia", capital: "Beijing", population: "1.4 billion" },
            { country: "India", code: "IN", flag: "🇮🇳", region: "Asia", capital: "New Delhi", population: "1.4 billion" },
            { country: "Mexico", code: "MX", flag: "🇲🇽", region: "North America", capital: "Mexico City", population: "129 million" },
            { country: "South Korea", code: "KR", flag: "🇰🇷", region: "Asia", capital: "Seoul", population: "51 million" },
            { country: "Netherlands", code: "NL", flag: "🇳🇱", region: "Europe", capital: "Amsterdam", population: "17 million" },
            { country: "Sweden", code: "SE", flag: "🇸🇪", region: "Europe", capital: "Stockholm", population: "10 million" },
            { country: "Norway", code: "NO", flag: "🇳🇴", region: "Europe", capital: "Oslo", population: "5 million" },
            { country: "Denmark", code: "DK", flag: "🇩🇰", region: "Europe", capital: "Copenhagen", population: "6 million" },
            { country: "Finland", code: "FI", flag: "🇫🇮", region: "Europe", capital: "Helsinki", population: "5 million" },
            { country: "Switzerland", code: "CH", flag: "🇨🇭", region: "Europe", capital: "Bern", population: "8 million" },
            { country: "Argentina", code: "AR", flag: "🇦🇷", region: "South America", capital: "Buenos Aires", population: "45 million" },
            { country: "Chile", code: "CL", flag: "🇨🇱", region: "South America", capital: "Santiago", population: "19 million" },
            { country: "New Zealand", code: "NZ", flag: "🇳🇿", region: "Oceania", capital: "Wellington", population: "5 million" },
            { country: "South Africa", code: "ZA", flag: "🇿🇦", region: "Africa", capital: "Pretoria", population: "59 million" },
            { country: "Egypt", code: "EG", flag: "🇪🇬", region: "Africa", capital: "Cairo", population: "104 million" },
            { country: "Nigeria", code: "NG", flag: "🇳🇬", region: "Africa", capital: "Abuja", population: "206 million" },
            { country: "Kenya", code: "KE", flag: "🇰🇪", region: "Africa", capital: "Nairobi", population: "54 million" },
            { country: "Morocco", code: "MA", flag: "🇲🇦", region: "Africa", capital: "Rabat", population: "37 million" },
            { country: "Thailand", code: "TH", flag: "🇹🇭", region: "Asia", capital: "Bangkok", population: "70 million" },
            { country: "Vietnam", code: "VN", flag: "🇻🇳", region: "Asia", capital: "Hanoi", population: "97 million" },
            { country: "Singapore", code: "SG", flag: "🇸🇬", region: "Asia", capital: "Singapore", population: "5 million" },
            { country: "Malaysia", code: "MY", flag: "🇲🇾", region: "Asia", capital: "Kuala Lumpur", population: "32 million" },
            { country: "Indonesia", code: "ID", flag: "🇮🇩", region: "Asia", capital: "Jakarta", population: "273 million" },
            { country: "Philippines", code: "PH", flag: "🇵🇭", region: "Asia", capital: "Manila", population: "109 million" },
            { country: "Turkey", code: "TR", flag: "🇹🇷", region: "Europe/Asia", capital: "Ankara", population: "84 million" },
            { country: "Poland", code: "PL", flag: "🇵🇱", region: "Europe", capital: "Warsaw", population: "38 million" },
            { country: "Czech Republic", code: "CZ", flag: "🇨🇿", region: "Europe", capital: "Prague", population: "10 million" },
            { country: "Hungary", code: "HU", flag: "🇭🇺", region: "Europe", capital: "Budapest", population: "10 million" },
            { country: "Austria", code: "AT", flag: "🇦🇹", region: "Europe", capital: "Vienna", population: "9 million" },
            { country: "Belgium", code: "BE", flag: "🇧🇪", region: "Europe", capital: "Brussels", population: "11 million" },
            { country: "Portugal", code: "PT", flag: "🇵🇹", region: "Europe", capital: "Lisbon", population: "10 million" },
            { country: "Greece", code: "GR", flag: "🇬🇷", region: "Europe", capital: "Athens", population: "11 million" },
            { country: "Ireland", code: "IE", flag: "🇮🇪", region: "Europe", capital: "Dublin", population: "5 million" },
            { country: "Iceland", code: "IS", flag: "🇮🇸", region: "Europe", capital: "Reykjavik", population: "364 thousand" },
            { country: "Luxembourg", code: "LU", flag: "🇱🇺", region: "Europe", capital: "Luxembourg City", population: "626 thousand" },
            { country: "Estonia", code: "EE", flag: "🇪🇪", region: "Europe", capital: "Tallinn", population: "1 million" },
            { country: "Latvia", code: "LV", flag: "🇱🇻", region: "Europe", capital: "Riga", population: "2 million" },
            { country: "Lithuania", code: "LT", flag: "🇱🇹", region: "Europe", capital: "Vilnius", population: "3 million" }
        ];
        
        this.init();
    }
    
    init() {
        this.loadLeaderboard();
        this.bindEvents();
        this.showScreen('welcome');
        this.updateLeaderboardDisplay();
    }
    
    bindEvents() {
        // Welcome screen events
        const startButton = document.getElementById('start-game');
        const playerNameInput = document.getElementById('player-name');
        
        if (startButton) {
            startButton.addEventListener('click', () => this.startGame());
        }
        
        if (playerNameInput) {
            playerNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.startGame();
            });
        }
        
        // Use event delegation for game buttons to handle dynamic content
        document.addEventListener('click', (e) => {
            const optionBtn = e.target.closest('.option-btn');
            if (optionBtn && this.gameState === 'game') {
                const index = parseInt(optionBtn.dataset.index);
                if (!isNaN(index)) {
                    this.handleAnswer(index);
                }
            }
            
            // Handle leaderboard tab clicks
            const tabBtn = e.target.closest('.tab-btn');
            if (tabBtn) {
                const tabType = tabBtn.dataset.tab;
                const screen = this.gameState === 'results' ? 'results' : '';
                this.switchLeaderboardTab(tabType, screen);
            }
        });
        
        // Results screen events
        const playAgainBtn = document.getElementById('play-again');
        const newGameBtn = document.getElementById('new-game');
        
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => this.playAgain());
        }
        
        if (newGameBtn) {
            newGameBtn.addEventListener('click', () => this.newGame());
        }
        
        // Handle window resize to ensure buttons remain responsive
        window.addEventListener('resize', () => {
            // Re-enable pointer events if they were disabled
            if (this.gameState === 'game') {
                this.enableButtons();
            }
        });
    }
    
    enableButtons() {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.style.pointerEvents = 'auto';
        });
    }
    
    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
        this.gameState = screenName;
        
        // Update leaderboard display when showing welcome or results
        if (screenName === 'welcome' || screenName === 'results') {
            this.updateLeaderboardDisplay();
        }
    }
    
    startGame() {
        const playerNameInput = document.getElementById('player-name');
        const playerName = playerNameInput ? playerNameInput.value.trim() : '';
        
        if (!playerName) {
            alert('Please enter your name!');
            return;
        }
        
        this.player.name = playerName;
        this.resetGame();
        this.showScreen('game');
        this.updateGameDisplay();
        this.askQuestion();
    }
    
    resetGame() {
        this.player.score = 0;
        this.player.totalQuestions = 0;
        this.player.streak = 0;
        this.player.currentQuestion = 0;
        this.currentRoundFlags = [];
        this.hideFeedback();
        this.enableButtons();
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    getRandomOptions(correctFlag, count = 4) {
        const allFlags = this.flags.filter(flag => flag.country !== correctFlag.country);
        const shuffled = this.shuffleArray(allFlags);
        const options = [correctFlag, ...shuffled.slice(0, count - 1)];
        return this.shuffleArray(options);
    }
    
    askQuestion() {
        // Generate round flags if needed
        if (this.currentRoundFlags.length === 0) {
            this.currentRoundFlags = this.shuffleArray(this.flags).slice(0, this.player.questionsPerRound);
        }
        
        const currentFlag = this.currentRoundFlags[this.player.currentQuestion];
        this.currentCorrectFlag = currentFlag;
        this.currentOptions = this.getRandomOptions(currentFlag);
        
        // Display flag
        const flagElement = document.getElementById('flag-emoji');
        if (flagElement) {
            flagElement.textContent = currentFlag.flag;
        }
        
        // Display options
        this.currentOptions.forEach((option, index) => {
            const btn = document.querySelector(`[data-index="${index}"]`);
            if (btn) {
                const optionText = btn.querySelector('.option-text');
                if (optionText) {
                    optionText.textContent = `${option.country} (${option.code})`;
                }
                btn.className = 'option-btn';
                btn.style.pointerEvents = 'auto';
            }
        });
        
        this.hideFeedback();
        this.updateGameDisplay();
    }
    
    handleAnswer(selectedIndex) {
        if (selectedIndex < 0 || selectedIndex >= this.currentOptions.length) {
            return;
        }
        
        const selectedOption = this.currentOptions[selectedIndex];
        const correct = selectedOption.country === this.currentCorrectFlag.country;
        
        // Disable all buttons
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
        });
        
        // Show correct/incorrect styling
        this.currentOptions.forEach((option, index) => {
            const btn = document.querySelector(`[data-index="${index}"]`);
            if (btn) {
                if (option.country === this.currentCorrectFlag.country) {
                    btn.classList.add('correct');
                } else if (index === selectedIndex && !correct) {
                    btn.classList.add('incorrect');
                }
            }
        });
        
        // Update score
        this.updateScore(correct);
        
        // Show feedback
        this.showFeedback(correct, selectedOption);
        
        // Wait and continue to next question
        setTimeout(() => {
            this.player.currentQuestion++;
            
            if (this.player.currentQuestion >= this.player.questionsPerRound) {
                this.showResults();
            } else {
                this.askQuestion();
            }
        }, 3000);
    }
    
    updateScore(correct) {
        this.player.totalQuestions++;
        if (correct) {
            this.player.score++;
            this.player.streak++;
            if (this.player.streak > this.player.bestStreak) {
                this.player.bestStreak = this.player.streak;
            }
        } else {
            this.player.streak = 0;
        }
    }
    
    showFeedback(correct, selectedOption) {
        const feedback = document.getElementById('feedback');
        if (!feedback) return;
        
        const feedbackIcon = feedback.querySelector('.feedback-icon');
        const feedbackText = feedback.querySelector('.feedback-text');
        
        if (feedbackIcon && feedbackText) {
            if (correct) {
                feedbackIcon.textContent = '✅';
                feedbackText.textContent = `Correct! This is the flag of ${this.currentCorrectFlag.country}!`;
            } else {
                feedbackIcon.textContent = '❌';
                feedbackText.textContent = `Incorrect! You chose: ${selectedOption.country}. The correct answer is: ${this.currentCorrectFlag.country}`;
            }
        }
        
        // Update country info
        const capitalInfo = document.getElementById('capital-info');
        const regionInfo = document.getElementById('region-info');
        const populationInfo = document.getElementById('population-info');
        
        if (capitalInfo) capitalInfo.textContent = this.currentCorrectFlag.capital;
        if (regionInfo) regionInfo.textContent = this.currentCorrectFlag.region;
        if (populationInfo) populationInfo.textContent = this.currentCorrectFlag.population;
        
        feedback.classList.add('show');
    }
    
    hideFeedback() {
        const feedback = document.getElementById('feedback');
        if (feedback) {
            feedback.classList.remove('show');
        }
    }
    
    updateGameDisplay() {
        const playerDisplay = document.getElementById('player-display');
        const currentScore = document.getElementById('current-score');
        const questionNumber = document.getElementById('question-number');
        const currentStreak = document.getElementById('current-streak');
        
        if (playerDisplay) playerDisplay.textContent = `Player: ${this.player.name}`;
        if (currentScore) currentScore.textContent = this.player.score;
        if (questionNumber) questionNumber.textContent = this.player.currentQuestion + 1;
        if (currentStreak) currentStreak.textContent = this.player.streak;
    }
    
    showResults() {
        const roundCorrect = this.player.score - (this.player.totalQuestions - this.player.questionsPerRound);
        const roundAccuracy = ((roundCorrect / this.player.questionsPerRound) * 100).toFixed(1);
        const overallAccuracy = ((this.player.score / this.player.totalQuestions) * 100).toFixed(1);
        
        // Update results display
        const elements = {
            'round-correct': roundCorrect,
            'round-accuracy': `${roundAccuracy}%`,
            'best-streak': this.player.bestStreak,
            'total-correct': this.player.score,
            'total-questions': this.player.totalQuestions,
            'overall-accuracy': `${overallAccuracy}%`
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
        
        // Performance message
        const performanceMessage = document.getElementById('performance-message');
        if (performanceMessage) {
            if (roundAccuracy >= 90) {
                performanceMessage.textContent = '🏆 Excellent! You\'re a flag expert!';
            } else if (roundAccuracy >= 75) {
                performanceMessage.textContent = '🥇 Great job! You know your flags well!';
            } else if (roundAccuracy >= 60) {
                performanceMessage.textContent = '🥈 Good work! Keep learning!';
            } else if (roundAccuracy >= 40) {
                performanceMessage.textContent = '🥉 Not bad! Practice makes perfect!';
            } else {
                performanceMessage.textContent = '📚 Keep studying! You\'ll get better!';
            }
        }
        
        // Save to leaderboard
        this.saveToLeaderboard(roundCorrect, roundAccuracy, this.player.bestStreak);
        
        this.showScreen('results');
    }
    
    // Leaderboard Methods
    loadLeaderboard() {
        try {
            const saved = localStorage.getItem('flagQuestLeaderboard');
            if (saved) {
                this.leaderboardData = JSON.parse(saved);
            }
        } catch (e) {
            console.log('Could not load leaderboard data');
        }
    }
    
    saveLeaderboard() {
        try {
            localStorage.setItem('flagQuestLeaderboard', JSON.stringify(this.leaderboardData));
        } catch (e) {
            console.log('Could not save leaderboard data');
        }
    }
    
    saveToLeaderboard(correct, accuracy, bestStreak) {
        const gameEntry = {
            name: this.player.name,
            correct: correct,
            accuracy: parseFloat(accuracy),
            bestStreak: bestStreak,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };
        
        // Add to recent games (keep last 5)
        this.leaderboardData.recent.unshift(gameEntry);
        this.leaderboardData.recent = this.leaderboardData.recent.slice(0, 5);
        
        // Add to accuracy leaderboard (keep top 5)
        this.leaderboardData.accuracy.push(gameEntry);
        this.leaderboardData.accuracy.sort((a, b) => b.accuracy - a.accuracy);
        this.leaderboardData.accuracy = this.leaderboardData.accuracy.slice(0, 5);
        
        // Add to streak leaderboard (keep top 5)
        this.leaderboardData.streak.push(gameEntry);
        this.leaderboardData.streak.sort((a, b) => b.bestStreak - a.bestStreak);
        this.leaderboardData.streak = this.leaderboardData.streak.slice(0, 5);
        
        this.saveLeaderboard();
    }
    
    switchLeaderboardTab(tabType, screen = '') {
        const prefix = screen ? `${screen}-` : '';
        
        // Update tab buttons
        document.querySelectorAll(`.tab-btn[data-tab="${tabType}"]`).forEach(btn => {
            btn.classList.add('active');
        });
        document.querySelectorAll(`.tab-btn:not([data-tab="${tabType}"])`).forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Hide all leaderboard containers first
        const allLeaderboards = ['accuracy', 'streak', 'recent'];
        allLeaderboards.forEach(type => {
            const leaderboardId = `${prefix}${type}-leaderboard`;
            const leaderboard = document.getElementById(leaderboardId);
            if (leaderboard) {
                leaderboard.classList.remove('active');
            }
        });
        
        // Show only the active leaderboard container
        const activeLeaderboardId = `${prefix}${tabType}-leaderboard`;
        const activeLeaderboard = document.getElementById(activeLeaderboardId);
        if (activeLeaderboard) {
            activeLeaderboard.classList.add('active');
        }
        
        // Update the content of the active leaderboard list
        const listId = screen ? `${screen}-${tabType}-list` : `${tabType}-list`;
        this.updateLeaderboardList(tabType, listId);
    }
    
    updateLeaderboardDisplay() {
        this.updateLeaderboardList('accuracy', 'accuracy-list');
        this.updateLeaderboardList('streak', 'streak-list');
        this.updateLeaderboardList('recent', 'recent-list');
        
        // Also update results screen leaderboards
        this.updateLeaderboardList('accuracy', 'results-accuracy-list');
        this.updateLeaderboardList('streak', 'results-streak-list');
        this.updateLeaderboardList('recent', 'results-recent-list');
    }
    
    updateLeaderboardList(type, listId) {
        const listElement = document.getElementById(listId);
        if (!listElement) return;
        
        listElement.innerHTML = '';
        
        const entries = this.leaderboardData[type] || [];
        
        if (entries.length === 0) {
            listElement.innerHTML = '<div class="leaderboard-entry"><div class="entry-info">No entries yet. Be the first!</div></div>';
            return;
        }
        
        entries.forEach((entry, index) => {
            const entryElement = document.createElement('div');
            entryElement.className = 'leaderboard-entry';
            
            const rank = index + 1;
            const rankClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
            
            let scoreText = '';
            if (type === 'accuracy') {
                scoreText = `${entry.accuracy}%`;
            } else if (type === 'streak') {
                scoreText = `${entry.bestStreak} streak`;
            } else if (type === 'recent') {
                scoreText = `${entry.correct}/10 (${entry.accuracy}%)`;
            }
            
            const date = new Date(entry.date).toLocaleDateString();
            
            entryElement.innerHTML = `
                <div class="entry-rank ${rankClass}">${rank}</div>
                <div class="entry-info">
                    <div class="entry-name">${entry.name}</div>
                    <div class="entry-details">${scoreText}</div>
                    <div class="entry-date">${date}</div>
                </div>
                <div class="entry-score">${scoreText}</div>
            `;
            
            listElement.appendChild(entryElement);
        });
    }
    
    playAgain() {
        this.resetGame();
        this.showScreen('game');
        this.askQuestion();
    }
    
    newGame() {
        this.resetGame();
        this.showScreen('welcome');
        const playerNameInput = document.getElementById('player-name');
        if (playerNameInput) {
            playerNameInput.value = '';
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FlagQuest();
}); 