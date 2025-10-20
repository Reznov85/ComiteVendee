import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendrierConcours = () => {
  const [concours, setConcours] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/concours/all")
      .then((res) => setConcours(res.data))
      .catch((err) => console.error("Erreur chargement concours:", err));
  }, []);

  const events = concours.map((c) => ({
  id: c._id,
  title: `${c.titre} (${c.type})`,
  start: c.date,
  extendedProps: {
    lieu: c.lieu,
    club: c.club,
    categorie: c.categorie,
    description: c.description,
    affiche: c.affiche,
  },
}));

const handleEventClick = (info) => {
  const id = info.event.id;
  window.location.href = `/concours/${id}`;
};


  return (
    <section className="max-w-screen-xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">
        Calendrier des concours
      </h2>

      <div className="bg-white shadow-lg rounded-2xl p-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="fr"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          events={events}
          eventClick={handleEventClick}
          height="auto"
        />
      </div>
    </section>
  );
};

export default CalendrierConcours;
