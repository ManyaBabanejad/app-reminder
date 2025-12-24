import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [time, setTime] = useState(null);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const addReminder = () => {
    if (text && time) {
      setItems([...items, { text, time }]);
      setText("");
      setTime("");
    }
  };
  const editReminder = (index) => {
    setText(items[index].text);
    setTime(items[index].time);
    removeReminder(index);
  };

  const removeReminder = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  useEffect(() => {
    items.forEach((item) => {
      const target = new Date(item.time).getTime();
      const now = Date.now();
      const delay = target - now;

      if (delay > 0) {
        setTimeout(() => {
          new Audio("/notify.mp3").play();
          setModalText(item.text);
          setShowModal(true);
          
        }, delay);
      }
    });
  }, [items]);

  return (
    <div className="container">
      <h1>Reminder App</h1>

      <div className="input-area">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="یادآوری را وارد نمایید..."
        />
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          onChange={(date) => setTime(date.toDate())}
          format="YYYY/MM/DD HH:mm"
          plugins={[
            <TimePicker hideSeconds/>]}
          
        />

        
      </div>
      <br />
      <button onClick={addReminder}>اضافه کردن</button>
      <ul>      
        {items.map((item, index) => {
          const isDone = new Date(item.time).getTime() < Date.now();
      
          return (
            <li key={index} style={{ color: isDone ? "gray" : "black" }}>
              {item.text} — {new Date(item.time).toLocaleString("fa-IR")}
              {isDone && <span> ✔ انجام شد</span>}
      
              <button onClick={() => editReminder(index)}>ویرایش</button>
              <button onClick={() => removeReminder(index)}>حذف</button>
            </li>
          );
        })}
      </ul>


      {showModal && (
        <div className="modal-bg">
          <div className="modal-box">
            <h2>Reminder!</h2>
            <p>{modalText}</p>
            <button onClick={() => setShowModal(false)}>تایید</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
