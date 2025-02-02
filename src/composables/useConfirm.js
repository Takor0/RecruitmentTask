import { createApp, h } from 'vue';
import ConfirmComponent from '@/components/form/ConfirmComponent.vue';

export function useConfirm({ title = 'Confirm', message = 'Are you sure?', confirmText = 'Yes', cancelText = 'No' }) {
  return new Promise((resolve, reject) => {
    const app = createApp({
      data: () => ({
        isOpen: true,
      }),
      methods: {
        handleConfirm() {
          resolve(true);
          this.closeModal();
        },
        handleCancel() {
          reject(false);
          this.closeModal();
        },
        closeModal() {
          this.isOpen = false;
          app.unmount();
          document.body.removeChild(container);
        },
      },
      render() {
        return h(ConfirmComponent, {
          title,
          message,
          confirmText,
          cancelText,
          isOpen: this.isOpen,
          onConfirm: this.handleConfirm,
          onCancel: this.handleCancel,
        });
      },
    });

    const container = document.createElement('div');
    document.body.appendChild(container);
    app.mount(container);
  });
}
