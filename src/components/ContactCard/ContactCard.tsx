import React from 'react';
import {View, Text} from 'react-native';
import {Contact} from 'react-native-contacts';
import styles from './styles';

type TContactsCardProps = {
  contactInfo: Contact;
};

const ContactsCard = ({contactInfo}: TContactsCardProps) => {
  const {givenName, familyName, phoneNumbers} = contactInfo;
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.primaryText}>{`${givenName} `}</Text>
        <Text style={styles.primaryText}>{familyName}</Text>
        {!givenName && !familyName ? (
          <Text style={styles.primaryText}>{phoneNumbers[0].number}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default ContactsCard;
