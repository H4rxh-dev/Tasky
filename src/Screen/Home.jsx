import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/color';
import Progress from '../Components/Progress';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { showNotification } from '../services/Notification';




const Home = () => {
  const [progress, setProgress] = useState(85);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={require('../assets/groot.jpeg')}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <View>
            <Text style={styles.greeting}>Hello!</Text>
            <Text style={styles.name}>Groot</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color={colors.textcolor} />
        </TouchableOpacity>
      </View>

      <View style={styles.taskCard}>
        <TouchableOpacity style={styles.moreBtn}>
          <Ionicons name="ellipsis-horizontal" size={18} color="white" />
        </TouchableOpacity>

        <View style={styles.taskContent}>
          <Text style={styles.taskText}>Your today's task is almost done</Text>
          <TouchableOpacity
            onPress={() => {
              showNotification()
              console.log("lcicked")
            }}
            style={styles.btn}>
            <Text style={styles.btnText}>View Task</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginRight: 30, marginTop: 10, }}>
          <AnimatedCircularProgress
            size={50}
            width={3}
            fill={progress}
            tintColor={colors.Whitebtn}
            backgroundColor={"#8764ff"}
          >
            {(fill) => (
              <Text style={{ color: colors.Whitebtn, fontSize: 10 }}>
                {Math.round(fill)}%
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>

      <View style={styles.Progresscontainer
      }>
        <Text style={styles.Progress}>In Progress</Text>
        <Text style={styles.procount}>
          6
        </Text>
      </View>
      <Progress />

      <View style={styles.Progresscontainer
      }>
        <Text style={styles.Progress}>Task Group </Text>
        <Text style={styles.procount}>
          6
        </Text>
      </View>

      <View style={styles.overviewCard}>
        <View style={styles.overviewLeft}>
          <Ionicons name="person-circle-outline" size={30} color="#9260f4" />
          <View>
            <Text style={styles.overviewTitle}>Office project</Text>
            <Text style={styles.overviewSub}>25 projects</Text>
          </View>
        </View>
        <View style={{ marginRight: 30, marginTop: 10, }}>
          <AnimatedCircularProgress
            size={50}
            width={3}
            fill={progress}
            tintColor={"#9b6ef4"}
            backgroundColor={"#ede4ff"}
          >
            {(fill) => (
              <Text style={{ color: "#5d5e62", fontSize: 10 }}>
                {Math.round(fill)}%
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>



    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: colors.btncolor,
  },
  greeting: {
    fontSize: 12,
    color: '#64656a',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textcolor,
  },
  taskCard: {
    backgroundColor: colors.btncolor,
    borderRadius: 20,
    marginTop: 10,
    padding: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  moreBtn: {
    backgroundColor: '#9f85ed',
    borderRadius: 15,
    height: 26,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  taskContent: {
    width: '60%',
    gap: 20,
  },
  taskText: {
    color: '#fcfbfe',
    fontSize: 14,
  },
  btn: {
    backgroundColor: colors.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  btnText: {
    color: colors.btncolor,
    fontSize: 13,
    fontWeight: '700',
  },
  avatarCircle: {
    backgroundColor: 'green',
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
  }, Progress: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textcolor,
  }, procount: {
    backgroundColor: "#f6f3ff",
    height: 24,
    width: 20,
    borderRadius: 5,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 10,
    fontWeight: 'light',
    color: '#805de8',
    marginTop: 4
  }, Progresscontainer: { marginTop: 18, flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 6, paddingLeft: 8 },
  filCard: {
    backgroundColor: colors.btncolor,
    borderRadius: 20,
    marginTop: 20,
    padding: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingLeft: 2
  },

  overviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    padding: 18,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 10
  },
  overviewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  overviewTitle: {
    color: '#747081',
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    fontWeight: '700',
  },
  overviewSub: {
    fontSize: 9,
    color: '#747081',
  },
  overviewCount: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
  },
});
