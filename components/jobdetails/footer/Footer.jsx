import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import styles from "./footer.style";
import { icons } from "../../../constants";

const Footer = ({ url }) => {
  const [isJobSaved, setIsJobSaved] = useState(false);

  const toggleSaveJob = async () => {
    try {
      // Check if the job is already saved
      const savedJobsJSON = await AsyncStorage.getItem("savedJobs");
      const savedJobs = savedJobsJSON ? JSON.parse(savedJobsJSON) : [];

      if (!isJobSaved) {
        // If it's not saved, save it
        savedJobs.push(url);
      } else {
        // If it's saved, remove it from the saved jobs
        const index = savedJobs.indexOf(url);
        if (index !== -1) {
          savedJobs.splice(index, 1);
        }
      }

      // Update the local storage
      await AsyncStorage.setItem("savedJobs", JSON.stringify(savedJobs));

      // Toggle the state
      setIsJobSaved(!isJobSaved);
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn} onPress={toggleSaveJob}>
        <Image
          source={isJobSaved ? icons.heartFilled : icons.heartOutline}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
