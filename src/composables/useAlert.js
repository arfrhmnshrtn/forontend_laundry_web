import { ref } from 'vue';

export function useAlert() {
  const showAlert = ref(false);
  const alertMessage = ref('');
  const alertType = ref('success');

  const displayAlert = (message, type = 'success') => {
    alertMessage.value = message;
    alertType.value = type;
    showAlert.value = true;
    setTimeout(() => {
      showAlert.value = false;
    }, 3000);
  };

  const hideAlert = () => {
    showAlert.value = false;
  };

  return {
    showAlert,
    alertMessage,
    alertType,
    displayAlert,
    hideAlert
  };
}
