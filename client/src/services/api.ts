import axios, { AxiosResponse, AxiosError } from 'axios';
import {
    IRocketPopulated,
    IMissionPopulated,
    IDataConfig,
    IRocket,
    IComponentPopulated,
    IComponent
} from '../utils/entities';

const api = axios.create({
    baseURL: 'http://127.0.0.1:9090'
});

interface IError {
    error: boolean;
    status?: number;
    statusText?: string;
    message?: string;
}

interface IApiResponse {
    data: IRocketPopulated[] | 
        IRocket |
        IRocketPopulated | 
        IDataConfig |
        IDataConfig[] | 
        IComponentPopulated[] | 
        IComponentPopulated |
        IComponent | 
        IMissionPopulated[] | 
        IMissionPopulated;
    error: IError;
}

/**
 * @param response The response from the server
 * @returns An error IError object
 * 
 * @description Handles errors from the server
 */
function handleError(response: AxiosResponse): IError {
    let error: IError = {} as IError;
    if (response['status'] === 201) {
        error = {
            error: false,
            statusText: response['statusText'],
            status: response['status']
        };
    } else {
        error = {
            error: true,
            statusText: response['statusText'],
            status: response['status']
        };
    }
    return error;
}

/**
* --------------------------------------------------------
* |                      Rocket CRUD                     |
* -------------------------------------------------------- 
*/

/**
 * @returns All rockets
 * 
 * @description Gets all rockets
 */
async function getRockets(): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: [] as IRocketPopulated[],
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.get('/rockets');
        data = {
            data: response.data.results ? response.data.results : response.data.result,
            error: handleError(response)
        };
    } catch (e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error getting all rockets. Full error: \n${err.message}`;
    }

    return data;
}

/**
 * @param id Id of a rocket
 * @returns The rocket
 */
async function getRocket(id: string): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IRocketPopulated,
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.get(`/rockets/${id}`);
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
    } catch (e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error getting rocket by id with ${id}. Full error: \n${err.message}`;
    }

    return data;
}

/**
 * @param payload The rocket to create type IRocket
 * @returns The created rocket
 * 
 * @description Creates a rocket
 */
async function createRocket(payload: IRocket): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IRocket,
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.post('/rockets', payload);
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
    } catch (e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error creating new rocket. Full error:\n${err.message}`;
    }
    
    return data;
}

/**
 * @param id Id of a rocket
 * @param payload The rocket to update type IRocket
 * @returns The updated rocket
 */
async function updateRocket(id: string, payload: IRocket): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IRocket,
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.patch(`/rockets/${id}`, payload);
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
    } catch(e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error updating the rocket with the id ${id}. Full error:\n${err.message}`;
    }

    return data;
}
/**
 * @param id Id of a rocket
 * @returns The deleted rocket
 * 
 * @description Deletes a rocket
 */
async function deleteRocket(id: string): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IRocket,
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.delete(`/rockets/${id}`);
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
    } catch(e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error deleting rocket with the id ${id}. Full error:\n${err.message}`;
    }

    return data;
}

/**
* --------------------------------------------------------
* |                     Mission CRUD                     |
* -------------------------------------------------------- 
*/

/**
 * @returns All missions
 * 
 * @description Gets all missions
 */
async function getMissions(): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IRocket,
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.get('/missions');
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
    } catch(e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error getting all missions. Full error:\n${err.message}`;
    }

    return data;
}

/**
 * @param id Id of a mission
 * @returns The mission
 */
async function getMission(id: string): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IMissionPopulated,
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.get(`/missions/${id}`);
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
    } catch(e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error getting mission with the id ${id}. Full error:\n${err.message}`;
    }

    return data;
}

/**
 * @param payload The mission to create type IMissionPopulation
 * @returns The created mission
 */
async function createMission(payload: IMissionPopulated): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IMissionPopulated,
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.post('/missions', payload);
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
    } catch(e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error creating new mission. Full error:\n${err.message}`;
    }

    return data;
}

/**
 * @param id Id of a mission
 * @param payload The mission to update type IMissionPopulation
 * @returns The updated mission
 */
async function updateMission(id: string, payload: IMissionPopulated): Promise<IApiResponse> {
    const response = await api.patch(`/missions/${id}`, payload);
    const data = response.data;
    return data.result ? data.result : data.results;
}

/**
 * @param id Id of a mission
 * @returns The deleted mission
 */
async function deleteMission(id: string): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IMissionPopulated,
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.delete(`/missions/${id}`);
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
    } catch(e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error deleting mission with the id ${id}. Full error:\n${err.message}`;
    }

    return data;
}

/**
* --------------------------------------------------------
* |                   Component CRUD                     |
* -------------------------------------------------------- 
*/

/**
 * @returns All components
 * 
 * @description Gets all components
 */
async function getComponents(): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: [] as IComponentPopulated[],
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.get('/components');
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
    } catch(e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error getting all components. Full error:\n${err.message}`;
    }

    return data;
}

/**
 * @param id Id of a component
 * @returns The component
 * 
 * @description Gets a component by id
 */
