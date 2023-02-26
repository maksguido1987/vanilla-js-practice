function _createModal(options) {
  const modal = document.createElement("div");
  modal.classList.add("vmodal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="modal-overlay">
      <div class="modal-window">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary">Cancel</button>
          <button type="button" class="btn btn-primary">Ok</button>
        </div>
      </div>
    </div>
    `
  );
  document.body.append(modal);

  return modal;
}

/*
* title: string
* closable: boolean
* content: string
* width: string ('400px')
* destroy(): void
* Окно должно закрываться
* --------------
* setContent(html: string): void | PUBLIC
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

  return {
    open() {
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
    destroy() {},
  };
};
