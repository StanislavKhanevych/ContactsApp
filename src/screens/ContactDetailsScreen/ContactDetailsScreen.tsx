import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Button,
  Alert,
} from 'react-native';
import useContactOperations from '../../services/useContactOperations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContactPhoto from '../../components/ContactPhoto/ContactPhoto';
import useContacts from '../../services/useContacts';
import {
  ContactDetailsScreenRouteProp,
  ContactDetailsScreenNavigationProp,
} from '../../types/types';

import styles from './styles';

type TContactDetailsScreenProps = {
  route: ContactDetailsScreenRouteProp;
  navigation: ContactDetailsScreenNavigationProp;
};

const ContactDetailsScreen = ({
  route,
  navigation,
}: TContactDetailsScreenProps) => {
  const {contactInfo} = route.params;
  const {permissionGranted, setContacts} = useContacts();
  const {contact, getContact, deleteContact, getContactPhoto, makeCall, error} =
    useContactOperations(permissionGranted, setContacts);
  const [photoURI, setPhotoURI] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        await getContact(contactInfo.id);
        const uri = await getContactPhoto(contactInfo.id);
        setPhotoURI(uri);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching contact:', err);
        setLoading(false);
      }
    };

    fetchContact();
  }, [contactInfo.id, contactInfo.givenName, permissionGranted]);

  const handleEditContact = () => {
    navigation.navigate('CreateContact', {
      editMode: true,
      contactInfo: {...contact, thumbnailPath: photoURI},
    });
  };

  const handleDeleteContact = () => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteContact(contact);
            navigation.goBack();
          },
        },
      ],
    );
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!loading ? (
        <View style={styles.detailsContainer}>
          <ContactPhoto contact={contact} photoURI={photoURI} />
          <Text style={styles.name}>
            {contact?.givenName} {contact?.familyName}
          </Text>
          {contact?.phoneNumbers?.map(
            (phoneNumber, index) =>
              phoneNumber.number !== '' && (
                <Pressable
                  key={index}
                  style={styles.phoneNumberContainer}
                  onPress={() => makeCall(phoneNumber.number)}>
                  <Ionicons name="call" size={18} color="#888" />
                  <Text style={styles.phoneNumber}>{phoneNumber.number}</Text>
                </Pressable>
              ),
          )}
          {contact?.emailAddresses?.map(
            (email, index) =>
              email.email !== '' && (
                <Text key={index} style={styles.email}>
                  {email.email}
                </Text>
              ),
          )}
          <Pressable style={styles.deleteButton} onPress={handleDeleteContact}>
            <Text style={styles.deleteButtonText}>Delete Contact</Text>
          </Pressable>
          <Button title="Edit" onPress={handleEditContact} />
        </View>
      ) : (
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      )}
    </View>
  );
};

export default ContactDetailsScreen;
