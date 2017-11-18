// @flow
import axios from 'axios'

const baseRoute = "https://dog.ceo";

const configuredAxios = axios.create({
    baseURL: baseRoute,
    timeout: 5000,
});

export default configuredAxios

export const getBreedList = (): Promise<any> => configuredAxios.get("/api/breeds/list");

export const getSubBreedList = (breedName: string): Promise<any> => configuredAxios.get(`/api/breed/${breedName}/list`);

export const getRandomByBreed = (breedName: string): Promise<any> => configuredAxios.get(`/api/breed/${breedName}/images/random`);

export const getRandomBySubBreed = (breedName: string) => (subBreedName: string) => {
    console.log("random subbreed")
    return configuredAxios.get(`/api/breed/${breedName}/${subBreedName}/images/random`);
}