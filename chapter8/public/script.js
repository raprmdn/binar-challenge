const notificationPermission = async () =>  {
    return new Promise(async (resolve) => {
        resolve(await Notification.requestPermission());
    });
}

const isServiceWorkerSupport = () => {
    return 'serviceWorker' in navigator;
}

const sendNotification = async () => {
    if (isServiceWorkerSupport()) {
        let permission = Notification.permission;

        if (permission === 'default')
            permission = await notificationPermission();

        if (permission === 'denied')
            return console.info('Notification permission denied');

        const register = await navigator.serviceWorker.register('/worker.js', { scope: '/' });

        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BDco4cRXDP3I0N9Qznqhw6wK3M0TMaEcn7I0Q0b79Mx2ggdAoVdi4OORlj7NqwSyOiecWDbwibw6y-AVIevljig',
        });

        await fetch('/register-notification',{
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'content-type': 'application/json',
            }
        });
    } else {
        console.error('Service Worker is not supported');
    }
}

$(document).ready(() => {
    notificationPermission()

    $('#regis-form').on('submit', (e) => {
        e.preventDefault();
        const name = $('#name').val();
        const username = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const passwordConfirmation = $('#password_confirmation').val();

        $('.error-message').html('');
        $('.form-group input').removeClass('is-invalid');

        $.ajax({
            url: 'http://localhost:5000/api/auth/register',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                name,
                username,
                email,
                password,
                password_confirmation: passwordConfirmation
            }),
            success: (res) => {
                if (res.success) {
                    sendNotification();
                    $('#regis-form').trigger('reset');
                    alert(res.message);
                }
            },
            error: (err) => {
                const { status, errors } = err.responseJSON;
                if (status === 422) {
                    const keys = Object.keys(errors);
                    keys.forEach(key => {
                        $(`#${key}`)
                            .addClass('is-invalid')
                            .after(`<small class="error-message">${errors[key]}</small>`);
                    });
                } else {
                    alert('Something went wrong');
                }
            }
        });
    });

});
