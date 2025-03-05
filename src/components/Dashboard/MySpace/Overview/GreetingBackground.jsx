import React, { useEffect, useState } from "react";
import morning from "../../../../assets/Greeting/Background/Morning.jpg";
import afternoon from "../../../../assets/Greeting/Background/Afternoon.jpg";
import evening from "../../../../assets/Greeting/Background/Evening.jpg";
import night from "../../../../assets/Greeting/Background/Night.jpg";

export default function GreetingBackground() {
  const [time, setTime] = useState(new Date().getHours());
  const [greetImage, setGreetImage] = useState(morning);

  useEffect(() => {
    if (time >= 1 && time <= 4) {
      setGreetImage(morning);
    } else if (time >= 5 && time <= 11) {
      setGreetImage(morning);
    } else if (time >= 12 && time <= 16) {
      setGreetImage(afternoon);
    } else if (time >= 17 && time <= 21) {
      setGreetImage(evening);
    } else {
      setGreetImage(night);
    }
  }, [time]);

  return (
    <div
      style={{
        backgroundPosition: "50% 50%",
        backgroundSize: "cover",
        backgroundImage: `url(${greetImage})`,
      }}
      className="w-full min-h-24 flex flex-col justify-center items-center border rounded-lg bg-no-repeat bg-six border-gray-800 ute"
    />
  );
}
