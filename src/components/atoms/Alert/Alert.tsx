import { Toast } from "primereact/toast";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNotification,
  setNotification,
} from "../../../state/notificationSlice";
import { AlertProps } from "./Alert.types";

const Alert: React.FC<AlertProps> = () => {
  const toast = useRef<Toast>(null);
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification);

  const showToast = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (toast.current) {
        toast.current.show({
          severity: notification.severity,
          summary: notification.summary,
          detail: notification.message,
          life: 2500,
        });
      }
      resolve(true);
    });
  }, [notification]);

  useEffect(() => {
    if (notification.message) {
      showToast().finally(() => {
        dispatch(
          setNotification({
            message: "",
            severity: undefined,
            summary: "",
          })
        );
      });
    }
  }, [notification, showToast, dispatch]);

  return <Toast ref={toast} />;
};

export default Alert;
