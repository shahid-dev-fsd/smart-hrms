import React, { useEffect, useState } from "react";
import { useUser } from "../../../../hooks/Authorize";
import morning from "../../../../assets/Greeting/PNG/Morning.jpg";
import afternoon from "../../../../assets/Greeting/PNG/Afternoon.jpg";
import evening from "../../../../assets/Greeting/PNG/Evening.jpg";
import night from "../../../../assets/Greeting/PNG/Night.jpg";

export default function Greeting() {
  const platformUser = useUser();
  const [time, setTime] = useState(new Date().getHours());
  const [greet, setGreet] = useState({
    greetMessage: "",
    greetImage: morning,
  });

  useEffect(() => {
    if (time >= 1 && time <= 4) {
      setGreet({
        greetMessage: "Early Morning",
        greetImage: morning,
      });
    } else if (time >= 5 && time <= 11) {
      setGreet({
        greetMessage: "Good Morning",
        greetImage: morning,
      });
    } else if (time >= 12 && time <= 16) {
      setGreet({
        greetMessage: "Good Afternoon",
        greetImage: afternoon,
      });
    } else if (time >= 17 && time <= 21) {
      setGreet({
        greetMessage: "Good Evening",
        greetImage: evening,
      });
    } else {
      setGreet({
        greetMessage: "Good Night",
        greetImage: night,
      });
    }
  }, [time]);

  return (
    <div className="w-full min-h-24 flex flex-row gap-5 px-5 justify-start items-center border rounded-lg border-gray-800">
      <div>
        <img src={greet.greetImage} alt="" className="h-14 w-14 bg-blend-color-burn" />
      </div>
      <div>
        <div className="flex flex-row gap-1 text-lg font-medium">
          <h1>{greet.greetMessage},</h1>
          <h1 className="text-blue-400">
            {platformUser?.firstName && platformUser?.lastName ? (
              <>{platformUser?.firstName + " " + platformUser?.lastName}</>
            ) : (
              <></>
            )}
          </h1>
        </div>
        <div className="text-xs">
          <h1 className="">
            Wishing you a successful and productive day ahead!
          </h1>
        </div>
      </div>
    </div>
  );
}
