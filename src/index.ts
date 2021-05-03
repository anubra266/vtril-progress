import NProgress from "nprogress";

class Progress {
    timeout: any = null;
    show = true;

    addEventListeners(delay: any) {
        document.addEventListener(
            "inertia:start",
            this.start.bind(this, delay)
        );
        document.addEventListener("inertia:progress", this.progress.bind(this));
        document.addEventListener("inertia:finish", this.finish.bind(this));
    }

    start(delay: any) {
        this.timeout = setTimeout(() => this.show && NProgress.start(), delay);
    }

    progress(event: any) {
        if (NProgress.isStarted() && event.detail.progress.percentage) {
            NProgress.set(
                Math.max(
                    NProgress.status,
                    (event.detail.progress.percentage / 100) * 0.9
                )
            );
        }
    }

    finish(event: any) {
        this.show = true;
        clearTimeout(this.timeout);
        if (!NProgress.isStarted()) {
            return;
        } else if (event.detail.visit.completed) {
            NProgress.done();
        } else if (event.detail.visit.interrupted) {
            NProgress.set(0);
        } else if (event.detail.visit.cancelled) {
            NProgress.done();
            NProgress.remove();
        }
    }

    injectCSS(color: any) {
        const element = document.createElement("style");
        element.type = "text/css";
        element.textContent = `
        #nprogress {
          pointer-events: none;
        }

        #nprogress .bar {
          background: ${color};

          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;

          width: 100%;
          height: 2px;
        }

        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
          opacity: 1.0;

          -webkit-transform: rotate(3deg) translate(0px, -4px);
              -ms-transform: rotate(3deg) translate(0px, -4px);
                  transform: rotate(3deg) translate(0px, -4px);
        }

        #nprogress .spinner {
          display: block;
          position: fixed;
          z-index: 1031;
          top: 15px;
          right: 15px;
        }

        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;

          border: solid 2px transparent;
          border-top-color: ${color};
          border-left-color: ${color};
          border-radius: 50%;

          -webkit-animation: nprogress-spinner 400ms linear infinite;
                  animation: nprogress-spinner 400ms linear infinite;
        }

        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }

        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }

        @-webkit-keyframes nprogress-spinner {
          0%   { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(360deg); }
        }
        @keyframes nprogress-spinner {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
        document.head.appendChild(element);
    }

    init({
        delay = 250,
        color = "#29d",
        includeCSS = true,
        showSpinner = false,
    } = {}) {
        this.addEventListeners(delay);
        NProgress.configure({ showSpinner });
        if (includeCSS) {
            this.injectCSS(color);
        }
    }

    disable(callback: any) {
        this.show = false;
        callback();
    }
}

export default new Progress();
