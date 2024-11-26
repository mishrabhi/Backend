const express = require("express");
const Organizer = require("../models/organizer");
const Event = require("../models/event");
const Attendee = require("../models/attendee");
const Registration = require("../models/registration");

const router = express.Router();

// 1. Add Organizer, Event, or Attendee
router.post("/organizers", async (req, res) => {
  try {
    const organizer = new Organizer(req.body);
    const result = await organizer.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    const result = await event.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/attendees", async (req, res) => {
  try {
    const attendee = new Attendee(req.body);
    const result = await attendee.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Register an Attendee for an Event
router.post("/register", async (req, res) => {
  const { eventId, attendeeId } = req.body;

  try {
    // Check for duplicate registration
    const existingRegistration = await Registration.findOne({
      event: eventId,
      attendee: attendeeId,
    });
    if (existingRegistration)
      return res
        .status(400)
        .json({ error: "Attendee already registered for this event" });

    // Create new registration
    const registration = new Registration({
      event: eventId,
      attendee: attendeeId,
    });
    await registration.save();

    // Update references
    await Event.findByIdAndUpdate(eventId, {
      $push: { attendees: registration._id },
    });
    await Attendee.findByIdAndUpdate(attendeeId, {
      $push: { registrations: registration._id },
    });

    res.status(201).json(registration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. List Attendees of a Specific Event
router.get("/attendees/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate({
      path: "attendees",
      populate: { path: "attendee" },
    });
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event.attendees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. List Events Attended by a User
router.get("/events/:attendeeId", async (req, res) => {
  try {
    const attendee = await Attendee.findById(req.params.attendeeId).populate({
      path: "registrations",
      populate: { path: "event" },
    });
    if (!attendee) return res.status(404).json({ error: "Attendee not found" });
    res.json(attendee.registrations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. Update Event or Organizer
router.put("/events/:eventId", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.eventId, req.body, {
      new: true,
    });
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 6. Cancel a Registration
router.delete("/registrations/:registrationId", async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(
      req.params.registrationId
    );
    if (!registration)
      return res.status(404).json({ error: "Registration not found" });

    // Update references
    await Event.findByIdAndUpdate(registration.event, {
      $pull: { attendees: registration._id },
    });
    await Attendee.findByIdAndUpdate(registration.attendee, {
      $pull: { registrations: registration._id },
    });

    res.json({ message: "Registration cancelled successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
