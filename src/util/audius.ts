import axios from 'axios'

type GetAudiusInput = { appName?: string, host?: string }

const defaultAppName = 'light-of-day';
const defaultHost = 'https://audius-metadata-1.figment.io'

export const getAudius = ({ appName = defaultAppName, host = defaultHost }: GetAudiusInput) => ({
    stream: ({ trackId }: { trackId: string}) => {
        return axios.get(`${host}/v1/tracks/${trackId}/stream?app_name=${appName}`)
    },
    getTrack: ({ trackId }: { trackId: string}) => {
        return axios.get(`${host}/v1/tracks/${trackId}?app_name=${appName}`)
    },
    streamUrl: ({ trackId }: { trackId: string}) => `${host}/v1/tracks/${trackId}/stream?app_name=${appName}`,
})