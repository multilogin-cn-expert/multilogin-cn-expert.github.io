// FAQ 切换功能
function toggleFAQ(element) {
    const question = element;
    const answer = question.nextElementSibling;
    const toggle = question.querySelector('.faq-toggle');
    
    // 关闭其他打开的 FAQ
    document.querySelectorAll('.faq-question').forEach(q => {
        if (q !== question) {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('active');
            q.querySelector('.faq-toggle').textContent = '+';
        }
    });
    
    // 切换当前 FAQ
    question.classList.toggle('active');
    answer.classList.toggle('active');
    toggle.textContent = question.classList.contains('active') ? '−' : '+';
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 表单提交
function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // 简单的验证
    if (!data.name || !data.email || !data.subject || !data.message) {
        alert('请填写所有必填项');
        return;
    }
    
    console.log('表单数据:', data);
    alert('感谢您的消息！我们会在 1 小时内与您联系。');
    event.target.reset();
}

// 复制优惠码
function copyDiscountCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        alert(`已复制优惠码: ${code}`);
    }).catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制');
    });
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加任何需要的初始化代码
    console.log('页面加载完成');
});
