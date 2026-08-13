/* Shared behavior for every post under /blog. Loaded with `defer`.
   Nothing here is required for the page to read: share links have static
   fallbacks in the HTML, and videos ship with `controls` on. */
(function () {
    'use strict';

    var canonical = document.querySelector('link[rel="canonical"]');
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var url = canonical ? canonical.href : window.location.href;
    var title = ogTitle ? ogTitle.content : document.title;

    /* Share targets are rebuilt from the canonical URL and og:title, so a new
       post only has to get its <head> right. */
    var targets = {
        'share-x': 'https://x.com/intent/post?text={title}&url={url}&via=masony817',
        'share-hn': 'https://news.ycombinator.com/submitlink?u={url}&t={title}',
        'share-reddit': 'https://www.reddit.com/submit?url={url}&title={title}'
    };

    Object.keys(targets).forEach(function (id) {
        var link = document.getElementById(id);
        if (!link) { return; }
        link.href = targets[id]
            .replace('{url}', encodeURIComponent(url))
            .replace('{title}', encodeURIComponent(title));
    });

    var copy = document.getElementById('copy-link');
    if (copy) {
        if (navigator.clipboard) {
            copy.addEventListener('click', function () {
                navigator.clipboard.writeText(url).then(function () {
                    var original = copy.textContent;
                    copy.textContent = 'copied';
                    setTimeout(function () { copy.textContent = original; }, 1600);
                });
            });
        } else {
            copy.hidden = true;
        }
    }

    /* Videos marked data-autoplay loop silently like a gif, but only while they
       are on screen: Chrome pauses offscreen muted video to save power anyway,
       and playing one at the bottom of a long post wastes a decode.
       Anyone who has asked for reduced motion keeps the poster and the controls,
       and so does anyone without IntersectionObserver. */
    var clips = document.querySelectorAll('video[data-autoplay]');
    if (!clips.length) { return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }
    if (!('IntersectionObserver' in window)) { return; }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            var video = entry.target;
            if (!entry.isIntersecting) {
                video.pause();
                return;
            }
            var started = video.play();
            if (started && started.catch) {
                started.catch(function (error) {
                    /* a real autoplay block, as opposed to Chrome's offscreen
                       power saving: hand the clip back to the reader */
                    if (error.name === 'NotAllowedError') {
                        video.controls = true;
                        observer.unobserve(video);
                    }
                });
            }
        });
    }, { threshold: 0.25 });

    clips.forEach(function (video) {
        video.controls = false;
        video.preload = 'metadata';
        observer.observe(video);
    });
}());
