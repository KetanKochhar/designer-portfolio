// Smooth scrolling
(function() {
    'use strict';

    var scrollLinks = document.querySelectorAll('a[href^="#"]');

    for (var i = 0; i < scrollLinks.length; i++) {
        scrollLinks[i].addEventListener('click', smoothScroll);
    }

    function smoothScroll(event) {
        event.preventDefault();

        var targetId = this.getAttribute('href');
        var targetElement = document.querySelector(targetId);
        var targetPosition = targetElement.offsetTop - 80;
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var duration = 1000;
        var start = null;

        window.requestAnimationFrame(step);

        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = timestamp - start;
            var percentage = progress / duration;
            window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));
            if (percentage < 1) {
                window.requestAnimationFrame(step);
            }
        }
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

})();

// Form submit
(function() {
    'use strict';

    var form = document.getElementById('contact-form');
    var submitButton = form.querySelector('button[type=submit]');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = new FormData(form);

        submitButton.disabled = true;

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            alert(data.message);
            form.reset();
            submitButton.disabled = false;
        })
        .catch(function(error) {
            alert('There was an error submitting the form. Please try again later.');
            submitButton.disabled = false;
        });
    });

})();