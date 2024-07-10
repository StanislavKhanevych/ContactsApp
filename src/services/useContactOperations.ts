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
    firstName: Contact['givenName'],
    lastName: Contact['familyName'],
    phoneNumbers: Contact['phoneNumbers'],
    emailAddresses: Contact['emailAddresses'],
  ) => {
    try {
      if (!firstName.trim() || !lastName.trim() || phoneNumbers.length === 0) {
        throw new Error('Please fill all fields');
      }

      const contactInfo: Contact = {
        givenName: firstName.trim(),
        familyName: lastName.trim(),
        phoneNumbers: phoneNumbers,
        emailAddresses: emailAddresses,
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
      await Contacts.updateContact(updatedContact);
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