async function getComponent(id: string): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IComponentPopulated,
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.get(`/components/${id}`);
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
    } catch(e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error getting component with the id ${id}. Full error:\n${err.message}`;
    }

    return data;
}

/**
 * @param payload The component to create type IComponent
 * @param rocketId The id of the rocket to attach the component to
 * @returns The created component
 * 
 * @description Creates a component and attaches it to a rocket if rocketId is provided
 */
async function createComponent(payload: IComponent, rocket: IRocket): Promise<IApiResponse[]> {
    let componentResponse: AxiosResponse;
    let componentData: IApiResponse = {
        data: {} as IComponentPopulated,
        error: {} as IError
    } as IApiResponse;

    let rocketResponse: AxiosResponse;
    let rocketData: IApiResponse = {
        data: {} as IComponentPopulated,
        error: {} as IError
    } as IApiResponse;

    try {
        componentResponse = await api.post('/components', payload);
        const componentId = componentResponse.data._id;
        const rId = rocket?._id ? rocket?._id : '';

        componentData = {
            data: componentResponse.data.result ? componentResponse.data.result : componentResponse.data.results,
            error: handleError(componentResponse)
        };

        //attach to rocket
        if (rId !== '') {
            const rocketPayload: IRocket = rocket;
            rocketPayload.Components.push(componentId);
            try {
                rocketResponse = await api.patch(`/rockets/${rId}`, rocketPayload);
                rocketData = {
                    data: rocketResponse.data.result ? rocketResponse.data.result : rocketResponse.data.results,
                    error: handleError(rocketResponse)
                };
            } catch (e) {
                const err = e as AxiosError;
                rocketData.error.error = true;
                rocketData.error.message = `Error attaching component to rocket. Full error:\n${err.message}`;
            }
        }

    } catch(e) {
        const err = e as AxiosError;
        componentData.error.error = true;
        componentData.error.message = `Error creating new component. Full error:\n${err.message}`;
    }
    return [componentData, rocketData];
}

/**
 * @param id Id of a component
 * @param payload The component to update type IComponent
 * @returns The deleted component
 */
async function updateComponent(id: string, payload: IComponent): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IComponent,
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.patch(`/components/${id}`, payload);
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
    } catch(e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error updating component with the id ${id}. Full error:\n${err.message}`;
    }

    return data;
}

async function deleteComponent(id: string, rocket?: IRocket): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IComponent,
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.delete(`/components/${id}`);
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
    } catch(e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error deleting component with the id ${id}. Full error:\n${err.message}`;
    }

    const r = rocket ? rocket : {} as IRocket;

    // remove component from rocket
    const rocketComponentList: string[] = r.Components.filter((cId, idx, arr) => {
        if (cId === id) {
            arr.splice(idx, 1);
            return true;
        } 
        return false;
    });

    // detach from rocket (potential fix until middleware is implemented)
    if (r !== {} as IRocket) {
        await api.patch(`/rockets/${r._id}`, { Components: rocketComponentList });
    }
    return data;
}

/**
* --------------------------------------------------------
* |                  DataConfig CRUD                     |
* -------------------------------------------------------- 
*/

/**
 * @returns All data configs
 * 
 * @description Gets all data configs
 */
async function getDataConfigs(): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IDataConfig[],
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.get('/dataconfig');
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
    } catch(e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error getting all data configs. Full error:\n${err.message}`;
    }

    return data;
}

/**
 * @param id Id of a data config
 * @returns The data config
 * 
 * @description Gets a data config by id
 */
async function getDataConfig(id: string): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IDataConfig,
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.get(`/dataconfig/${id}`);
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
    } catch(e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error getting data config with the id ${id}. Full error:\n${err.message}`;
    }

    return data;
}

/**
 * @param payload The data config to create type IDataConfig
 * @param componentId The id of the component to attach the data config to
 * @returns The created data config
 * 
 * @description Creates a data config and attaches it to a component if componentId is provided
 */
async function createDataConfig(payload: IDataConfig, componentId?: string): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IDataConfig,
        error: {} as IError
    } as IApiResponse;
    try {
        response = await api.post('/dataconfig', payload);
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
        const dataConfigId = response.data._id;
        const cId = componentId ? componentId : '';
    
        //attach to component
        if (cId !== '') {
            await api.patch(`/components/${cId}`, { DataConfig: [dataConfigId] });
        }
    } catch(e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error creating new data config. Full error:\n${err.message}`;
    }

    return data;
}

/**
 * 
 * @param id Id of a data config
 * @param payload The data config to update
 * @returns The updated data config
 */
async function updateDataConfig(id: string, payload: IDataConfig): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IDataConfig,
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.patch(`/dataconfig/${id}`, payload);
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
    } catch(e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error updating data config with the id ${id}. Full error:\n${err.message}`;
    }

    return data;
}

/**
 * @param id Id of a data config
 * @returns The deleted data config
 * 
 * @description Deletes a data config
 */
async function deleteDataConfig(id: string, componentId: string): Promise<IApiResponse> {
    let response: AxiosResponse;
    let data: IApiResponse = {
        data: {} as IDataConfig,
        error: {} as IError
    } as IApiResponse;

    try {
        response = await api.delete(`/dataconfig/${id}`);
        data = {
            data: response.data.result ? response.data.result : response.data.results,
            error: handleError(response)
        };
        const cId = componentId ? componentId : '';

        // remove data config from component 
        if (cId !== '') {
            await api.patch(`/components/${cId}`, { DataConfig: [] });
        }
    } catch (e) {
        const err = e as AxiosError;
        data.error.error = true;
        data.error.message = `Error deleting data config with the id ${id}. Full error:\n${err.message}`;
    }
    
    return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getRockets,
    getRocket,
    createRocket,
    updateRocket,
    deleteRocket,
    getMissions,
    getMission,
    createMission,
    updateMission,
    deleteMission,
    getComponents,
    getComponent,
    createComponent,
    updateComponent,
    deleteComponent,
    getDataConfigs,
    getDataConfig,
    createDataConfig,
    updateDataConfig,
    deleteDataConfig
};