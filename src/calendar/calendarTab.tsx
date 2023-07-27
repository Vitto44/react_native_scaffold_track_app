import { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import { Calendar, DateData } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../../styles';

import { PersonalInfoProps } from '../../data';
import Icon from 'react-native-vector-icons/FontAwesome';

type WorkLog = {
  [date: string]: string;
};

type MarkedDates = {
  [date: string]: {
    selected?: boolean;
    marked?: boolean;
  };
};

const WORKLOG_STORAGE_KEY = 'WORKLOG_STORAGE_KEY';
const PERSONAL_INFO_STORAGE_KEY = 'PERSONAL_INFO_STORAGE_KEY';

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [hours, setHours] = useState<string>("");
  const [workLog, setWorkLog] = useState<WorkLog>({});
  const [totalHoursForMonth, setTotalHoursForMonth] = useState<number>(0);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoProps>({hourlyRate: 0})


  // Load work logs from AsyncStorage
  useEffect(() => {
    const loadWorkLogs = async () => {
      const savedWorkLogs = await AsyncStorage.getItem(WORKLOG_STORAGE_KEY);
      const savedPersonalInfo = await AsyncStorage.getItem(PERSONAL_INFO_STORAGE_KEY);
      if (savedWorkLogs) {
        setWorkLog(JSON.parse(savedWorkLogs));
      }
      if (savedPersonalInfo) {
        setPersonalInfo(JSON.parse(savedPersonalInfo));
      }
    };

    loadWorkLogs();
    calculateTotalHoursForMonth(new Date().toISOString().substring(0, 7));
  }, []);

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setHours(workLog[day.dateString] || "");
  };

  const handleSave = async () => {
    if (selectedDate) {
      const hoursNum = Number(hours);
      if (hours === "" || hours === "0") {
        // Delete work log entry
        const { [selectedDate]: _, ...updatedWorkLog } = workLog;
        await AsyncStorage.setItem(WORKLOG_STORAGE_KEY, JSON.stringify(updatedWorkLog));
        setWorkLog(updatedWorkLog);
        setHours("");
        updateTotalHoursForMonth(hoursNum, selectedDate);
        return;
      } else if (isNaN(hoursNum)) {
        // alert("Please enter a valid number");
        return;
      } else if (hoursNum > 24) {
        // alert("Please enter a number less than 24");
        return;
      } else if (hoursNum < 0) {
        // alert("Please enter a positive number");
        return;
      } else {
        const updatedWorkLog = {
          ...workLog,
          [selectedDate]: hours
        };
         // Save to AsyncStorage
        await AsyncStorage.setItem(WORKLOG_STORAGE_KEY, JSON.stringify(updatedWorkLog));
        setWorkLog(updatedWorkLog);
        updateTotalHoursForMonth(hoursNum, selectedDate);

      }
      
     
    }
  };

  const getMarkedDates = (): MarkedDates => {
    const marked: MarkedDates = {};

    Object.keys(workLog).forEach(key => {
      marked[key] = {
        marked: true
      };
    });

    if (selectedDate) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true
      };
    }
   
    return marked;
  };

  const updateTotalHoursForMonth = (hours: number, date: string) => {
    let totalHours = totalHoursForMonth;
    if (workLog[date]) {
      totalHours -= Number(workLog[date]);
    }
    totalHours += hours;
    setTotalHoursForMonth(totalHours);   
  };

  const calculateTotalHoursForMonth = (month: string) => {
    let totalHours = 0;
    for (const date in workLog) {
      if (date.startsWith(month)) {
        totalHours += Number(workLog[date]);
      }
    }
    setTotalHoursForMonth(totalHours);
  };

  const onSave = async (data: PersonalInfoProps) => {
    await AsyncStorage.setItem(PERSONAL_INFO_STORAGE_KEY, JSON.stringify(data));
    setPersonalInfo(data);
  }

  const onMonthChange = (date: DateData) => {
    const dateString = `${date.dateString.substring(0, 7)}`;
    calculateTotalHoursForMonth(dateString);
  };


  return (
    <View style={styles.calendarContainer}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={getMarkedDates()}
        onMonthChange={onMonthChange}
      />
      <View style={{ padding: 10, gap: 30 }}>

        <View>
          {selectedDate && (
            <View style={{ paddingTop: 10, flexDirection: "row", justifyContent: "space-between"}}>
              <TextInput
                placeholder="Enter hours worked..."
                value={hours}
                onChangeText={setHours}
                keyboardType="numeric"
                style={{ borderRadius: 4, width: "70%", textAlign: "center", fontWeight: "bold", backgroundColor: "#fff" }}
                />
              <TouchableOpacity style={styles.addButton} onPress={handleSave}>
                <Icon name="check" size={35} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <Text onPress={() => setPopupVisible(true)} style={styles.earnText}>Total hours for this month: {totalHoursForMonth}</Text>
          <Text onPress={() => setPopupVisible(true)} style={styles.earnText}>Total amount earned this month: {totalHoursForMonth * personalInfo.hourlyRate}€</Text>
        </View>
        <Icon.Button
        name="gear"
        style={styles.settingButton}
        color={"#000"}
        backgroundColor={"#2f3e46"}
        onPress={() => setPopupVisible(true)}
      >
        Personal Info
      </Icon.Button>
      </View>
  
    </View>
  );
};

export default CalendarScreen;
