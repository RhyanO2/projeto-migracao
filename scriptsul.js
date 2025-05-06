
document.addEventListener('DOMContentLoaded', function(){
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.overlay');
    
    menuToggle.addEventListener('click', function(){
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    overlay.addEventListener('click', function(){
        menu.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    window.addEventListener('resize', function(){
        if(this.window.innerWidth > 768){
            menu.classList.remove("active");
            overlay.classList.remove("active");
        }
    });

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    });

    showSlide(currentSlide);

    // Quiz Simplificado - Código Atualizado
    function initQuiz() {
        console.log("Iniciando quiz..."); // Para debug
        
        const questions = document.querySelectorAll('.quiz-question');
        if (questions.length === 0) {
            console.error("Nenhuma pergunta encontrada!");
            return;
        }

        let score = 0;
        const totalQuestions = questions.length;
        document.getElementById('total-questions').textContent = totalQuestions;

        questions.forEach(question => {
            const buttons = question.querySelectorAll('.quiz-btn');
            const feedback = question.querySelector('.quiz-feedback');

            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    console.log("Botão clicado:", this.textContent); // Para debug
                    
                    // Desativa todos os botões desta questão
                    buttons.forEach(btn => {
                        btn.disabled = true;
                    });

                    const isCorrect = this.getAttribute('data-answer') === 'true';

                    if (isCorrect) {
                        this.classList.add('correct');
                        feedback.textContent = "✅ Correto!";
                        feedback.classList.add('correct');
                        score++;
                    } else {
                        this.classList.add('incorrect');
                        const correctAnswer = question.querySelector('[data-answer="true"]').textContent;
                        feedback.textContent = `❌ Incorreto! Resposta correta: ${correctAnswer}`;
                        feedback.classList.add('incorrect');
                        question.querySelector('[data-answer="true"]').classList.add('correct');
                    }

                    // Atualiza placar
                    document.getElementById('correct-answers').textContent = score;
                });
            });
        });
    }

    // Inicia o quiz
    initQuiz();
});

