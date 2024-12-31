import { defineStore } from "pinia";


export const useAppStore = defineStore("app", () => {
  const provinces = ref([]);
  const expandVerticalNav = ref(true);
  const appAlerts = ref([]);
  const waitingFor = ref([]);
  const isNotiSnackbarVisible = ref(false);
  const notiSnackbarContent = ref({
    timeout: 5000,
    content: "",
  });

  const addAlert = (message, options) => {
    const { type = "info", color = "", icon = "", timeout = 3000 } = options;
    const alert = { message, type, color, icon, timeoutId: null };
    appAlerts.value.unshift(alert);

    alert.timeoutId = setTimeout(() => {
      removeAlert(appAlerts.value.indexOf(alert));
    }, timeout);
  };

  const removeAlert = (index) => {
    if (index >= 0 && index < appAlerts.value.length) {
      const [alert] = appAlerts.value.splice(index, 1);
      if (alert.timeoutId) {
        clearTimeout(alert.timeoutId);
      }
    }
  };

  const showErrorsAlert = (errors) => {
    const { t } = useI18n();

    const defaultMessage = t("error_occurred");

    if (Array.isArray(errors)) {
      errors.forEach((err) => {
        const message = t(`error_message.${err.message}`, defaultMessage);
        addAlert(message, {
          type: "error",
          color: "error",
          icon: "mdi-alert-circle",
          timeout: 3000,
        });
      });
    } else {
      addAlert(defaultMessage, {
        type: "error",
        color: "error",
        icon: "mdi-alert-circle",
        timeout: 3000,
      });
    }
  };

  return {
    provinces,
    expandVerticalNav,
    appAlerts,
    waitingFor,
    isNotiSnackbarVisible,
    notiSnackbarContent,
    addAlert,
    removeAlert,
    showErrorsAlert,
  };
});
