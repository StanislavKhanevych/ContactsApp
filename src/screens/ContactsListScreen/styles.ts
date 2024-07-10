import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    bottom: 20,
    right: 20,
    position: 'absolute',
    zIndex: 1,
  },
  searchBar: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
  },
  sectionHeader: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  permissionMessage: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
    color: '#007AFF',
  },
});
