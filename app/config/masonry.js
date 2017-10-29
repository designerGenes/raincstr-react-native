import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  fillsContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  hidden: {
    opacity: 0
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  hugRightEdge: {
    alignSelf: 'flex-end'
  },
  labelBlockText: {
    color: 'white',
    backgroundColor: 'black',
    padding: 8,
    margin: 12,
    fontSize: 24
  }
});
