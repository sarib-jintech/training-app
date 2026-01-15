import { ALERT_TYPE, Toast } from 'react-native-alert-notification'

const ToastAlert = (title:string, type:ALERT_TYPE, textBody:string) => {
    Toast.show({
        title: title,
        type: type,
        textBody: textBody,
    })
}
export default ToastAlert