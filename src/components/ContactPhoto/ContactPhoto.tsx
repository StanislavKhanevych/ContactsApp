import React from 'react';
import {View, Text, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

type TContactPhotoProps = {
  contact: {
    givenName: string;
    hasThumbnail: boolean;
  };
  photoURI?: string | null;
};

const ContactPhoto = ({contact, photoURI}: TContactPhotoProps) => {
  if (contact?.hasThumbnail && photoURI) {
    return <Image source={{uri: photoURI}} style={styles.image} />;
  }

  if (contact?.givenName && contact?.givenName.length > 0) {
    return (
      <View style={styles.defaultImage}>
        <Text style={styles.initial}>
          {contact?.givenName.charAt(0).toUpperCase()}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.defaultImage}>
      <Ionicons name="person-outline" size={48} color="white" />
    </View>
  );
};

export default ContactPhoto;
