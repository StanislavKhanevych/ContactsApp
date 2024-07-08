import {useState} from 'react';
import {Linking} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';

const useContactOperations = () => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getContact = async (id: string) => {
    try {
      const contacts = await Contacts.getContactById(id);
      setContact(contacts);
    } catch (err) {
      setError('Failed to fetch contact');
    }
  };

  const addContact = async (
    firstName: string,
    lastName: string,
    phoneNumbers: string[],
  ) => {
    try {
      if (!firstName.trim() || !lastName.trim() || phoneNumbers.length === 0) {
        throw new Error('Please fill all fields');
      }

      const myPhoneNumbers = phoneNumbers.map(ph => ({
        label: 'mobile',
        number: ph.trim(),
      }));

      const contactInfo: Contact = {
        displayName: `${firstName.trim()} ${lastName.trim()}`,
        givenName: `${firstName.trim()} ${lastName.trim()}`,
        phoneNumbers: myPhoneNumbers,
      };

      await Contacts.addContact(contactInfo);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await Contacts.deleteContact(id);
      setContact(null);
    } catch (err) {
      setError('Failed to delete contact');
    }
  };

  const updateContact = async (updatedContact: Contact) => {
    try {
      console.log('updatedContact', updatedContact);
      const responce = await Contacts.updateContact(updatedContact);
      console.log('responceres', responce);
      setContact(updatedContact);
    } catch (err) {
      console.log('err', err);
      setError('Failed to update contact');
    }
  };

  const getContactPhoto = async (id: string) => {
    try {
      const photoURI = await Contacts.getPhotoForId(id);
      return photoURI;
    } catch (err) {
      setError('Failed to fetch contact photo');
      return null;
    }
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
