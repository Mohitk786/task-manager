import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type:String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "In Progress", "Completed"],
    },
    dueDate: {
        type:String,
        required: [true, "Due date is required"],

    },
})

const Task =  mongoose.model("Task", taskSchema);
export default Task