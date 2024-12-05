import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  containersl: {

    flex: 1,

    justifyContent: 'flex-start',

    alignItems: 'center',

  },

  titlesl: {

    fontSize: 24,

    fontWeight: 'bold',

    marginBottom: 20,

  },

  imagesl: {

    width: 200,

    height: 200,

    marginBottom: 20,

  },
  
  roundedBox: {
    width: 200,
    height: 100,
    backgroundColor: '#4CAF50',
    borderRadius: 20, // Adjust this value for more or less rounding
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Optional for shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },

  pagerView: {

    flex: 1,

    width: '100%',

    height: 300,

  },
  slideText: {

    fontSize: 18,

    textAlign: 'center',

    margin: 10,

  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 20
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  lightContainer: {
    backgroundColor: '#F0F4F7',
  },
  darkContainer: {
    backgroundColor: '#1c1c1c',
  },
  lightText: {
    color: '#000000',
  },
  darkText: {
    color: '#FFFFFF',
  },
  greenButton: {
    backgroundColor: 'green',
    borderColor: 'green', 
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containercarousel: {
    flex: 1,
  },
});

