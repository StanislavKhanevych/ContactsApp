import {useState, useEffect} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useContacts = () => {
  const isFocused = useIsFocused();
  const [contacts, setContacts] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (isFocused) {
      requestContactsPermission();
    }
  }, [isFocused]);

  const requestContactsPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept bare mortal',
          },
        );

        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          setPermissionGranted(true);
          const contacts = await Contacts.getAll();
          setContacts(contacts);
        } else {
          setPermissionGranted(false);
          loadLocalContacts();
        }
      } catch (error) {
        console.log('Permission error:', error);
        setPermissionGranted(false);
        loadLocalContacts();
      }
    } else {
      // iOS only
      try {
        const contacts = await Contacts.getAll();
        setPermissionGranted(true);
        setContacts(contacts);
      } catch (error) {
        console.log(error);
        setPermissionGranted(false);
        loadLocalContacts();
      }
    }
  };

  const loadLocalContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem('localContacts');
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.log('Failed to load local contacts', error);
    }
  };

  return {contacts, permissionGranted, setContacts};
};

export default useContacts;
