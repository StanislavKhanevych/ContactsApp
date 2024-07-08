import React from 'react';
import {View, Text} from 'react-native';
import {Contact} from 'react-native-contacts';
import styles from './styles';

type TContactsCardProps = {
  contactInfo: Contact;
};

export default function ContactsCard({contactInfo}: TContactsCardProps) {
  const {givenName} = contactInfo;
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <View style={styles.icon}>
          <Text style={styles.iconContent}>{givenName[0]}</Text>
        </View>
        <Text style={styles.primaryText}>{givenName}</Text>
      </View>
    </View>
  );
}
