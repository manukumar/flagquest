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
        
        this.gameMode = 'classic'; // classic, timed
        this.timedFlags = 10; // number of flags for timed mode
        this.timer = {
            startTime: 0,
            currentTime: 0,
            interval: null
        };
        
        this.currentRoundFlags = [];
        this.currentOptions = [];
        this.currentCorrectFlag = null;
        this.gameState = 'welcome'; // welcome, game, results
        
        // Leaderboard data structure
        this.leaderboardData = {
            accuracy: [],
            streak: [],
            recent: [],
            timed10: [],
            timed20: [],
            timed50: [],
            timedAll: []
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
        const startClassicButton = document.getElementById('start-classic');
        const playerNameInput = document.getElementById('player-name');
        
        if (startClassicButton) {
            startClassicButton.addEventListener('click', () => this.startClassicGame());
        }
        
        if (playerNameInput) {
            playerNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    // Check if timed mode is selected, otherwise default to classic
                    const selectedTimedOption = document.querySelector('.timed-option.selected');
                    if (selectedTimedOption) {
                        this.startTimedGame();
                    } else {
                        this.startClassicGame();
                    }
                }
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
            
            // Handle timed option selection
            const timedOption = e.target.closest('.timed-option');
            if (timedOption) {
                this.selectTimedOption(timedOption);
            }
            
            // Handle next question button
            const nextBtn = e.target.closest('#next-question-btn');
            if (nextBtn && this.gameState === 'game') {
                this.nextQuestion();
            }
            
            // Handle leaderboard tab clicks
            const tabBtn = e.target.closest('.tab-btn');
            if (tabBtn) {
                const tabType = tabBtn.dataset.tab;
                const screen = this.gameState === 'results' ? 'results' : '';
                this.switchLeaderboardTab(tabType, screen);
                // Timed tab logic
                const subtabs = document.querySelector('.timed-leaderboard-subtabs');
                if (tabType === 'timed') {
                    if (subtabs) subtabs.style.display = 'flex';
                    // Show default timed10 leaderboard
                    this.switchTimedLeaderboard('timed10', screen);
                } else {
                    if (subtabs) subtabs.style.display = 'none';
                }
            }
            // Timed subtab clicks
            const timedSubtab = e.target.closest('.timed-subtab-btn');
            if (timedSubtab) {
                const timedType = timedSubtab.dataset.timed;
                const screen = this.gameState === 'results' ? 'results' : '';
                document.querySelectorAll('.timed-subtab-btn').forEach(btn => btn.classList.remove('active'));
                timedSubtab.classList.add('active');
                this.switchTimedLeaderboard(timedType, screen);
            }
        });
        
        // Results screen events
        const playAgainBtn = document.getElementById('play-again');
        const newGameBtn = document.getElementById('new-game');
        const backToHomeBtn = document.getElementById('back-to-home');
        
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => this.playAgain());
        }
        
        if (newGameBtn) {
            newGameBtn.addEventListener('click', () => this.newGame());
        }
        
        if (backToHomeBtn) {
            backToHomeBtn.addEventListener('click', () => this.backToHome());
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
        
        // Always clear name field when returning to home screen
        if (screenName === 'welcome') {
            const playerNameInput = document.getElementById('player-name');
            if (playerNameInput) playerNameInput.value = '';
        }
        
        // Update leaderboard display when showing welcome or results
        if (screenName === 'welcome' || screenName === 'results') {
            this.updateLeaderboardDisplay();
        }
    }
    
    startClassicGame() {
        const playerNameInput = document.getElementById('player-name');
        const playerName = playerNameInput ? playerNameInput.value.trim() : '';
        
        if (!playerName) {
            alert('Please enter your name!');
            return;
        }
        
        this.gameMode = 'classic';
        this.player.name = playerName;
        this.player.questionsPerRound = 10;
        this.resetGame();
        this.showScreen('game');
        this.updateGameDisplay();
        this.askQuestion();
    }
    
    startTimedGame() {
        const playerNameInput = document.getElementById('player-name');
        const playerName = playerNameInput ? playerNameInput.value.trim() : '';
        
        if (!playerName) {
            alert('Please enter your name!');
            return;
        }
        
        this.gameMode = 'timed';
        this.player.name = playerName;
        this.player.questionsPerRound = this.timedFlags;
        this.resetGame();
        this.startTimer();
        this.showScreen('game');
        this.updateGameDisplay();
        this.askQuestion();
    }
    
    selectTimedOption(optionElement) {
        // Remove previous selection
        document.querySelectorAll('.timed-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Select new option
        optionElement.classList.add('selected');
        
        // Get number of flags
        const flags = optionElement.dataset.flags;
        this.timedFlags = flags === 'all' ? this.flags.length : parseInt(flags);
        
        // Automatically start the timed game
        this.startTimedGame();
    }
    
    startTimer() {
        this.timer.startTime = Date.now();
        this.timer.interval = setInterval(() => {
            this.timer.currentTime = Date.now() - this.timer.startTime;
            this.updateTimerDisplay();
        }, 10); // Update every 10ms for millisecond precision
        
        // Show timer in UI
        const timerStat = document.getElementById('timer-stat');
        if (timerStat) {
            timerStat.style.display = 'block';
        }
    }
    
    stopTimer() {
        if (this.timer.interval) {
            clearInterval(this.timer.interval);
            this.timer.interval = null;
        }
    }
    
    updateTimerDisplay() {
        const timerDisplay = document.getElementById('timer-display');
        if (timerDisplay) {
            const time = this.timer.currentTime;
            const minutes = Math.floor(time / 60000);
            const seconds = Math.floor((time % 60000) / 1000);
            const milliseconds = Math.floor((time % 1000) / 10);
            
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
        }
    }
    
    resetGame() {
        this.player.score = 0;
        this.player.totalQuestions = 0;
        this.player.streak = 0;
        this.player.currentQuestion = 0;
        this.currentRoundFlags = [];
        this.hideFeedback();
        this.enableButtons();
        
        // Reset timer for timed mode
        if (this.gameMode === 'timed') {
            this.stopTimer();
            const timerStat = document.getElementById('timer-stat');
            if (timerStat) {
                timerStat.style.display = 'none';
            }
        }
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
        
        // Clear previous button states with smooth transition
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
            btn.style.pointerEvents = 'auto';
        });
        
        // Display flag with smooth transition (restore previous version)
        const flagElement = document.getElementById('flag-emoji');
        if (flagElement) {
            // Fade out the flag
            flagElement.style.opacity = '0.7';
            setTimeout(() => {
                flagElement.textContent = currentFlag.flag;
                flagElement.style.opacity = '1';
                // Display options with smooth transition (at the same time as flag)
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
            }, 100);
        }
        
        // Ensure feedback window is collapsed and hidden
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
        
        // Handle differently for timed mode
        if (this.gameMode === 'timed') {
            setTimeout(() => {
                this.player.currentQuestion++;
                console.log('Timed mode: currentQuestion incremented to', this.player.currentQuestion, 'of', this.player.questionsPerRound);
                if (this.player.currentQuestion >= this.player.questionsPerRound) {
                    this.stopTimer();
                    console.log('Timed mode: calling showResults()');
                    this.showResults();
                } else {
                    this.askQuestion();
                }
            }, 1000);
        } else {
            // Show feedback with next button for classic mode
            this.showFeedback(correct, selectedOption);
        }
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
        const nextButton = document.getElementById('next-question-btn');
        
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
        
        // Update next button text based on question number
        if (nextButton) {
            if (this.player.currentQuestion + 1 >= this.player.questionsPerRound) {
                nextButton.textContent = 'See Results';
            } else {
                nextButton.textContent = 'Next Question';
            }
            // Ensure button is hidden initially
            nextButton.classList.remove('show');
        }
        
        // Start with compact state and expand smoothly
        feedback.style.transform = 'translateY(20px) scale(0.8)';
        feedback.style.maxHeight = '0';
        feedback.classList.add('show');
        
        // Trigger expansion animation
        setTimeout(() => {
            feedback.style.transform = 'translateY(0) scale(1)';
            feedback.style.maxHeight = '600px';
        }, 50);
        
        // Show next button after 1 second
        setTimeout(() => {
            if (nextButton) {
                nextButton.classList.add('show');
            }
        }, 1000);
    }
    
    hideFeedback() {
        const feedback = document.getElementById('feedback');
        const nextButton = document.getElementById('next-question-btn');
        
        if (feedback) {
            // Collapse the feedback window back to small size
            feedback.style.transform = 'translateY(20px) scale(0.8)';
            feedback.style.maxHeight = '0';
            feedback.classList.remove('show');
        }
        
        // Hide the next button when feedback is hidden
        if (nextButton) {
            nextButton.classList.remove('show');
        }
    }
    
    nextQuestion() {
        // Hide feedback with smooth transition
        this.hideFeedback();
        
        // Wait for feedback to collapse before showing next question
        setTimeout(() => {
            this.player.currentQuestion++;
            
            if (this.player.currentQuestion >= this.player.questionsPerRound) {
                this.showResults();
            } else {
                this.askQuestion();
            }
        }, 600); // Wait for feedback collapse animation
    }
    
    updateGameDisplay() {
        const playerDisplay = document.getElementById('player-display');
        const currentScore = document.getElementById('current-score');
        const questionNumber = document.getElementById('question-number');
        const totalQuestions = document.getElementById('total-questions');
        const currentStreak = document.getElementById('current-streak');
        
        if (playerDisplay) playerDisplay.textContent = `Player: ${this.player.name}`;
        if (currentScore) currentScore.textContent = this.player.score;
        if (questionNumber) questionNumber.textContent = this.player.currentQuestion + 1;
        if (totalQuestions) totalQuestions.textContent = this.player.questionsPerRound;
        if (currentStreak) currentStreak.textContent = this.player.streak;
    }
    
    showResults() {
        console.log('showResults called. gameMode:', this.gameMode);
        if (this.gameMode === 'timed') {
            this.showTimedResults();
        } else {
            this.showClassicResults();
        }
    }
    
    showClassicResults() {
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
        
        // Hide back to home button for classic mode only
        if (this.gameMode === 'classic') {
            const backToHomeBtn = document.getElementById('back-to-home');
            if (backToHomeBtn) {
                backToHomeBtn.style.display = 'none';
            }
        }
        
        this.showScreen('results');
    }
    
    showTimedResults() {
        const totalTime = this.timer.currentTime;
        const minutes = Math.floor(totalTime / 60000);
        const seconds = Math.floor((totalTime % 60000) / 1000);
        const milliseconds = Math.floor((totalTime % 1000));
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
        
        const accuracy = ((this.player.score / this.player.questionsPerRound) * 100).toFixed(1);
        
        // Update results display for timed mode
        const elements = {
            'round-correct': this.player.score,
            'round-accuracy': `${accuracy}%`,
            'best-streak': `${timeString}`,
            'total-correct': this.player.questionsPerRound,
            'total-questions': `${accuracy}%`,
            'overall-accuracy': timeString
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
        
        // Update labels for timed mode
        const labels = {
            'round-correct': 'Correct',
            'round-accuracy': 'Accuracy',
            'best-streak': 'Time',
            'total-correct': 'Total Flags',
            'total-questions': 'Accuracy',
            'overall-accuracy': 'Time'
        };
        
        // Performance message for timed mode
        const performanceMessage = document.getElementById('performance-message');
        if (performanceMessage) {
            if (accuracy >= 90) {
                performanceMessage.textContent = `🏆 Amazing speed! ${timeString} with ${accuracy}% accuracy!`;
            } else if (accuracy >= 75) {
                performanceMessage.textContent = `🥇 Great time! ${timeString} with ${accuracy}% accuracy!`;
            } else if (accuracy >= 60) {
                performanceMessage.textContent = `🥈 Good speed! ${timeString} with ${accuracy}% accuracy!`;
            } else if (accuracy >= 40) {
                performanceMessage.textContent = `🥉 Nice effort! ${timeString} with ${accuracy}% accuracy!`;
            } else {
                performanceMessage.textContent = `📚 Keep practicing! ${timeString} with ${accuracy}% accuracy!`;
            }
        }
        
        // Save to timed leaderboard
        this.saveToTimedLeaderboard(totalTime, accuracy);
        
        // Show back to home button for timed mode BEFORE showing screen
        const backToHomeBtn = document.getElementById('back-to-home');
        if (backToHomeBtn) {
            backToHomeBtn.style.display = 'inline-block';
            backToHomeBtn.style.visibility = 'visible';
            backToHomeBtn.style.opacity = '1';
        }
        
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
    
    saveToTimedLeaderboard(time, accuracy) {
        const gameEntry = {
            name: this.player.name,
            time: time,
            accuracy: parseFloat(accuracy),
            flags: this.player.questionsPerRound,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };
        
        // Determine which timed leaderboard to save to
        let leaderboardKey;
        switch (this.player.questionsPerRound) {
            case 10:
                leaderboardKey = 'timed10';
                break;
            case 20:
                leaderboardKey = 'timed20';
                break;
            case 50:
                leaderboardKey = 'timed50';
                break;
            default:
                leaderboardKey = 'timedAll';
                break;
        }
        
        // Ensure the leaderboard array exists
        if (!this.leaderboardData[leaderboardKey]) {
            this.leaderboardData[leaderboardKey] = [];
        }
        // Add to timed leaderboard (keep top 5, sorted by time)
        this.leaderboardData[leaderboardKey].push(gameEntry);
        this.leaderboardData[leaderboardKey].sort((a, b) => a.time - b.time);
        this.leaderboardData[leaderboardKey] = this.leaderboardData[leaderboardKey].slice(0, 5);
        
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
        const allLeaderboards = ['accuracy', 'timed10', 'timed20', 'timed50', 'timedAll'];
        allLeaderboards.forEach(type => {
            const leaderboardId = `${prefix}${type}-leaderboard`;
            const leaderboard = document.getElementById(leaderboardId);
            if (leaderboard) {
                leaderboard.classList.remove('active');
            }
        });
        // Show only the active leaderboard container
        let activeLeaderboardId;
        if (tabType === 'timed') {
            // Show timed10 by default
            activeLeaderboardId = `${prefix}timed10-leaderboard`;
        } else {
            activeLeaderboardId = `${prefix}${tabType}-leaderboard`;
        }
        const activeLeaderboard = document.getElementById(activeLeaderboardId);
        if (activeLeaderboard) {
            activeLeaderboard.classList.add('active');
        }
        // Update the content of the active leaderboard list
        let listId;
        if (tabType === 'timed') {
            listId = screen ? `${screen}-timed10-list` : `timed10-list`;
        } else {
            listId = screen ? `${screen}-${tabType}-list` : `${tabType}-list`;
        }
        this.updateLeaderboardList(tabType === 'timed' ? 'timed10' : tabType, listId);
    }
    
    switchTimedLeaderboard(timedType, screen = '') {
        const prefix = screen ? `${screen}-` : '';
        // Hide all timed leaderboards
        ['timed10', 'timed20', 'timed50', 'timedAll'].forEach(type => {
            const leaderboardId = `${prefix}${type}-leaderboard`;
            const leaderboard = document.getElementById(leaderboardId);
            if (leaderboard) leaderboard.classList.remove('active');
        });
        // Show selected timed leaderboard
        const activeLeaderboardId = `${prefix}${timedType}-leaderboard`;
        const activeLeaderboard = document.getElementById(activeLeaderboardId);
        if (activeLeaderboard) activeLeaderboard.classList.add('active');
        // Update the content
        const listId = screen ? `${screen}-${timedType}-list` : `${timedType}-list`;
        this.updateLeaderboardList(timedType, listId);
    }
    
    updateLeaderboardDisplay() {
        this.updateLeaderboardList('accuracy', 'accuracy-list');
        // Timed leaderboards
        this.updateLeaderboardList('timed10', 'timed10-list');
        this.updateLeaderboardList('timed20', 'timed20-list');
        this.updateLeaderboardList('timed50', 'timed50-list');
        this.updateLeaderboardList('timedAll', 'timedAll-list');
        // Also update results screen leaderboards
        this.updateLeaderboardList('accuracy', 'results-accuracy-list');
        this.updateLeaderboardList('timed10', 'results-timed10-list');
        this.updateLeaderboardList('timed20', 'results-timed20-list');
        this.updateLeaderboardList('timed50', 'results-timed50-list');
        this.updateLeaderboardList('timedAll', 'results-timedAll-list');
    }
    
    updateLeaderboardList(type, listId) {
        const listElement = document.getElementById(listId);
        if (!listElement) return;
        
        listElement.innerHTML = '';
        
        const entries = this.leaderboardData[type] || [];
        
        if (entries.length === 0) {
            listElement.innerHTML = '<div class="leaderboard-entry"><div class="entry-info">No entries yet. Be the first!</div></div>';
        } else {
            entries.forEach((entry, index) => {
                const entryElement = document.createElement('div');
                entryElement.className = 'leaderboard-entry';
                
                const rank = index + 1;
                const rankClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
                
                let scoreText = '';
                let detailsText = '';
                if (type === 'accuracy') {
                    scoreText = `${entry.accuracy}%`;
                    detailsText = scoreText;
                } else if (type === 'timed10' || type === 'timed20' || type === 'timed50' || type === 'timedAll') {
                    // Format time as mm:ss.mmm
                    const totalTime = entry.time;
                    const minutes = Math.floor(totalTime / 60000);
                    const seconds = Math.floor((totalTime % 60000) / 1000);
                    const milliseconds = Math.floor((totalTime % 1000));
                    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
                    scoreText = timeString;
                    detailsText = `${timeString} (${entry.accuracy}% accuracy)`;
                }
                
                const date = new Date(entry.date).toLocaleDateString();
                
                entryElement.innerHTML = `
                    <div class="entry-rank ${rankClass}">${rank}</div>
                    <div class="entry-info">
                        <div class="entry-name">${entry.name}</div>
                        <div class="entry-details">${detailsText}</div>
                        <div class="entry-date">${date}</div>
                    </div>
                    <div class="entry-score">${scoreText}</div>
                `;
                
                listElement.appendChild(entryElement);
            });
        }
        
        // Move the 'More entries...' message outside the scroll area
        let footer = listElement.nextElementSibling;
        if (footer && footer.classList.contains('leaderboard-footer')) {
            footer.remove();
        }
        if (entries.length < 5) {
            const messageElement = document.createElement('div');
            messageElement.className = 'leaderboard-footer';
            messageElement.innerHTML = 'More entries will appear as more people play!';
            listElement.parentNode.insertBefore(messageElement, listElement.nextSibling);
        }
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
    
    backToHome() {
        this.resetGame();
        this.showScreen('welcome');
        
        // Clear name input field
        const playerNameInput = document.getElementById('player-name');
        if (playerNameInput) {
            playerNameInput.value = '';
        }
        
        // Clear timed option selection
        document.querySelectorAll('.timed-option').forEach(option => {
            option.classList.remove('selected');
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FlagQuest();
}); 