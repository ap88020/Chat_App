import mongoose from "mongoose";
import projectModel from "../models/project.model.js";

export const createProject = async ({name,userId}) => {
    if(!name){
        throw new Error ('Name is required');
    }

    if(!userId){
        throw new Error ('UserId is required'); 
    }

    let project;
    try {
        project = await projectModel.create({
            name,
            users: [userId],
        }) 
    } catch (error) {
        if(error.code === 11000){
            throw new Error('Project name already exists');
        }
        throw error;
    }

    return project;
}

export const getAllProjectByUserId = async ({ userId }) => {
    if (!userId) {
        throw new Error('UserId is required')
    }

    const allUserProjects = await projectModel.find({
        users: userId
    })

    return allUserProjects
}


export const addUsersToProjectId = async ({projectId,users, userId}) => {
    if(!projectId){
        throw new Error('projectId is required');
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid project");
    }

    if(!userId){
        throw new Error("UseId is required");
    }
        console.log(userId);
        
    if(!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))){
        throw new Error ("Invalid userId(s) in usrs array")
    }

    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error("Invalid userId");
    }

    if(!users){
        throw new Error('users are required');
    }
    
    const project = await projectModel.findOne({
        _id:projectId,
        users: userId,
    })

    if(!project){
        throw new Error("User not belong to this project");
    }

    const updatedProject = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    })

    return updatedProject;
}

export const getProjectById = async ({projectId})=>{
    console.log("getProjectById function reached");  

    if(!projectId){
        throw new Error("Project is required");
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid ProjectID");
    }

    const project = await projectModel.findOne({ 
        _id:projectId,
    }).populate('users')

    return project;
}
