import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
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
          placeholder="Type your reminder..."
        />

        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button onClick={addReminder}>Add</button>
      </div>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.text} — {new Date(item.time).toLocaleString()}
            <button onClick={() => removeReminder(index)}>Delete</button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal-bg">
          <div className="modal-box">
            <h2>Reminder!</h2>
            <p>{modalText}</p>
            <button onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
