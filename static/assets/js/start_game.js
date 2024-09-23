// 显示登录表单
document.getElementById('login_form_btn').addEventListener('click', function () {
    document.querySelector('.social_login').style.display = 'none';
    document.querySelector('.user_login').style.display = 'block';
});

// 显示注册表单
document.getElementById('register_form_btn').addEventListener('click', function () {
    document.querySelector('.social_login').style.display = 'none';
    document.querySelector('.user_register').style.display = 'block';
});

// 提交登录表单
// 提交登录表单
document.getElementById('login_submit').addEventListener('click', function () {
    const email = document.getElementById('login_user_email').value;
    const password = document.getElementById('login_password').value;

    axios.post('http://127.0.0.1:8080/GBL/user/login', {
        user_email: email,
        password: password
    })
        .then(function (response) {
            if (response.data.code === 200) {
                // Store the token in localStorage
                localStorage.setItem('authToken', response.data.data.token);
                alert('Login successful');
                console.log(response.data);
                const token = localStorage.getItem('authToken');
                console.log('Token from localStorage:', token);

                // Optionally, you can redirect the user after login
                // window.location.href = '/some-protected-page';
            } else {
                alert('Login failed, please try again.');
            }
        })
        .catch(function (error) {
            alert('Login failed, please try again.');
            console.error(error);
        });
});

// 提交注册表单
document.getElementById('register_submit').addEventListener('click', function () {
    const fullname = document.getElementById('register_fullname').value;
    const email = document.getElementById('register_email').value;
    const password = document.getElementById('register_password').value;

    axios.post('http://127.0.0.1:8080/GBL/user/register', {
        user_name: fullname,
        user_email: email,
        password: password
    })
        .then(function (response) {
            alert('Registration successful');
            console.log(response.data);
        })
        .catch(function (error) {
            alert('Registration failed, please try again.');
            console.error(error);
        });
});

// 返回按钮事件
document.querySelectorAll('.back_btn').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelector('.user_login').style.display = 'none';
        document.querySelector('.user_register').style.display = 'none';
        document.querySelector('.social_login').style.display = 'block';
    });
});