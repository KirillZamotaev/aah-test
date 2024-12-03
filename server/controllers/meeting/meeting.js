const MeetingHistory = require("../../model/schema/meeting");

const add = async (req, res) => {
  try {
    const {
      agenda,
      attendes,
      attendesLead,
      location,
      related,
      dateTime,
      notes,
      createBy,
    } = req.body;

    const newMeeting = new MeetingHistory({
      agenda,
      attendes,
      attendesLead,
      location,
      related,
      dateTime,
      notes,
      createBy,
    });

    const savedMeeting = await newMeeting.save();

    res.status(201).json(savedMeeting);
  } catch (error) {
    res.status(500).json({ error: "Failed to add meeting." });
  }
};

const index = async (req, res) => {
  try {
    const meetings = await MeetingHistory.find({ deleted: false }).populate(
      "attendes attendesLead createBy"
    );
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve meetings." });
  }
};

const view = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await MeetingHistory.findById(id).populate(
      "attendes attendesLead createBy"
    );

    if (!meeting || meeting.deleted) {
      return res.status(404).json({ error: "Meeting not found." });
    }

    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the meeting." });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await MeetingHistory.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found." });
    }

    res.status(200).json({ message: "Meeting deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the meeting." });
  }
};

const deleteMany = async (req, res) => {
  try {
    const { ids } = req.body;

    const result = await MeetingHistory.updateMany(
      { _id: { $in: ids } },
      { deleted: true }
    );

    res.status(200).json({ message: `${result.nModified} meetings deleted.` });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete meetings." });
  }
};

module.exports = { add, index, view, deleteData, deleteMany };
