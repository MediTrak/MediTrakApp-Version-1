import notifee, {
    AuthorizationStatus,
    EventType,
    Notification,
  } from '@notifee/react-native';
  
  class Notifications {
    constructor() {
      // Bootstrap method is called when the app is launched from a notification
      this.bootstrap();
  
      // Listen for events
      // This is called when the app is in the foreground
      notifee.onForegroundEvent(({ type, detail }) => {
        switch (type) {
          case EventType.DISMISSED:
            console.log('User dismissed notification', detail.notification);
            break;
          case EventType.PRESS:
            console.log('User pressed notification', detail.notification);
            break;
        }
      });
  
      // This is called when the app is in the background
      notifee.onBackgroundEvent(async ({ type, detail }) => {
        const { notification } = detail;
        console.log('Notification received: background', type, detail);
        if (notification) {
          this.handleNotificationOpen(notification);
        }
      });
    }
  
    // This method deals with what what happens when the user clicks on the notification
    public handleNotificationOpen(notification: Notification) {
      const { data } = notification;
      console.log('Notification Opened', data);
    }
  
    // This method is called when the app is launched from a notification
    public async bootstrap() {
      const initialNotification = await notifee.getInitialNotification();
      if (initialNotification) {
        this.handleNotificationOpen(initialNotification.notification);
      }
    }
  
    // This method is called to check if the user has granted permission to send notifications
    public async checkPermissions() {
      const settings = await notifee.requestPermission();
  
      if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        console.log('Permission settings:', settings);
        return true;
      } else {
        console.log('User declined permissions');
        return false;
      }
    }
  }
  
  // Exporting an instance of the class
  export default new Notifications();