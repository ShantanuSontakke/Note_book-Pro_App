import Note from "../models/Note.js";

export const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
         // Log the error for debugging purposes
         // You can also use a logging library like Winston or Morgan for better logging
         // res.status(500).json({ message: "Internal server error" });
         // If you want to send a more user-friendly message, you can customize the response
        res.status(500).json({ message: "Internal server error" });
        
    }
};

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const createNote = async (req, res) => {
   try {
    const { title, content } = req.body;
    const note = new Note({title,content});
    
    const savedNote = await note.save();
    res.status(201).json(savedNote);
   } catch (error) {
    console.error("Error in createNotes controller", error);
   res.status(500).json({ message: "Internal server error" });
        
}
};

export const updateNote = async(req, res) => {
  try {
    const {title, content} = req.body;
    // Assuming you have the note ID in req.params.id
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content },{new:true,});
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
     console.error("Error in updateNotes controller", error);
   res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) 
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNotes controller", error);
   res.status(500).json({ message: "Internal server error" });
  
  }
};