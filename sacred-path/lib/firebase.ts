import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Firebase is auto-initialized from google-services.json / GoogleService-Info.plist
// No manual config needed for native Firebase SDK

export { auth, firestore };
export default firebase;
