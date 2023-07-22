import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { TZDate } from "@toast-ui/calendar";
import { addDate } from "../lib/utils";
import RequireAuth from "./RequireAuth";
import { auth, db } from "./config.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const today = new TZDate();

const initialEvents = [
  {
    id: "1",
    calendarId: "0",
    title: "TOAST UI Calendar Study",
    category: "time",
    start: today,
    end: today,
  },
  {
    id: "2",
    calendarId: "0",
    title: "Practice",
    category: "milestone",
    start: today,
    end: today,
    isReadOnly: true,
  },
  {
    id: "3",
    calendarId: "0",
    title: "FE Workshop",
    category: "allday",
    start: today,
    end: today,
    isReadOnly: true,
  },
  {
    id: "4",
    calendarId: "0",
    title: "Report",
    category: "time",
    start: today,
    end: addDate(today, 1),
  },
];

type EventType = {
  id: string;
  title: string;
  start: TZDate;
  end: TZDate;
  isAllDay: string;
};

type TaskType = {
  title: string;
  description: string;
  due_date?: string;
  id: string;
  status: string;
  user_id: string;
  isAllDay?: string;
};

type View = "month" | "week";
type CatetogyType = "milestone" | "task" | "time" | "allday";

export default function Calender() {
  var tempArr: EventType[] = [];
  const [todos, setTodos] = useState<TaskType[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [view, setView] = useState<View>("month");

  const fetchTodos = () => {
    console.log("fetch post");

    //query for todos with user uids
    const q = query(
      collection(db, "todos"),
      where("user_id", "==", auth.currentUser?.uid)
    );

    getDocs(q).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //@ts-ignore
      setTodos(newData);
    });

    todos.map((todo) => {
      tempArr.push({
        id: todo.id,
        title: todo.title,
        start: new TZDate(todo.due_date),
        end: new TZDate(todo.due_date),
        isAllDay: "allday",
      });
    });
  };

  useEffect(() => {
    fetchTodos();
    setEvents(tempArr);
    console.log(todos);
  }, []);
  return (
    <RequireAuth>
      <div className=" flex w-screen h-screen">
        <Navbar />
        <ScrollArea className=" w-full h-full p-4">
          {view == "month" ? (
            <div className=" flex justify-between px-2 pb-4">
              <h2 className=" text-2xl">Monthly View</h2>
              <button onClick={() => setView("week")}>
                Switch to Weekly View
              </button>
            </div>
          ) : (
            <div className=" flex justify-between px-2 pb-4">
              <h2>Weekly View</h2>
              <button onClick={() => setView("month")}>
                Switch to Monthly View
              </button>
            </div>
          )}
          <div className=" text-black rounded-2xl">
            <Calendar
              usageStatistics={false}
              isReadOnly={true}
              template={{
                allday(event) {
                  return `${event.title}<i class="fa fa-refresh"></i>`;
                },
                popupIsAllday: function () {
                  return "All day?";
                },
                popupStateFree: function () {
                  return "🏝️ Free";
                },
                popupStateBusy: function () {
                  return "🔥 Busy";
                },
                popupSave: function () {
                  return "Add Event";
                },
                popupUpdate: function () {
                  return "Update Event";
                },
                popupDelete: function () {
                  return "Remove";
                },
                popupDetailTitle: function (data) {
                  return "Detail of " + data.title;
                },
                task(schedule) {
                  return `${schedule.title}`;
                },
              }}
              events={todos}
              view={view}
              month={{
                dayNames: ["S", "M", "T", "W", "T", "F", "S"],
                visibleWeeksCount: 3,
              }}
              week={{
                showTimezoneCollapseButton: true,
                timezonesCollapsed: false,
                eventView: false,
                taskView: true,
              }}
              theme={{
                nowIndicatorToday: { color: "#000000" },
                nowIndicatorBullet: { backgroundColor: "#000000" },
              }}
            />
          </div>
        </ScrollArea>
      </div>
    </RequireAuth>
  );
}

const theme = {
  moreView: {
    border: "1px solid grey",
    boxShadow: "0 2px 6px 0 grey",
    backgroundColor: "white",
    width: 320,
    height: 200,
    color: "#000000",
  },
  common: {
    border: "1px solid #ddd",
    backgroundColor: "white",
    holiday: { color: "#f54f3d" },
    saturday: { color: "#135de6" },
    dayName: { color: "#333" },
    today: { color: "#009688" },
    gridSelection: {
      backgroundColor: "rgba(19, 93, 230, 0.1)",
      border: "1px solid #135de6",
    },
  },
  month: {
    dayName: {
      borderLeft: "none",
      backgroundColor: "inherit",
    },
    holidayExceptThisMonth: { color: "#f3acac" },
    dayExceptThisMonth: { color: "#bbb" },
    weekend: { backgroundColor: "#fafafa" },
    moreView: { boxShadow: "none" },
    moreViewTitle: { backgroundColor: "#f4f4f4" },
  },
  week: {
    dayName: {
      borderTop: "1px solid #ddd",
      borderBottom: "1px solid #ddd",
      borderLeft: "1px solid #ddd",
      backgroundColor: "inherit",
    },
    today: {
      color: "#009688",
      backgroundColor: "inherit",
    },
    pastDay: { color: "#999" },
    panelResizer: { border: "1px solid #ddd" },
    dayGrid: { borderRight: "1px solid #ddd" },
    dayGridLeft: {
      width: "100px",
      backgroundColor: "",
      borderRight: "1px solid #ddd",
    },
    weekend: { backgroundColor: "inherit" },
    timeGridLeft: {
      width: "100px",
      backgroundColor: "#fafafa",
      borderRight: "1px solid #ddd",
    },
    timeGridLeftAdditionalTimezone: { backgroundColor: "#fdfdfd" },
    timeGridHourLine: { borderBottom: "1px solid #eee" },
    timeGridHalfHourLine: { borderBottom: "1px dotted #f9f9f9" },
    timeGrid: { borderRight: "1px solid #ddd" },
    nowIndicatorLabel: { color: "#135de6" },
    nowIndicatorPast: { border: "1px solid rgba(19, 93, 230, 0.3)" },
    nowIndicatorBullet: { backgroundColor: "#135de6" },
    nowIndicatorToday: { border: "1px solid #135de6" },
    nowIndicatorFuture: { border: "1px solid #135de6" },
    pastTime: { color: "#999" },
    futureTime: { color: "#333" },
    gridSelection: { color: "#135de6" },
  },
};
