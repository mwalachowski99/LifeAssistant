import axios, { AxiosResponse } from "axios";
import { ActivityDto } from "../models/activityDto";
import { GetActivitiesResponse } from "../models/getActivitiesResponse";
import {API_BASE_URL} from "../../config.ts"
import { GetActivityByIdResponse } from "../models/getActivityByIdResponse.ts";

const apiConnector = {

    getActivities: async (): Promise<ActivityDto[]> => {
            const response: AxiosResponse<GetActivitiesResponse> = await axios.get(`${API_BASE_URL}/activities`)
            const activities = response.data.activityDtos

            return activities
    },

    createActivity: async (activity: ActivityDto) : Promise<void> => {
            await axios.post<number>(`${API_BASE_URL}/activities`, activity)
    },

    editActivity: async (activity: ActivityDto) : Promise<void> => {
            await axios.put<number>(`${API_BASE_URL}/activities`, activity)
    },

    deleteActivity: async (activityId: number): Promise<void> => {
            await axios.delete<number>(`${API_BASE_URL}/activities/${activityId}`)
    },

    getActivityById: async (activityId: string): Promise<ActivityDto> => {
            const response = await axios.get<GetActivityByIdResponse>(`${API_BASE_URL}/activities/${activityId}`)
            const activity = response.data.activityDto

            return activity;
    },
}

export default apiConnector