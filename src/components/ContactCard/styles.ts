import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    paddingLeft: 10,
    paddingRight: 70,
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  primaryText: {
    fontSize: 18,
  },
  iconContent: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 24,
    color: 'white',
    marginHorizontal: 10,
  },
  icon: {
    borderRadius: 25,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    padding: 1,
    backgroundColor: 'green',
  },
});
