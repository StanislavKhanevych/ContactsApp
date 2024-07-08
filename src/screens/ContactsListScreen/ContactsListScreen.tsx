import React, {useState} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Contact} from 'react-native-contacts';
import useContacts from '../../services/useContacts';
import {TContactsListScreenProps} from '../../types/types';
import ContactsCard from '../../components/ContactCard/ContactCard';
import styles from './styles';

const ContactsListScreen = ({navigation}: TContactsListScreenProps) => {
  const myContacts = useContacts();

  const renderCard = ({item}: {item: Contact}) => {
    if (!item.givenName) return null;
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('ContactDetails', {
            contactInfo: {id: item.recordID},
          })
        }>
        <ContactsCard contactInfo={item} />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="add-circle"
        size={62}
        color="green"
        style={styles.icon}
        onPress={() => navigation.navigate('CreateContact')}
      />
      <FlatList
        data={myContacts}
        renderItem={renderCard}
        keyExtractor={(item: Contact) => item.recordID}
      />
    </View>
  );
};

export default ContactsListScreen;
