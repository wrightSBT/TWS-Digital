(function () {
  window.va =
    window.va ||
    function () {
      (window.vaq = window.vaq || []).push(arguments);
    };

  var src = "/_vercel/insights/script.js";
  if (document.head.querySelector('script[src="' + src + '"]')) return;

  var script = document.createElement("script");
  script.src = src;
  script.defer = true;
  document.head.appendChild(script);
})();
