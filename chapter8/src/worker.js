self.addEventListener('push', (e) => {
    const data = e.data.json();
    console.log('Received push notification . . .');

    self.registration.showNotification(data.title,{
        body: data.body
    });
});
