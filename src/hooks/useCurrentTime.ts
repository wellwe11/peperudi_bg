import { useEffect, useState } from "react";

const useCurrentTime = (timeZone = "Europe/Sofia") => {
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateTime() {
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Sofia",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());

      setTime(formatted);
    }

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [location]);

  return time;
};

export default useCurrentTime;
