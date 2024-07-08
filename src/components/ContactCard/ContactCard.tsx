import React from 'react';
import {View, Text} from 'react-native';
import {Contact} from 'react-native-contacts';
import styles from './styles';

type TContactsCardProps = {
  contactInfo: Contact;
};

const ContactsCard = ({contactInfo}: TContactsCardProps) => {
  const {givenName, familyName} = contactInfo;
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.primaryText}>{`${givenName} `}</Text>
        <Text style={styles.primaryText}>{familyName}</Text>
      </View>
    </View>
  );
};

export default ContactsCard;
