/* Shared behavior for every post under /blog. Loaded with `defer`.
   Nothing here is required for the page to read: share links have static
   fallbacks in the HTML, and videos ship with `controls` on. */
(function () {
    'use strict';

    var canonical = document.querySelector('link[rel="canonical"]');
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var url = canonical ? canonical.href : window.location.href;
    var title = ogTitle ? ogTitle.content : document.title;
    var path = window.location.pathname;

    /* Named events go to Vercel Web Analytics, which is loaded in <head>.
       Pageviews, uniques and referrers are collected on every plan; these named
       events need Pro, and no-op harmlessly otherwise. Nothing here records
       anything about who the reader is. */
    function track(name, data) {
        if (typeof window.va === 'function') {
            window.va('event', { name: name, data: data });
        }
    }

    /* Share targets are rebuilt from the canonical URL and og:title, so a new
       post only has to get its <head> right. */
    function wireShareLinks() {
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
    }

    function wireCopyButton() {
        var copy = document.getElementById('copy-link');
        if (!copy) { return; }
        if (!navigator.clipboard) {
            copy.hidden = true;
            return;
        }
        copy.addEventListener('click', function () {
            navigator.clipboard.writeText(url).then(function () {
                var original = copy.textContent;
                copy.textContent = 'copied';
                setTimeout(function () { copy.textContent = original; }, 1600);
            });
        });
    }

    /* Which way people leave: a share button, or straight to the repo. */
    function wireOutboundEvents() {
        document.querySelectorAll('.share-row a, .share-row button').forEach(function (control) {
            control.addEventListener('click', function () {
                track('share', { to: control.textContent.trim(), post: path });
            });
        });

        document.querySelectorAll('a[href^="http"]').forEach(function (link) {
            if (link.closest('.share-row') || link.host === window.location.host) { return; }
            link.addEventListener('click', function () {
                track('outbound', { host: link.host, post: path });
            });
        });
    }

    /* How far down people actually get. Substack cannot tell you this. */
    function wireReadDepth() {
        var body = document.querySelector('.post-body');
        if (!body) { return; }

        var marks = [25, 50, 75, 100];
        var reached = {};
        var queued = false;

        function measure() {
            queued = false;
            var box = body.getBoundingClientRect();
            if (box.height <= 0) { return; }

            var read = (window.innerHeight - box.top) / box.height;
            var percent = Math.round(Math.min(1, Math.max(0, read)) * 100);

            marks.forEach(function (mark) {
                if (percent < mark || reached[mark]) { return; }
                reached[mark] = true;
                track('read_depth', { depth: mark + '%', post: path });
            });

            if (reached[100]) { window.removeEventListener('scroll', onScroll); }
        }

        function onScroll() {
            if (queued) { return; }
            queued = true;
            window.requestAnimationFrame(measure);
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        measure();
    }

    /* Videos marked data-autoplay loop silently like a gif, but only while they
       are on screen: Chrome pauses offscreen muted video to save power anyway,
       and playing one at the bottom of a long post wastes a decode.
       Anyone who has asked for reduced motion keeps the poster and the controls,
       and so does anyone without IntersectionObserver. */
    function wireLoopingClips() {
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
    }

    wireShareLinks();
    wireCopyButton();
    wireOutboundEvents();
    wireReadDepth();
    wireLoopingClips();
}());
