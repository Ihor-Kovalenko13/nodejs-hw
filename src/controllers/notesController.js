import { Note } from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, tag, search } = req.query;
    const skip = (page - 1) * perPage;

    const filter = {};
    if (tag) filter.tag = tag;
    if (search) filter.$text = { $search: search };

    const [totalNotes, notes] = await Promise.all([
      Note.countDocuments(filter),
      Note.find(filter).skip(skip).limit(perPage),
    ]);

    res.status(200).json({
      page,
      perPage,
      totalNotes,
      totalPages: Math.ceil(totalNotes / perPage),
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
