var draganddrop = {
    allowDrop: function (ev) {
        ev.preventDefault();
    },

    drag: function (ev) {
        ev.dataTransfer.setData("Text", ev.target.id);
    },

    drop: function (ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("Text");
        ev.target.appendChild(document.getElementById(data));
    }
}