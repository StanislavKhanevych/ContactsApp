import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

type TContactPhotoProps = {
  contact: {
    givenName: string;
    hasThumbnail: boolean;
  };
  photoURI?: string | null;
};

const ContactPhoto = ({contact, photoURI}: TContactPhotoProps) => {
  if (contact.hasThumbnail && photoURI) {
    return <Image source={{uri: photoURI}} style={styles.image} />;
  }

  return (
    <View style={styles.defaultImage}>
      <Text style={styles.initial}>
        {contact.givenName.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
};

export default ContactPhoto;
