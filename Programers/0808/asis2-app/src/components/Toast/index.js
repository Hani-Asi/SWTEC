import ReactDOM from "react-dom";
import ToastManager from "./ToastManager";

class Toast {
  portal = null;

  constructor() {
    const portalId = "toast-portal";
    const portalElement = document.getElementById(portalId);

    if (portalElement) {
      this.portal = portalElement;
      return;
    } else {
      this.portal = document.createElement("div");
      this.portal.id = portalId;
      document.body.appendChild(this.portal);
    }

    ReactDOM.createPortal(
      <ToastManager
        bind={(createToast) => {
          this.createToast = createToast;
        }}
      />,
      //undefined, // TODO: ToastManager 넣기
      this.portal
    );
  }

  show(message, duration = 2000) {
    this.createToast(message, duration);
  }
}

export default new Toast();
