Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement("div");
  }
  const wrap = document.createElement("div");
  wrap.classList.add("modal-footer");

  buttons.forEach((btn) => {
    const $btn = document.createElement("button");
    $btn.textContent = btn.text;
    $btn.classList.add("btn");
    $btn.classList.add(`btn-${btn.type || "secondary"}`);
    $btn.onclick = btn.handler;

    wrap.appendChild($btn);
  });

  return wrap;
}

function _createModal(options) {
  const DEFAULT_MAX_WIDTH = "600px";

  const modal = document.createElement("div");
  modal.classList.add("vmodal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="modal-overlay" data-close="true">
      <div class="modal-window" style="max-width: ${
        options.maxWidth || DEFAULT_MAX_WIDTH
      }">
        <div class="modal-header">
          <h5 class="modal-title">${options.title || "Title"}</h5>
          ${
            options.closable
              ? `<button
                    data-close="true"
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>`
              : ""
          }
        </div>
        <div class="modal-body" data-body>${options.content || ""}</div>
      </div>
    </div>
    `
  );
  const footer = _createModalFooter(options.footerButtons);
  footer.appendAfter(modal.querySelector("[data-body]"));

  document.body.append(modal);

  return modal;
}

/*
 * onClose(): void
 * onOpen(): void
 * beforeClose(): boolean
 * --------------
 * animate.css
 * */

$.modal = function (options) {
  const ANIMATION_TIME = 300;
  const $modal = _createModal(options);
  let closing = false;
  let isDestroy = false;

  const modalActions = {
    open() {
      if (isDestroy) {
        return;
      }
      !closing && $modal.classList.add("open");
    },
    close() {
      $modal.classList.remove("open");
      $modal.classList.add("hide");
      closing = true;
      setTimeout(() => {
        $modal.classList.remove("hide");
        closing = false;
      }, ANIMATION_TIME);
    },
  };

  const listener = (event) => {
    if (event.target.dataset.close) {
      modalActions.close();
    }
  };

  $modal.addEventListener("click", listener);

  return Object.assign(modalActions, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener("click", listener);
      isDestroy = true;
    },
    setContent(html) {
      $modal.querySelector("[data-body]").innerHTML = html;
    },
  });
};
