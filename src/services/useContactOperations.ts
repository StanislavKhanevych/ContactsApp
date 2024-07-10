import {useState} from 'react';
import {Linking} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useContactOperations = (permissionGranted, setContacts) => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getContact = async (id: string) => {
    if (permissionGranted) {
      try {
        const contacts = await Contacts.getContactById(id);
        setContact(contacts);
      } catch (err) {
        setError('Failed to fetch contact');
      }
    } else {
      try {
        const storedContacts = await AsyncStorage.getItem('localContacts');
        if (storedContacts) {
          const contacts = JSON.parse(storedContacts);
          const contact = contacts.find(c => c.recordID === id);
          setContact(contact);
        }
      } catch (error) {
        setError('Failed to fetch contact from local storage');
      }
    }
  };

  const addContact = async (
    firstName: Contact['givenName'],
    lastName: Contact['familyName'],
    phoneNumbers: Contact['phoneNumbers'],
    emailAddresses: Contact['emailAddresses'],
  ) => {
    try {
      const contactInfo: Contact = {
        recordID: Math.random().toString(),
        givenName: firstName.trim(),
        familyName: lastName.trim(),
        phoneNumbers: phoneNumbers,
        emailAddresses: emailAddresses,
      };

      if (permissionGranted) {
        await Contacts.addContact(contactInfo);
      } else {
        const storedContacts = await AsyncStorage.getItem('localContacts');
        const localContacts = storedContacts ? JSON.parse(storedContacts) : [];
        localContacts.push(contactInfo);
        await AsyncStorage.setItem(
          'localContacts',
          JSON.stringify(localContacts),
        );
        setContacts(localContacts);
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const deleteContact = async (id: string) => {
    if (permissionGranted) {
      try {
        await Contacts.deleteContact(id);
        setContact(null);
      } catch (err) {
        setError('Failed to delete contact');
      }
    } else {
      try {
        const storedContacts = await AsyncStorage.getItem('localContacts');
        const localContacts = storedContacts ? JSON.parse(storedContacts) : [];
        const updatedContacts = localContacts.filter(c => c.recordID !== id);
        await AsyncStorage.setItem(
          'localContacts',
          JSON.stringify(updatedContacts),
        );
        setContacts(updatedContacts);
        setContact(null);
      } catch (error) {
        setError('Failed to delete contact from local storage');
      }
    }
  };

  const updateContact = async (updatedContact: Contact) => {
    if (permissionGranted) {
      try {
        await Contacts.updateContact(updatedContact);
        setContact(updatedContact);
      } catch (err) {
        console.log('err', err);
        setError('Failed to update contact');
      }
    } else {
      try {
        const storedContacts = await AsyncStorage.getItem('localContacts');
        const localContacts = storedContacts ? JSON.parse(storedContacts) : [];
        const index = localContacts.findIndex(
          c => c.recordID === updatedContact?.recordID,
        );
        if (index > -1) {
          localContacts[index] = updatedContact;
          await AsyncStorage.setItem(
            'localContacts',
            JSON.stringify(localContacts),
          );
          setContacts(localContacts);
        }
      } catch (error) {
        setError('Failed to update contact in local storage');
      }
    }
  };

  const getContactPhoto = async (id: string) => {
    if (permissionGranted) {
      try {
        const photoURI = await Contacts.getPhotoForId(id);
        return photoURI;
      } catch (err) {
        setError('Failed to fetch contact photo');
        return null;
      }
    }
    return null;
  };

  const makeCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return {
    contact,
    getContact,
    deleteContact,
    updateContact,
    getContactPhoto,
    makeCall,
    addContact,
    error,
  };
};

export default useContactOperations;
