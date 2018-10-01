// Make connection
var socket = io.connect();

// Query DOM
var message = document.querySelector('#message'),
    handle = document.querySelector('#handle'),
    btn = document.querySelector('#send'),
    output = document.querySelector('#output'),
    feedback = document.querySelector('#feedback');

// EMIT EVENTS
btn.addEventListener('click', () => {
    socket.emit('chat', {
        handle: handle.value,
        message: message.value
    });
    message.value = '';

});


message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

message.addEventListener('keypress', (event) =>{
    var key = event.which || event.keyCode;
    if(key === 13){
        socket.emit('chat', {
            handle: handle.value,
            message: message.value
        });
        message.value = '';
        }
});

// LISTEN FOR EVENTS
socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.handle}: </strong> ${data.message}</p>`
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing a message</em></p>`
});