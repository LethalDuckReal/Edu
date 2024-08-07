function openFullscreen(url) {
  const newTab = window.open("about:blank", "_blank");
  if (newTab) {
    newTab.document.write(
      '<iframe src="' +
        url +
        '" frameborder="0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"></iframe>'
    );
  } else {
    alert("Please allow pop-ups to open the content in full screen.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const iframes = document.querySelectorAll("iframe[data-src]");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const iframe = entry.target;
          iframe.src = iframe.getAttribute("data-src");
          observer.unobserve(iframe);
        }
      });
    },
    {
      rootMargin: "0px 0px 200px 0px",
      threshold: 0.1
    }
  );

  iframes.forEach((iframe) => {
    observer.observe(iframe);
  });
});