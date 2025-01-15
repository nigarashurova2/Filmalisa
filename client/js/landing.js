document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const plusIcon = item.querySelector('.plus-icon');

        question.addEventListener('click', () => {
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                plusIcon.textContent = '×';
            } else {
                answer.style.maxHeight = null;
                plusIcon.textContent = '+';
            }
        });
    });
});
