import {useState, useEffect} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import {useIsFocused} from '@react-navigation/native';

const useContacts = () => {
  const isFocused = useIsFocused();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getAllContacts();
    }
  }, [isFocused]);

  const getAllContacts = async () => {
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
          const contacts = await Contacts.getAll();
          setContacts(contacts);
        } else {
          console.log('Contacts permission denied');
        }
      } catch (error) {
        console.log('Permission error:', error);
      }
    } else {
      // iOS only
      try {
        const contacts = await Contacts.getAll();
        setContacts(contacts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return contacts;
};

export default useContacts;
